import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PRECIO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const usePrecioDeleteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<boolean>({});

  const eliminarPrecio = (id: string) =>
    fetchData({ url: `${PRECIO}/${id}`, methodo: httpMethod.DELETE });

  return { eliminarPrecio, responsePrecio: response, loadingPrecio: loading, errorFetchPrecio: errorFetch };

}

export default usePrecioDeleteApi
