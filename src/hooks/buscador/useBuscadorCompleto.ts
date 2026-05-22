import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import useBuscador from "./useBuscador";
import { useBuscadorCompletoProp } from "./useBuscadorProp.interface";
import { useFiltrosDinamicos } from "./useFiltros";

const useBuscadorCompleto = <T extends BaseProp>({
  estadoFiltros, 
  filtros,
  sortBy,
  sortOrder= undefined,
  setModalLocal= undefined,
  elementos= undefined,
  elementoSelect= undefined,
  resetSelectElemento= undefined,
}:useBuscadorCompletoProp<T>) => {  
  const { filtroCompuesto } = useFiltrosDinamicos<T>({
    estadoFiltros,
    filtros
  })

  const { elementosFiltrados, contenedorRef, valor, setValor, nuevoElemento } = useBuscador<T>({
    elementos,
    filtros: filtroCompuesto,
    sortBy:sortBy,
    sortOrder: sortOrder,
    setModalLocal,
    elementoSelect,
    resetSelectElemento,
  });

  return { elementosFiltrados, contenedorRef, valor, setValor, nuevoElemento }
}

export default useBuscadorCompleto;