import { usuarioAdapter } from '../../adaptadores/entrada/usuario.adapter';
import { usuarioAdapterProps, usuarioProps } from '../../modelo/usuario/Usuario.interface';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { USER, USER_EMPRESA } from '../../utils/endpoint';
import useApiPaginado from '../hooks/useApiPaginado';
import { limiteDefecto } from '../../utils/constantes';
import { BusquedaApiProp } from '../../modelo/HTTP/peticiones.interface';

interface UserByMiEmpresaProp  extends Omit<BusquedaApiProp, 'query'>{}

interface UserByEmpresaProp extends UserByMiEmpresaProp {
  id:string;
}

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

  const obtenerUsuarios = ({ limite, pagina }: UserByMiEmpresaProp) => {
    fetchData({
      url: `${USER}?limite=${limite ?? limiteDefecto}&pagina=${pagina ?? 1}`,
      methodo: httpMethod.GET,
      adapter: usuarioAdapter,
    });
  };

  const obtenerUsuariosByIdEmpresa = ({id, limite, pagina}:UserByEmpresaProp) => {
    fetchData({
      url: `${USER_EMPRESA}/${id}?limite=${limite ?? limiteDefecto}&pagina=${pagina ?? 1}`,
      methodo: httpMethod.GET,
      adapter: usuarioAdapter,
    });
  }

  return {
    obtenerUsuariosByIdEmpresa,
    obtenerUsuarios,
    responseUsuarios: response,
    loadingUsuarios: loading,
    errorFetchUsuarios: errorFetch,
  };
};

export default useUsuariosApi;
