import { pedidoAdapter } from "../../adaptadores/entrada/pedido.adapter";
import { PedidoAdapterProp, PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { Estado } from "../../modelo/Entidades/pedido_libro/estado.enum";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { limiteDefecto } from "../../utils/constantes";
import { PEDIDO, PEDIDO_CLIENTE } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

interface ObtenerPedidosByClienteIdProp extends Omit<BusquedaApiProp, 'query'>{
  idCliente:string;
  orden?:string;
  estado?: Estado;
}

const usePedidosApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<PedidoAdapterProp, PedidoProp>({adapterGet: pedidoAdapter});

  const obtenerPedidosBusqueda = ({query, limite, pagina}:BusquedaApiProp) => {
    fetchData({ url: `${PEDIDO}?q=${query.trimEnd()}&limite=${limite ?? limiteDefecto}&pagina=${pagina ?? 1}`, methodo: httpMethod.GET, adapter: pedidoAdapter });
  }

  const obtenerPedidosByCienteId = ({idCliente, limite, pagina, orden, estado}:ObtenerPedidosByClienteIdProp) => {
    fetchData({ url: `${PEDIDO_CLIENTE}/${idCliente}?orden=${orden?.trimEnd() ?? ''}&limite=${limite ?? limiteDefecto}&pagina=${pagina ?? 1}&estado=${estado ?? ''}`, methodo: httpMethod.GET, adapter: pedidoAdapter });
  }

  const obtenerPedidos = () =>
    fetchData({ url: `${PEDIDO}?limite=${limiteDefecto}`, methodo: httpMethod.GET, adapter: pedidoAdapter });

  return { obtenerPedidos, obtenerPedidosByCienteId, obtenerPedidosBusqueda, responsePedidos: response, loadingPedidos: loading, errorFetchPedidos: errorFetch };

}

export default usePedidosApi