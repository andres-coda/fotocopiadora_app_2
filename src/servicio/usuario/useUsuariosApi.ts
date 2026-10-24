import { usuarioAdapter } from '../../adaptadores/entrada/usuario.adapter';
import { usuarioAdapterProps, usuarioProps } from '../../modelo/usuario/Usuario.interface';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { BusquedaApiProp } from '../../modelo/HTTP/peticiones.interface';
import { USUARIO } from '../../utils/endpoint';
import useApiPaginado from '../hooks/useApiPaginado';

const useUsuariosApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<
    usuarioAdapterProps,
    usuarioProps
  >({ adapterGet: usuarioAdapter });

  // El back deduce la empresa del token y excluye los usuarios con deleted = true.
  const obtenerUsuariosBusqueda = ({ query, limite, pagina }: BusquedaApiProp) => {
    fetchData({
      url: `${USUARIO}?q=${query.trimEnd()}&limite=${limite ?? 20}&pagina=${pagina ?? 1}`,
      methodo: httpMethod.GET,
      adapter: usuarioAdapter,
    });
  };

  return {
    obtenerUsuariosBusqueda,
    responseUsuarios: response,
    loadingUsuarios: loading,
    errorFetchUsuarios: errorFetch,
  };
};

export default useUsuariosApi;
