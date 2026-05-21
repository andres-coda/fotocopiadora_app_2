import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { LIBRO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const useLibroDeleteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<boolean>({});

  const eliminarLibro = (id: string) =>
    fetchData({ url: `${LIBRO}/${id}`, methodo: httpMethod.DELETE });

  return { eliminarLibro, responseLibro: response, loadingLibro: loading, errorFetchLibro: errorFetch };

}

export default useLibroDeleteApi
