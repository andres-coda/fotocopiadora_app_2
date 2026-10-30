import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { PROPUESTA } from '../../utils/endpoint';
import useApi from '../hooks/useApi';

const usePropuestaDeleteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<boolean>({});

  const eliminarPropuesta = (id: string) =>
    fetchData({ url: `${PROPUESTA}/${id}`, methodo: httpMethod.DELETE });

  return {
    eliminarPropuesta,
    responsePropuesta: response,
    loadingPropuesta: loading,
    errorFetchPropuesta: errorFetch,
  };
};

export default usePropuestaDeleteApi;
