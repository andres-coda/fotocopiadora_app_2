import { useSelector } from "react-redux";
import { pedidoAdapter } from "../../adaptadores/entrada/pedido.adapter";
import { pedidoDtoAdapter } from "../../adaptadores/salida/pedidoDto.adapter";
import { formValuesPedido } from "../../modelo/Entidades/pedido/esqPedido.esquema";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { PedidoLibroConstruccionProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PEDIDO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { appStore } from "../../redux/store";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";


const usePedidoApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<PedidoProp | undefined>({});
  const sedes:SedeProp[] = useSelector((store: appStore) => store.sede.items);

  const obtenerPedidoById = (id: string) =>
    fetchData({ url: `${PEDIDO}/${id}`, methodo: httpMethod.GET, adapter: pedidoAdapter });

  const crearPedido = (data: formValuesPedido, libros:PedidoLibroConstruccionProp[], cliente:ClienteProp | undefined ) =>
    fetchData({ url: PEDIDO, methodo: httpMethod.POST, bodyData: JSON.stringify(pedidoDtoAdapter({ p: data, librosPedidos:libros, sede:sedes[0], cliente})), adapter: pedidoAdapter });

  const editarPedido = (data: formValuesPedido, id: string, libros:PedidoLibroConstruccionProp[]) =>
    fetchData({ url: `${PEDIDO}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(pedidoDtoAdapter({ p: data, librosPedidos:libros, sede:sedes[0]})), adapter: pedidoAdapter });



  return { obtenerPedidoById, crearPedido, editarPedido, responsePedido: response, loadingPedido: loading, errorFetchPedido: errorFetch };

}

export default usePedidoApi