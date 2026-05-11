import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { CLIENTE } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const useClienteDeleteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<boolean>({});

  const eliminarCliente = (id: string) =>
    fetchData({ url: `${CLIENTE}/${id}`, methodo: httpMethod.DELETE });

  return { eliminarCliente, responseCliente: response, loadingCliente: loading, errorFetchCliente: errorFetch };

}

export default useClienteDeleteApi
