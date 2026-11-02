import { useEffect, useState } from 'react';
import { PaginadoProp } from '../../adaptadores/entrada/paginado.adapter';
import { BusquedaApiProp } from '../../modelo/HTTP/peticiones.interface';
import { UltimaBusquedaProp } from '../../redux/modelo/reduxContext.interface';
import useFinPagina from '../finPagina/useFinPagina';
import useBuscadorQuery from './useBuscadorQuery';

interface UseBuscadorSimpleProp<T> {
  valor: string;
  response: PaginadoProp<T> | null;
  loading: boolean;
  limiteLetrasBusqueda?: number;
  obtenerBusqueda: ({ query, limite, pagina }: BusquedaApiProp) => void;
}

const useBusquedaSimple = <T>({
  valor,
  obtenerBusqueda,
  response,
  limiteLetrasBusqueda = 3,
  loading = false,
}: UseBuscadorSimpleProp<T>) => {
  const [datos, setDatos] = useState<UltimaBusquedaProp<T> | undefined>(undefined);

  const {query} = useBuscadorQuery({valor, obtenerBusqueda, limiteLetrasBusqueda});
 
  useEffect(() => {
    if (response) {
      console.log('ACTUALIZO REDUX', response.pagina);
      if (query.length < limiteLetrasBusqueda) {
        setDatos(undefined);
        return;
      }
      if (query === datos?.query) {
        setDatos(prev => ({
          total: response.total,
          datosQuery: [...(prev?.datosQuery ?? []), ...response.datos],
          pagina: response.pagina,
          limite: response.limite,
          sortBy: 'id' as keyof T,
          sortOrder: 'asc',
          query: query,
        }));
      } else {
        setDatos({
          total: response.total,
          datosQuery: [...response.datos],
          pagina: response.pagina,
          limite: response.limite,
          sortBy: 'id' as keyof T,
          sortOrder: 'asc',
          query: query,
        });
      }
    }
  }, [response]);

  const { finListaRef, contenedorRef } = useFinPagina({ datos, loading, limiteLetrasBusqueda, query, obtenerBusqueda })

  return { contenedorRef, finListaRef, datos, setDatos };
};

export default useBusquedaSimple;
