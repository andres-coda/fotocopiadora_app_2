import { CampoBusqueda } from "../modelo/Entidades/base/base.interface";
import { EstadoPedido } from "../modelo/Entidades/pedido/estadoPedido.enum";
import { PedidoAdapterProp, PedidoProp } from "../modelo/Entidades/pedido/pedido.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { normalizarTexto } from "../utils/formatoDatos";
import { FiltroIndividual } from "./filtro.interface";

export const pedidoKeyBuscador: (keyof PedidoProp)[] = ['fechaEntrega'];

export const filtrosInicialesPedido: filtroLlamada[] = [
  { id: `${EstadoPedido.PENDIENTE}`, estado: false },
  { id: `${EstadoPedido.LISTO}`, estado: false },
  { id: `${EstadoPedido.RETIRADO}`, estado: false },
  { id: `${EstadoPedido.CANCELADO}`, estado: false },
]

export const filtrosPedidoFuntion: FiltroIndividual<PedidoProp>[] = [
  {id: `${EstadoPedido.PENDIENTE}`, filtro:(pedido:PedidoProp) => pedido.estado === EstadoPedido.PENDIENTE ? true : false },
  {id: `${EstadoPedido.LISTO}`, filtro:(pedido:PedidoProp) => pedido.estado === EstadoPedido.LISTO ? true : false },
  {id: `${EstadoPedido.RETIRADO}`, filtro:(pedido:PedidoProp) => pedido.estado === EstadoPedido.RETIRADO ? true : false },
  {id: `${EstadoPedido.CANCELADO}`, filtro:(pedido:PedidoProp) => pedido.estado === EstadoPedido.CANCELADO ? true : false },
]

export const camposBusquedaPedido: CampoBusqueda<PedidoAdapterProp>[] = [
  c => ({ valor: normalizarTexto(c.fechaEntrega) }),
  c => ({ valor: normalizarTexto(c.fechaCreacion?.toString()) })
]