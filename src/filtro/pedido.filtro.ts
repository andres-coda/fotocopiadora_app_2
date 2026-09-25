import { CampoBusqueda } from "../modelo/Entidades/base/base.interface";
import { Estado } from "../modelo/Entidades/pedido_libro/estado.enum";
import { PedidoAdapterProp, PedidoProp } from "../modelo/Entidades/pedido/pedido.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { normalizarTexto } from "../utils/formatoDatos";
import { FiltroIndividual } from "./filtro.interface";

export const pedidoKeyBuscador: (keyof PedidoProp)[] = ['fechaEntrega'];

export const filtrosInicialesPedido: filtroLlamada[] = [
  { id: `${Estado.PENDIENTE}`, estado: false },
  { id: `${Estado.LISTO}`, estado: false },
  { id: `${Estado.RETIRADO}`, estado: false },
  { id: `${Estado.CANCELADO}`, estado: false },
]

export const filtrosPedidoFuntion: FiltroIndividual<PedidoProp>[] = [
  {id: `${Estado.PENDIENTE}`, filtro:(pedido:PedidoProp) => pedido.estado === Estado.PENDIENTE ? true : false },
  {id: `${Estado.LISTO}`, filtro:(pedido:PedidoProp) => pedido.estado === Estado.LISTO ? true : false },
  {id: `${Estado.RETIRADO}`, filtro:(pedido:PedidoProp) => pedido.estado === Estado.RETIRADO ? true : false },
  {id: `${Estado.CANCELADO}`, filtro:(pedido:PedidoProp) => pedido.estado === Estado.CANCELADO ? true : false },
]

export const camposBusquedaPedido: CampoBusqueda<PedidoAdapterProp>[] = [
  c => ({ valor: normalizarTexto(c.fechaEntrega) }),
  c => ({ valor: normalizarTexto(c.fechaCreacion?.toString()) })
]