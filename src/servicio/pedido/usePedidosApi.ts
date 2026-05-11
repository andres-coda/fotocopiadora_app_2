import { pedidoAdapterArray } from "../../adaptadores/entrada/pedido.adapter";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PEDIDO} from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const usePedidosApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<PedidoProp[]>({});

  const obtenerPedidos = () =>
    fetchData({ url: PEDIDO, methodo: httpMethod.GET, adapter: pedidoAdapterArray });

  return { obtenerPedidos, responsePedidos: response, loadingPedidos: loading, errorFetchPedidos: errorFetch };

}

export default usePedidosApi