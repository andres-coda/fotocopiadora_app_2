import { PedidoProp } from "../modelo/Entidades/pedido/pedido.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { FiltroIndividual } from "./filtro.interface";

export const pedidoKeyBuscador: (keyof PedidoProp)[] = ['fechaEntrega'];

export const filtrosInicialesPedido: filtroLlamada[] = [
  { id: '', estado: false},
]

export const filtrosPedidoFuntion: FiltroIndividual<PedidoProp>[] = [
]