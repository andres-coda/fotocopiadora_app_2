import { cambiarEstadoLibroPedidoAdapter } from "../../adaptadores/entrada/cambioEstado.adapter";
import { CambiarEstadoLibroPedidoProp } from "../../modelo/Entidades/pedido_libro/cambioEstado.interface";
import { Estado } from "../../modelo/Entidades/pedido_libro/estado.enum";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PEDIDO_LIBRO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";




const useCambiarEstadoPedidoLibroApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<CambiarEstadoLibroPedidoProp>({});

  const cambiarEstadoPedidoLibro = (id: string, estado: Estado) =>
    fetchData({ url: `${PEDIDO_LIBRO}/${id}`, methodo: httpMethod.PATCH, bodyData: JSON.stringify({ estado }), adapter:cambiarEstadoLibroPedidoAdapter });


  return { cambiarEstadoPedidoLibro, responsePedidoLibro: response, loadingPedidoLibro: loading, errorFetchPedidoLibro: errorFetch };

}

export default useCambiarEstadoPedidoLibroApi