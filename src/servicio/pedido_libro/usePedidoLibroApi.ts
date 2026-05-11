import { pedidoLibroAdapter } from "../../adaptadores/entrada/pedidoLibro.adapter";
import { PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PEDIDO_LIBRO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";


const usePedidoLibroApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<PedidoLibroProp | undefined>({});

  const obtenerPedidoLibroById = (id: string) =>
    fetchData({ url: `${PEDIDO_LIBRO}/${id}`, methodo: httpMethod.GET, adapter: pedidoLibroAdapter });
  /*
    const crearPedidoLibro = (data: formValuesPedidoLibro) =>
      fetchData({ url: BANCO, methodo: httpMethod.POST, bodyData: JSON.stringify(pedidoLibroDto(data)) });
  
    const editarPedidoLibro = (data: formValuesPedidoLibro, id: string) =>
      fetchData({ url: `${BANCO}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(pedidoLibroDto(data)) });
  
  */

  return { obtenerPedidoLibroById, responsePedidoLibro: response, loadingPedidoLibro: loading, errorFetchPedidoLibro: errorFetch };

}

export default usePedidoLibroApi
