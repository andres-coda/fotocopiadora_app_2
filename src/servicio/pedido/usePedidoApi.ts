import { pedidoAdapter } from "../../adaptadores/entrada/pedido.adapter";
import { pedidoDtoAdapter } from "../../adaptadores/salida/pedidoDto.adapter";
import { formValuesPedido } from "../../modelo/Entidades/pedido/esqPedido.esquema";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PEDIDO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";


const usePedidoApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<PedidoProp | undefined>({});

  const obtenerPedidoById = (id: string) =>
    fetchData({ url: `${PEDIDO}/${id}`, methodo: httpMethod.GET, adapter: pedidoAdapter });

  const crearPedido = (data: formValuesPedido) =>
    fetchData({ url: PEDIDO, methodo: httpMethod.POST, bodyData: JSON.stringify(pedidoDtoAdapter({ p: data })), adapter: pedidoAdapter });

  const editarPedido = (data: formValuesPedido, id: string) =>
    fetchData({ url: `${PEDIDO}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(pedidoDtoAdapter({ p: data })), adapter: pedidoAdapter });



  return { obtenerPedidoById, crearPedido, editarPedido, responsePedido: response, loadingPedido: loading, errorFetchPedido: errorFetch };

}

export default usePedidoApi