import { categoriaAdapter } from '../../adaptadores/entrada/precio.adapter';
import { CategoriaProp } from '../../modelo/Entidades/precio/precio.interface';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { BusquedaApiProp } from '../../modelo/HTTP/peticiones.interface';
import { PRECIO_CATEGORIA } from '../../utils/endpoint';
import useApiPaginado from '../hooks/useApiPaginado';

const useCategoriaNombreApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<
    CategoriaProp,
    CategoriaProp
  >({ adapterGet: categoriaAdapter });

  const obtenerCategoriasBusqueda = ({ query, limite, pagina }: BusquedaApiProp) => {
    fetchData({
      url: `${PRECIO_CATEGORIA}?q=${query.trimEnd()}&limite=${limite ?? 6}&pagina=${pagina ?? 1}`,
      methodo: httpMethod.GET,
      adapter: categoriaAdapter,
    });
  };

  return {
    obtenerCategoriasBusqueda,
    responseCategorias: response,
    loadingCategorias: loading,
    errorFetchCategorias: errorFetch,
  };
};

export default useCategoriaNombreApi;
