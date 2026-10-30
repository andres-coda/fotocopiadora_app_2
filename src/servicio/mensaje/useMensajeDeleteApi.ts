import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { MENSAJE } from '../../utils/endpoint';
import useApi from '../hooks/useApi';

const useMensajeDeleteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<boolean>({});

  const eliminarMensaje = (id: string) =>
    fetchData({ url: `${MENSAJE}/${id}`, methodo: httpMethod.DELETE });

  return {
    eliminarMensaje,
    responseMensaje: response,
    loadingMensaje: loading,
    errorFetchMensaje: errorFetch,
  };
};

export default useMensajeDeleteApi;