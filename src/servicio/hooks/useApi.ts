import { useEffect, useState } from "react";
import { useAutenticacion } from "../../hooks/autenticacion/useAutenticacion";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { UseApiProps, FetchDataProps } from "../../modelo/HTTP/peticiones.interface";
import useRetardo from "../../hooks/tiempo/useRetardo";

function useApi<T>({ urlGet = null, adapterGet = null, blob = undefined }: UseApiProps<T>) {
  const {token} = useAutenticacion()
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorFetch, setErrorFetch] = useState<string | null>(null);
  const [controlador, setControlador] = useState<boolean>(false);

  const retardoRecetRetardo = useRetardo(() => { setResponse(null) }, 2000)
  
  useEffect(() => {
    if (controlador && !blob) {
      retardoRecetRetardo();
    }
  }, [controlador])

  const fetchData = async ({ url = null, bodyData = null, methodo = null, adapter = null }: FetchDataProps<T>) => {
    const urlLocal = url || urlGet;
    if (!urlLocal) throw new Error('No hay url en el pedido')

    const adapterLocal = adapter || adapterGet;

    setErrorFetch(null);
    setResponse(null);
    setLoading(true);
    const controller:AbortController = new AbortController();
    try {
      const res:Response = await fetch(urlLocal, {
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
      const result = blob
      ? await res.blob()
      : await res.json();
      const adapterData: T|null = adapterLocal ? adapterLocal(result) : result as T;
      
      setResponse(adapterData);
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

export default useApi;