import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";
import { PedidoAdapterProp, PedidoProp } from "../pedido/pedido.interface";
import { ResumenAdapterProp } from "./resumen.interface";

export interface ClienteAdapterProp extends BaseAdapterProp {
  nombre?: string;
  telefono?: string;
  email?: string;
  resumen?: ResumenAdapterProp;
  pedidos?: PedidoAdapterProp[];
}

export interface ClienteProp extends BaseProp {
  nombre?: string;
  telefono?: string;
  email?: string;
  pendiente?: number;
  listo?: number;
  retirado?: number;
  pedidos: PedidoProp[];
}

export const clienteInicial: ClienteProp = {
  ...baseInicial,
  nombre: '',
  telefono: '',
  email: '',
  pendiente: 0,
  listo: 0,
  retirado: 0,
  pedidos: []
}