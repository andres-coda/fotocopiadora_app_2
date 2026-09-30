import { pedidoLibroAdapter } from "../../adaptadores/entrada/pedidoLibro.adapter";
import { PedidoLibroAdapterProp, PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { limiteDefecto } from "../../utils/constantes";
import { PEDIDO_LIBRO } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";
import { ObtenerPedidosByClienteIdProp } from "../pedido/usePedidosApi";


const usePedidoLibrosApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<PedidoLibroAdapterProp, PedidoLibroProp>({adapterGet: pedidoLibroAdapter});
  
  const obtenerPedidoLibross = () =>
    fetchData({ url: PEDIDO_LIBRO, methodo: httpMethod.GET, adapter: pedidoLibroAdapter });

  const obtenerPedidoLibrosByPedidoId = (pedidoId: string) =>
    fetchData({ url: `${PEDIDO_LIBRO}/pedido/${pedidoId}`, methodo: httpMethod.GET, adapter: pedidoLibroAdapter });

  const obtenerPedidoLibrosByLibroId = ({id, limite, pagina, orden, estado}:ObtenerPedidosByClienteIdProp) =>
    fetchData({ url: `${PEDIDO_LIBRO}/libro/${id}?orden=${orden?.trimEnd() ?? ''}&limite=${limite ?? limiteDefecto}&pagina=${pagina ?? 1}&estado=${estado ?? ''}`, methodo: httpMethod.GET, adapter: pedidoLibroAdapter });

  return { obtenerPedidoLibrosByLibroId, obtenerPedidoLibross, obtenerPedidoLibrosByPedidoId, responsePedidoLibross: response, loadingPedidoLibross: loading, errorFetchPedidoLibross: errorFetch };

}

export default usePedidoLibrosApi