import { CampoBusqueda } from "../modelo/Entidades/base/base.interface";
import { PedidoAdapterProp, PedidoProp } from "../modelo/Entidades/pedido/pedido.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { FiltroIndividual } from "./filtro.interface";

export const pedidoKeyBuscador: (keyof PedidoProp)[] = ['fechaEntrega'];

export const filtrosInicialesPedido: filtroLlamada[] = [
  { id: '', estado: false },
]

export const filtrosPedidoFuntion: FiltroIndividual<PedidoProp>[] = [
]

export const camposBusquedaPedido: CampoBusqueda<PedidoAdapterProp>[] = [
  c => ({ valor: c.fechaEntrega ?? '' }),
  c => ({ valor: c.fechaCreacion?.toString() ?? '' })
]