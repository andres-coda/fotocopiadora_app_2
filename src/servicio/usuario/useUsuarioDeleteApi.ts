import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { USUARIO } from '../../utils/endpoint';
import useApi from '../hooks/useApi';

const useUsuarioDeleteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<boolean>({});

  const eliminarUsuario = (id: string) =>
    fetchData({ url: `${USUARIO}/${id}`, methodo: httpMethod.DELETE });

  return { eliminarUsuario, responseUsuario: response, loadingUsuario: loading, errorFetchUsuario: errorFetch };
};

export default useUsuarioDeleteApi;
