import { pedidoLibroAdapter } from "../../adaptadores/entrada/pedidoLibro.adapter";
import { PedidoLibroAdapterProp, PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PEDIDO_LIBRO } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const usePedidoLibrosApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<PedidoLibroAdapterProp, PedidoLibroProp>({adapterGet: pedidoLibroAdapter});
  
  const obtenerPedidoLibross = () =>
    fetchData({ url: PEDIDO_LIBRO, methodo: httpMethod.GET, adapter: pedidoLibroAdapter });

  const obtenerPedidoLibrosByPedidoId = (pedidoId: string) =>
    fetchData({ url: `${PEDIDO_LIBRO}/pedido/${pedidoId}`, methodo: httpMethod.GET, adapter: pedidoLibroAdapter });

  return { obtenerPedidoLibross, obtenerPedidoLibrosByPedidoId, responsePedidoLibross: response, loadingPedidoLibross: loading, errorFetchPedidoLibross: errorFetch };

}

export default usePedidoLibrosApi