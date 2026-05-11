import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PEDIDO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const usePedidoDeleteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<boolean>({});

  const eliminarPedido = (id: string) =>
    fetchData({ url: `${PEDIDO}/${id}`, methodo: httpMethod.DELETE });

  return { eliminarPedido, responsePedido: response, loadingPedido: loading, errorFetchPedido: errorFetch };

}

export default usePedidoDeleteApi
