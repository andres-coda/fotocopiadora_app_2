import { pedidoLibroAdapter } from "../../adaptadores/entrada/pedidoLibro.adapter";
import { PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { limiteDefecto } from "../../utils/constantes";
import { PEDIDO_LIBRO, PEDIDO_LIBRO_CAMBIO_SEDE } from "../../utils/endpoint";
import useApi from "../hooks/useApi";
import { ObtenerPedidosByClienteIdProp } from "../pedido/usePedidosApi";

interface cambioSedeProp {
  idPedido: string,
  nroPedido:string,
  sede_id: string
}

const usePedidoLibroApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<PedidoLibroProp | undefined>({});

  const obtenerPedidoLibroById = ({id, limite, pagina, orden, estado}:ObtenerPedidosByClienteIdProp) =>
    fetchData({ url: `${PEDIDO_LIBRO}/${id}?orden=${orden?.trimEnd() ?? ''}&limite=${limite ?? limiteDefecto}&pagina=${pagina ?? 1}&estado=${estado ?? ''}`, methodo: httpMethod.GET, adapter: pedidoLibroAdapter });

  const cambiarSedePedidoLibro = ({idPedido, nroPedido, sede_id}:cambioSedeProp) =>
      fetchData({ url: `${PEDIDO_LIBRO_CAMBIO_SEDE}/${idPedido}/${nroPedido}`, methodo: httpMethod.PATCH, bodyData: JSON.stringify({ sedeId:sede_id }), adapter:pedidoLibroAdapter });
  

  
  /*
    const crearPedidoLibro = (data: formValuesPedidoLibro) =>
      fetchData({ url: BANCO, methodo: httpMethod.POST, bodyData: JSON.stringify(pedidoLibroDto(data)) });
  
    const editarPedidoLibro = (data: formValuesPedidoLibro, id: string) =>
      fetchData({ url: `${BANCO}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(pedidoLibroDto(data)) });
  
  */

  return { obtenerPedidoLibroById, cambiarSedePedidoLibro, responsePedidoLibro: response, loadingPedidoLibro: loading, errorFetchPedidoLibro: errorFetch };

}

export default usePedidoLibroApi
