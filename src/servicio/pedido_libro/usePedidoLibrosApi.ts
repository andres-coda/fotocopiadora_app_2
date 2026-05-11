import { pedidoLibroAdapterArray } from "../../adaptadores/entrada/pedidoLibro.adapter";
import { PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PEDIDO_LIBRO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const usePedidoLibrosApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<PedidoLibroProp[]>({});

  const obtenerPedidoLibross = () =>
    fetchData({ url: PEDIDO_LIBRO, methodo: httpMethod.GET, adapter: pedidoLibroAdapterArray });

  return { obtenerPedidoLibross, responsePedidoLibross: response, loadingPedidoLibross: loading, errorFetchPedidoLibross: errorFetch };

}

export default usePedidoLibrosApi