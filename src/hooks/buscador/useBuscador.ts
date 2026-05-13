import { RefObject, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "../../contexto/contextoModal";
import { useDispatch } from "react-redux";
import { BuscadorProp } from "./useBuscadorProp.interface";
import { HasId } from "../../modelo/general/hasId.interface";

const useBuscador = <T extends HasId>({ 
  setModalLocal, 
  elementos, 
  filtros, 
  keyBuscador, 
  keyExterna, 
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

        // Comparar strings de forma segura
        return sortOrder === 'asc'
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    return resultado;
  }, [elementos, sortBy, sortOrder])

  const elementosFiltrados: T[] = useMemo(() => {
    if (!elementosOrdenados) return [];
    if (!filtros && !keyBuscador && !keyExterna) return elementosOrdenados;

    let resultado = [...elementosOrdenados];

    // 1. Aplicar filtro personalizado
    if (filtros) {
      resultado = resultado.filter(e => filtros(e));
    }

    if(filtros && elementoSelect && resetSelectElemento){
      if (!filtros(elementoSelect)){
        dispatch(resetSelectElemento())
      }
    }

    // 2. Aplicar filtro de búsqueda por texto
    if (valor && (keyBuscador || keyExterna)) {
      resultado = resultado.filter(dato => {
        let coincide = false;

        // Buscar en keys básicas
        if (keyBuscador && keyBuscador.length > 0) {
          coincide = keyBuscador.some(key => {
            const valorCampo = dato[key];
            if (typeof valorCampo === 'string' || typeof valorCampo === 'number') {
              return valorCampo.toString().toLowerCase().includes(valor.toLowerCase());
            }
            return false;
          });
        }

        // Buscar en keys externas (anidadas)
        if (!coincide && keyExterna) {
          coincide = keyExterna(valor, dato);
        }

        return coincide;
      });
    }

    return resultado;
  }, [elementosOrdenados, valor, filtros, keyBuscador, keyExterna]);

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
