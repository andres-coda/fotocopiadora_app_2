import { categoriaAdapter } from '../../adaptadores/entrada/precio.adapter';
import { CategoriaProp } from '../../modelo/Entidades/precio/precio.interface';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { PRECIO_CATEGORIA } from '../../utils/endpoint';
import useApi from '../hooks/useApi';

const useCategoriasApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<CategoriaProp[]>({});

  const obtenerCategorias = () =>
    fetchData({
      url: `${PRECIO_CATEGORIA}/todas`,
      methodo: httpMethod.GET,
      adapter: (data: any) =>
        Array.isArray(data)
          ? data.map(categoriaAdapter).filter((c): c is CategoriaProp => !!c)
          : [],
    });

  return {
    obtenerCategorias,
    responseCategorias: response,
    loadingCategorias: loading,
    errorFetchCategorias: errorFetch,
  };
};

export default useCategoriasApi;