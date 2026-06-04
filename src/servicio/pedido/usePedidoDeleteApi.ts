import { Estado } from "../../modelo/Entidades/pedido_libro/estado.enum";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PEDIDO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const usePedidoDeleteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<boolean>({});

  const eliminarPedido = (id: string) =>
    fetchData({ url: `${PEDIDO}/${id}`, methodo: httpMethod.DELETE });

  const cambiarEstadoPedido = (id: string, estado: Estado) =>
    fetchData({ url: `${PEDIDO}/${id}`, methodo: httpMethod.PATCH, bodyData: JSON.stringify({ estado }) });

  return { cambiarEstadoPedido, eliminarPedido, responsePedido: response, loadingPedido: loading, errorFetchPedido: errorFetch };

}

export default usePedidoDeleteApi
