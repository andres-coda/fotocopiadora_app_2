import { usuarioAdapter } from '../../adaptadores/entrada/usuario.adapter';
import { usuarioAdapterProps, usuarioProps } from '../../modelo/usuario/Usuario.interface';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { USER } from '../../utils/endpoint';
import useApiPaginado from '../hooks/useApiPaginado';

/**
 * Listado de usuarios de la empresa del usuario logueado.
 *
 * `GET /user` esta detras de AdminGuard y no acepta `q`: el back solo pagina.
 * La empresa la deriva del token y el RLS la vuelve a filtrar, asi que no hace
 * falta mandarla.
 */
const useUsuariosApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<
    usuarioAdapterProps,
    usuarioProps
  >({ adapterGet: usuarioAdapter });

  const obtenerUsuarios = (p?: { limite?: number; pagina?: number }) => {
    fetchData({
      url: `${USER}?limite=${p?.limite ?? 100}&pagina=${p?.pagina ?? 1}`,
      methodo: httpMethod.GET,
      adapter: usuarioAdapter,
    });
  };

  return {
    obtenerUsuarios,
    responseUsuarios: response,
    loadingUsuarios: loading,
    errorFetchUsuarios: errorFetch,
  };
};

export default useUsuariosApi;
