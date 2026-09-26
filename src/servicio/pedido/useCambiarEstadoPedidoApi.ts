import { cambiarEstadoItemPedidoAdapter, cambiarEstadoPedidoAdapter } from "../../adaptadores/entrada/cambioEstado.adapter";
import { CambiarEstadoLibroPedidoProp } from "../../modelo/Entidades/pedido_libro/cambioEstado.interface";
import { Estado } from "../../modelo/Entidades/pedido_libro/estado.enum";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PEDIDO, PEDIDO_LIBRO_CAMBIO_ESTADO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

interface CambiarEstadoPedidoProp {
  idPedido: string;
  estado: Estado;
}

interface cambioEstadoProp {
  idPedido: string,
  nroPedido:string,
  estado: Estado
}

const useCambiarEstadoPedidoApi = () => {
  // El hook devuelve el DTO crudo; el componente usa el adaptador para convertir a array de items
  const { fetchData, response, loading, errorFetch } = useApi<CambiarEstadoLibroPedidoProp>({});

  const cambiarEstadoPedido = ({ idPedido, estado }: CambiarEstadoPedidoProp) =>
    fetchData({ url: `${PEDIDO}/estado/${idPedido}`, methodo: httpMethod.PATCH, bodyData: JSON.stringify({ estado }), adapter: cambiarEstadoPedidoAdapter });

  const cambiarEstadoPedidoLibro = ({ idPedido, nroPedido, estado }: cambioEstadoProp) =>
    fetchData({ url: `${PEDIDO_LIBRO_CAMBIO_ESTADO}/${idPedido}/${nroPedido}`, methodo: httpMethod.PATCH, bodyData: JSON.stringify({ estado }), adapter: cambiarEstadoItemPedidoAdapter });


  return { cambiarEstadoPedido, cambiarEstadoPedidoLibro, responseCambioEstadoPedido: response, loadingCambioEstadoPedido: loading, errorFetchCambioEstadoPedido: errorFetch };
};

export default useCambiarEstadoPedidoApi;