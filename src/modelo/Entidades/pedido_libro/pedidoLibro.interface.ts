import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";
import { EspecificacionAdapterProp, EspecificacionProp } from "../especificacion/especificacion.interface";
import { LibroAdapterProp, libroInicial, LibroProp } from "../libro/libro.interface";
import { SedeAdapterProp, sedeInicial, SedeProp } from "../sede/sede.interface";
import { Estado } from "./estado.enum";

export interface PedidoLibroAdapterProp extends BaseAdapterProp{
  cantidad: number;
  detalles?: string;
  estado: Estado;
  libro: LibroAdapterProp;
  sede: SedeAdapterProp;
  especificaciones: EspecificacionAdapterProp[];
}

export interface PedidoLibroProp extends BaseProp{
  cantidad: number;
  detalles?: string;
  estado: Estado;
  libro: LibroProp;
  sede: SedeProp;
  especificaciones: EspecificacionProp[];
}

export const pedidoLibroInicial :PedidoLibroProp= {
  ...baseInicial,
  cantidad: 0,
  detalles: '',
  estado: Estado.CANCELADO,
  libro: libroInicial,
  sede: sedeInicial,
  especificaciones: []
}