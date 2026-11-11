import { PaginadoProp } from '../../adaptadores/entrada/paginado.adapter';
import { UltimaBusquedaProp, orden } from '../modelo/reduxContext.interface';

interface Props<T>{ 
  dato: PaginadoProp<T>,
  sortBy: keyof T,
  sortOrder: orden

}

export const convertirDatoPlaydon = <T>({
  dato,
  sortBy,
  sortOrder,
}:Props<T>): UltimaBusquedaProp<T> => {
  return {
    datosQuery: dato.datos,
    sortBy,
    sortOrder,
    pagina: dato.pagina,
    limite: dato.limite,
    total: dato.total,
    query: dato.query
  };
};

