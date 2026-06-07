import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";
import { PedidoAdapterProp, PedidoProp } from "../pedido/pedido.interface";
import { ResumenAdapterProp, resumenInicial, ResumenProp } from "./resumen.interface";

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
  resumen: ResumenProp;
  pedidos: PedidoProp[];
}

export const clienteInicial: ClienteProp = {
  ...baseInicial,
  nombre: '',
  telefono: '',
  email: '',
  resumen: resumenInicial,
  pedidos: []
}