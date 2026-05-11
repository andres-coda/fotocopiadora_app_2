import { PedidoLibroProp } from "../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { FiltroIndividual } from "./filtro.interface";

export const pedidoLibroKeyBuscador: (keyof PedidoLibroProp)[] = ['cantidad', 'detalles', 'estado'];

export const filtrosInicialesPedidoLibro: filtroLlamada[] = [
  { id: '', estado: false},
]

export const filtrosPedidoLibroFuntion: FiltroIndividual<PedidoLibroProp>[] = [
]