import { useMemo } from "react";
import { HasId } from "../../modelo/general/hasId.interface";
import { useFiltroProp } from "./useBuscadorProp.interface";

// Hook actualizado
export const useFiltrosDinamicos = <T extends HasId>({
  estadoFiltros, 
  filtros
}: useFiltroProp<T>) => {
   
  const filtroCompuesto = useMemo(() => {
    if (estadoFiltros.length === 0 || filtros.length===0) {
      return () => true; // Sin filtros, mostrar todo
    }
    
    return (e: T) => {
      // Separar filtros activos según su tipo
      const filtrosActivos = filtros.filter(f => 
        estadoFiltros.some(eF => f.id === eF.id && eF.estado)
      );
      
      const filtrosAND = filtrosActivos.filter(f => {
        const estadoFiltro = estadoFiltros.find(eF => eF.id === f.id);
        return !estadoFiltro?.xor; // xor = false o undefined
      });
      
      const filtrosXOR = filtrosActivos.filter(f => {
        const estadoFiltro = estadoFiltros.find(eF => eF.id === f.id);
        return estadoFiltro?.xor === true;
      });
      
      // Los filtros AND deben cumplirse TODOS
      const cumpleAND = filtrosAND.length === 0 || 
        filtrosAND.every(f => f.filtro(e));
      
      // Los filtros XOR: si hay alguno activo, debe cumplir AL MENOS UNO
      const cumpleXOR = filtrosXOR.length === 0 || 
        filtrosXOR.some(f => f.filtro(e));
      
      return cumpleAND && cumpleXOR;
    };
  }, [filtros, estadoFiltros]);

  return { filtroCompuesto };
};