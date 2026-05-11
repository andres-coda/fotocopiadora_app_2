import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";
import { ClienteAdapterProp, clienteInicial, ClienteProp } from "../cliente/cliente.interface";
import { PedidoLibroAdapterProp, pedidoLibroInicial, PedidoLibroProp } from "../pedido_libro/pedidoLibro.interface";

export interface PedidoAdapterProp extends BaseAdapterProp{
  fechaEntrega: string;
  importeTotal: number;
  archivos: number;
  anillados: number;
  sena: number;
  cliente: ClienteAdapterProp;
  libroPedidos: PedidoLibroAdapterProp[];
}

export interface PedidoProp extends BaseProp{
  fechaEntrega: string;
  fechaTomado: string;
  importeTotal: number;
  archivos: number;
  anillados: number;
  sena: number;
  cliente: ClienteProp;
  libroPedidos: PedidoLibroProp[];
}

export const pedidoInicial :PedidoProp= {
  ...baseInicial,
  fechaEntrega: '',
  fechaTomado: '',
  importeTotal: 0,
  archivos: 0,
  anillados: 0,
  sena: 0,
  cliente: clienteInicial,
  libroPedidos: [pedidoLibroInicial]
}