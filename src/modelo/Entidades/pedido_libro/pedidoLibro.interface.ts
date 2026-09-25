import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";
import { Especificaciones } from "../especificacion/especificacion.enum";
import { EspecificacionAdapterProp, EspecificacionProp } from "../especificacion/especificacion.interface";
import { LibroAdapterProp, libroInicial, LibroProp } from "../libro/libro.interface";
import { SedeAdapterProp, sedeInicial, SedeProp } from "../sede/sede.interface";
import { Estado } from "./estado.enum";

export interface PedidoLibroAdapterProp extends BaseAdapterProp {
  idPedido: string;
  cantidad: number;
  detalles?: string;
  estado: Estado;
  libro: LibroAdapterProp;
  sede: SedeAdapterProp;
  especificaciones: Especificaciones[];
}

export interface PedidoLibroProp extends BaseProp {
  idPedido:string;
  cantidad: number;
  detalles?: string;
  estado: Estado;
  libro: LibroProp;
  sede: SedeProp;
  especificaciones: Especificaciones[];
}

export interface PedidoLibroConstruccionProp {
  id: string;
  libro: LibroProp;
  detalles?: string;
  cantidad: number;
  especificaciones: Especificaciones[];
  sede?: SedeProp;
  estado: Estado;
}

export const pedidoLibroInicial: PedidoLibroProp = {
  ...baseInicial,
  idPedido: baseInicial.id,
  cantidad: 0,
  detalles: '',
  estado: Estado.CANCELADO,
  libro: libroInicial,
  sede: sedeInicial,
  especificaciones: []
}