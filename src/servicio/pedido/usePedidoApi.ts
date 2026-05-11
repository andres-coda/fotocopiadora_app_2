import { pedidoAdapter } from "../../adaptadores/entrada/pedido.adapter";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PEDIDO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";


const usePedidoApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<PedidoProp | undefined>({});

  const obtenerPedidoById = (id: string) =>
    fetchData({ url: `${PEDIDO}/${id}`, methodo: httpMethod.GET, adapter: pedidoAdapter });
/*
  const crearPedido = (data: formValuesPedido) =>
    fetchData({ url: BANCO, methodo: httpMethod.POST, bodyData: JSON.stringify(pedidoDto(data)) });

  const editarPedido = (data: formValuesPedido, id: string) =>
    fetchData({ url: `${BANCO}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(pedidoDto(data)) });

*/

  return { obtenerPedidoById, responsePedido: response, loadingPedido: loading, errorFetchPedido: errorFetch };

}

export default usePedidoApi