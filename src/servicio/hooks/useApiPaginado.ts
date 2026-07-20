import { useEffect, useState } from "react";
import { useAutenticacion } from "../../hooks/autenticacion/useAutenticacion";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import useRetardo from "../../hooks/tiempo/useRetardo";
import { paginadoAdapter, PaginadoAdapterProp, PaginadoProp } from "../../adaptadores/entrada/paginado.adapter";

type Adapter<T,R> = (data?: T) => R | undefined;

interface UseApiPaginadoProp<T, R > {
  urlGet?: string;
  adapterGet: Adapter<T,R>;
  blob?: boolean;
}

interface FetchDataPaginadoProp<T, R> {
  url?: string;
  bodyData?: BodyInit;
  methodo?: httpMethod;
  adapter: Adapter<T, R>;
}

const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

function useApiPaginado<T, R>({ urlGet = undefined, adapterGet, blob = undefined }: UseApiPaginadoProp<T, R>) {
  const { token } = useAutenticacion()
  const [response, setResponse] = useState<PaginadoProp<R> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorFetch, setErrorFetch] = useState<string | null>(null);
  const [controlador, setControlador] = useState<boolean>(false);

  const retardoRecetRetardo = useRetardo(() => { setResponse(null) }, 3000)

  useEffect(() => {
    if (controlador && !blob) {
      retardoRecetRetardo();
    }
  }, [controlador])

  const fetchData = async ({ url = undefined, bodyData = undefined, methodo = undefined, adapter }: FetchDataPaginadoProp<T, R>) => {
    const urlLocal = url || urlGet;
    if (!urlLocal) throw new Error('No hay url en el pedido')

    const adapterLocal = adapter || adapterGet;

    setErrorFetch(null);
    setResponse(null);
    setLoading(true);
    const controller: AbortController = new AbortController();
    try {
      //Diley artificial desarrollo
      // await delay(5000);

      const res: Response = await fetch(urlLocal, {
        method: methodo || httpMethod.GET,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        signal: controller.signal,
        ...(bodyData && { 'body': bodyData })
      })

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
      const result:PaginadoAdapterProp<T> = blob
        ? await res.blob()
        : await res.json();
      const adapterData: PaginadoProp<R> = paginadoAdapter<T, R>(result, adapterLocal);

      setResponse(adapterData ?? null);
      setControlador(true);
      setErrorFetch(null);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          console.log('Petición abortada');
        } else {
          setErrorFetch(`Error al intentar comunicarse con la base de datos: ${err.name}, ${err.stack},${err.message}`);
          console.error(err);
        }
      } else setErrorFetch(`Ocurrió un error desconcido`);
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, response, loading, errorFetch };

}

export default useApiPaginado;