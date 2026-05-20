import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";
import { ClienteAdapterProp, clienteInicial, ClienteProp } from "../cliente/cliente.interface";
import { Estado } from "../pedido_libro/estado.enum";
import { PedidoLibroAdapterProp, pedidoLibroInicial, PedidoLibroProp } from "../pedido_libro/pedidoLibro.interface";

export interface PedidoAdapterProp extends BaseAdapterProp{
  fechaEntrega: string;
  importeTotal: number;
  archivos: number;
  anillados: number;
  sena: number;
  estado:Estado;
  cliente: ClienteAdapterProp;
  libroPedidos: PedidoLibroAdapterProp[];
}

export interface PedidoClienteProp extends BaseProp{
  fechaEntrega: string;
  fechaTomado?: Date;
  importeTotal: number;
  archivos: number;
  anillados: number;
  sena: number;
  estado:Estado;
  libroPedidos: PedidoLibroProp[];
}

export interface PedidoProp extends PedidoClienteProp{
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
  estado: Estado.PENDIENTE,
  cliente: clienteInicial,
  libroPedidos: [pedidoLibroInicial]
}

