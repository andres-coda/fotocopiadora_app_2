import { RefObject, useEffect, useRef, useState } from "react";
import { PaginadoProp } from "../../adaptadores/entrada/paginado.adapter";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { UltimaBusquedaProp } from "../../redux/modelo/reduxContext.interface";

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

  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const finListaRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    console.log('valor: ', valor)
    const timer = setTimeout(() => {
      setQuery(valor);
    }, 500);

    return () => clearTimeout(timer);
  }, [valor]);

  useEffect(() => {
    if (query.length >= limiteLetrasBusqueda) {
      obtenerBusqueda({ query })
    }
  }, [query]);

  useEffect(() => {
    if (response) {
      console.log("ACTUALIZO REDUX", response.pagina);
      if(query.length < limiteLetrasBusqueda) {
        setDatos(undefined);
        return
      }
      if (query === datos?.query) {
       setDatos(prev => ({
        total: response.total,
        datosQuery: [...prev?.datosQuery ?? [], ...response.datos],
        pagina: response.pagina,
        limite: response.limite,
        orden: 'asc',
        query: query
       }))
      } else {
        setDatos({
        total: response.total,
        datosQuery: [...response.datos],
        pagina: response.pagina,
        limite: response.limite,
        orden: 'asc',
        query: query
       });
      }
    }
  }, [response]);

  useEffect(() => {
    if(!datos) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('observer detecta:', entry.isIntersecting);
        
        if (!entry.isIntersecting) {
          return
        };
        if (query.length >= limiteLetrasBusqueda && datos?.query != query) {
          console.log('Corta porque no es la query actual: ', query)
          return
        }
        if (loading) {
          console.log('CORTO POR LOADING');
          return;
        }
        if (
          Number(datos.pagina) *
          Number(datos.limite) >=
          Number(datos.total)
        ) {

          console.log('CORTO PORQUE NO HAY MAS PAGINAS');
          return;
        }

        obtenerBusqueda({
          pagina: Number(datos.pagina) + 1,
          limite: Number(datos.limite),
          query,
        });

      },
      {
        root: contenedorRef.current,
        threshold: 0.2,
      }
    );

    if (finListaRef.current) {
      observer.observe(finListaRef.current);
    } else {
      console.log('NO HAY ELEMENTO PARA OBSERVAR');
    }

    return () => observer.disconnect();

  }, [datos?.query, datos?.pagina]);

  return { contenedorRef, finListaRef, datos, setDatos }

}

export default useBusquedaSimple;