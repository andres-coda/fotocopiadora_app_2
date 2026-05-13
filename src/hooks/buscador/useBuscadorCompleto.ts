import { HasId } from "../../modelo/general/hasId.interface";
import useBuscador from "./useBuscador";
import { useBuscadorCompletoProp } from "./useBuscadorProp.interface";
import { useFiltrosDinamicos } from "./useFiltros";

const useBuscadorCompleto = <T extends HasId>({
  estadoFiltros, 
  filtros,
  keyBuscador,
  keyExterna=undefined,
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
    keyBuscador,
    filtros: filtroCompuesto,
    sortBy:sortBy,
    sortOrder: sortOrder,
    keyExterna,
    setModalLocal,
    elementoSelect,
    resetSelectElemento,
  });

  return { elementosFiltrados, contenedorRef, valor, setValor, nuevoElemento }
}

export default useBuscadorCompleto;