import { useEffect, useRef, useState } from 'react';
import { useAutenticacion } from '../../hooks/autenticacion/useAutenticacion';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import useRetardo from '../../hooks/tiempo/useRetardo';
import {
  paginadoAdapter,
  PaginadoAdapterProp,
  PaginadoProp,
} from '../../adaptadores/entrada/paginado.adapter';

type Adapter<T, R> = (data?: T) => R | undefined;

interface UseApiPaginadoProp<T, R> {
  urlGet?: string;
  adapterGet: Adapter<T, R>;
  blob?: boolean;
}

interface FetchDataPaginadoProp<T, R> {
  url?: string;
  bodyData?: BodyInit;
  methodo?: httpMethod;
  adapter: Adapter<T, R>;
}

function useApiPaginado<T, R>({
  urlGet = undefined,
  adapterGet,
  blob = undefined,
}: UseApiPaginadoProp<T, R>) {
  const { token } = useAutenticacion();
  const [response, setResponse] = useState<PaginadoProp<R> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorFetch, setErrorFetch] = useState<string | null>(null);
  const [controlador, setControlador] = useState<boolean>(false);
  // Cada petición invalida a la anterior: una respuesta vieja no puede pisar ni
  // agregarse al resultado de la búsqueda vigente.
  const peticionRef = useRef<number>(0);
  const abortRef = useRef<AbortController | null>(null);

  const retardoRecetRetardo = useRetardo(() => {
    setResponse(null);
  }, 3000);

  useEffect(() => {
    if (controlador && !blob) {
      retardoRecetRetardo();
    }
  }, [controlador]);

  const fetchData = async ({
    url = undefined,
    bodyData = undefined,
    methodo = undefined,
    adapter,
  }: FetchDataPaginadoProp<T, R>) => {
    const urlLocal = url || urlGet;
    if (!urlLocal) throw new Error('No hay url en el pedido');

    const adapterLocal = adapter || adapterGet;

    const peticion = ++peticionRef.current;
    abortRef.current?.abort();
    const controller: AbortController = new AbortController();
    abortRef.current = controller;

    setErrorFetch(null);
    setResponse(null);
    setLoading(true);
    try {
      //Diley artificial desarrollo
      // await delay(5000);

      const res: Response = await fetch(urlLocal, {
        method: methodo || httpMethod.GET,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        signal: controller.signal,
        ...(bodyData && { body: bodyData }),
      });

      if (peticion !== peticionRef.current) return;

      if (!res.ok) {
        let errorMsg = 'La petición falló';
        try {
          const errorData = await res.json();
          errorMsg = errorData?.message || errorMsg;
        } catch (jsonErr) {
          console.error('No se pudo parsear la respuesta de error JSON:', jsonErr);
        }
        throw new Error(errorMsg);
      }
      const result: PaginadoAdapterProp<T> = blob ? await res.blob() : await res.json();
      if (peticion !== peticionRef.current) return;

      const adapterData: PaginadoProp<R> = paginadoAdapter<T, R>(result, adapterLocal);

      setResponse(adapterData ?? null);
      setControlador(true);
      setErrorFetch(null);
    } catch (err) {
      // Una petición ya superada no toca el estado: manda la última.
      if (peticion !== peticionRef.current) return;

      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          console.log('Petición abortada');
        } else {
          setErrorFetch(
            `Error al intentar comunicarse con la base de datos: ${err.name}, ${err.stack},${err.message}`
          );
          console.error(err);
        }
      } else setErrorFetch(`Ocurrió un error desconcido`);
    } finally {
      if (peticion === peticionRef.current) setLoading(false);
    }
  };

  return { fetchData, response, loading, errorFetch };
}

export default useApiPaginado;
