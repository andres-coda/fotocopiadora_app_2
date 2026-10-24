import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '../../contexto/contextoModal';
import { useDispatch } from 'react-redux';
import { BuscadorProp } from './useBuscadorProp.interface';
import { BaseProp } from '../../modelo/Entidades/base/base.interface';
import { PropuestaProp } from '../../modelo/Entidades/propuesta/propuesta.interface';

interface RetornoBusquedaProp<T extends BaseProp> {
  elementos: T[];
  propuestas: PropuestaProp[];
}

const useBuscador = <T extends BaseProp>({
  setModalLocal,
  elementos,
  filtros,
  sortBy,
  sortOrder,
  elementoSelect,
  resetSelectElemento,
  propuestas = undefined,
}: BuscadorProp<T>) => {
  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
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

  const elementosFiltrados: RetornoBusquedaProp<T> = useMemo(() => {
    let elementosResultado: T[] = elementosOrdenados;

    if (filtros) {
      elementosResultado = elementosResultado.filter(e => filtros(e));
    }

    return {
      elementos: elementosResultado,
      propuestas: propuestas ?? [],
    };
  }, [elementosOrdenados, filtros, propuestas]);

  const nuevoElemento = (ruta?: string) => {
    if (ruta) {
      navigate(ruta);
    }
    if (setModalLocal) {
      setModal(true);
      setModalLocal(true);
    }
  };

  return {
    contenedorRef,
    valor,
    setValor,
    nuevoElemento,
    elementosFiltrados: elementosFiltrados.elementos,
    retornoPropuestas: elementosFiltrados.propuestas,
  };
};

export default useBuscador;
