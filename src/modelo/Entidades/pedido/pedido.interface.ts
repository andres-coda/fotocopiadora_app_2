import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";
import { ClienteAdapterProp, clienteInicial, ClienteProp } from "../cliente/cliente.interface";
import { PedidoLibroAdapterProp, pedidoLibroInicial, PedidoLibroProp } from "../pedido_libro/pedidoLibro.interface";
import { EstadoPedido } from "./estadoPedido.enum";

export interface PedidoAdapterProp extends BaseAdapterProp{
  fechaEntrega: string;
  importeTotal: number;
  archivos: number;
  anillados: number;
  sena: number;
  estado:EstadoPedido;
  cliente: ClienteAdapterProp;
  libroPedidos: PedidoLibroAdapterProp[];
}

export interface PedidoProp extends BaseProp{
  fechaEntrega: string;
  fechaTomado?: Date;
  importeTotal: number;
  archivos: number;
  anillados: number;
  sena: number;
  estado:EstadoPedido;
  libroPedidos: PedidoLibroProp[];
  cliente: ClienteProp;
}


export const pedidoInicial :PedidoProp= {
  ...baseInicial,
  fechaEntrega: '',
  fechaTomado: undefined,
  importeTotal: 0,
  archivos: 0,
  anillados: 0,
  sena: 0,
  estado: EstadoPedido.PENDIENTE,
  cliente: clienteInicial,
  libroPedidos: [pedidoLibroInicial]
}

