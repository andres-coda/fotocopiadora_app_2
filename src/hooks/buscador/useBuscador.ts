import { RefObject, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "../../contexto/contextoModal";
import { useDispatch } from "react-redux";
import { BuscadorProp } from "./useBuscadorProp.interface";
import { BaseProp, TipoBusqueda } from "../../modelo/Entidades/base/base.interface";

const useBuscador = <T extends BaseProp>({
  setModalLocal,
  elementos,
  filtros,
  sortBy,
  sortOrder,
  elementoSelect,
  resetSelectElemento
}: BuscadorProp<T>) => {

  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { setModal } = useModalContext();
  const [valor, setValor] = useState<string>('');

  // ✅ Se mueve el side effect fuera del useMemo
  useEffect(() => {
    if (filtros && elementoSelect && resetSelectElemento) {
      if (!filtros(elementoSelect)) {
        dispatch(resetSelectElemento());
      }
    }
  }, [filtros, elementoSelect, resetSelectElemento]);

  const elementosOrdenados: T[] = useMemo(() => {
    if (!elementos) return [];
    let resultado: T[] = [...elementos];

    if (sortBy) {
      resultado.sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];

        if (valA == null || valB == null) return 0;

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortOrder === 'asc' ? valA - valB : valB - valA;
        }

        return sortOrder === 'asc'
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    return resultado;
  }, [elementos, sortBy, sortOrder]);

  // ✅ El filtrado de texto reacciona al valor diferido, no al valor directo
  const deferredValor = useDeferredValue(valor);

  const elementosFiltrados: T[] = useMemo(() => {
    if (!elementosOrdenados) return [];

    let resultado = [...elementosOrdenados];

    if (filtros) {
      resultado = resultado.filter(e => filtros(e));
    }

    // ✅ Mínimo 2 caracteres para activar la búsqueda por texto
    if (deferredValor.trim().length >= 2) {

      const palabrasBusqueda = deferredValor
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);

      resultado = resultado.filter(dato => {
        return palabrasBusqueda.every(palabra => {
          return dato.campoBusqueda.some(campo => {
            const texto = campo.valor.toLowerCase();

            switch (campo.tipo) {
              case TipoBusqueda.INVERSO:
                return texto.endsWith(palabra);

              case TipoBusqueda.ESTRICTO:
                return texto === palabra;

              default:
                return texto.includes(palabra);
            }
          });
        });
      });
    }

    return resultado;
  }, [elementosOrdenados, deferredValor, filtros]);

  const nuevoElemento = (ruta?: string) => {
    if (ruta) {
      navigate(ruta);
    }
    if (setModalLocal) {
      setModal(true);
      setModalLocal(true);
    }
  }

  return { contenedorRef, valor, setValor, nuevoElemento, elementosFiltrados }
}

export default useBuscador