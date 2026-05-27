import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";
import { LibroAdapterProp, LibroProp } from "../libro/libro.interface";

export interface PropuestaAdapterProp extends BaseAdapterProp {
  nombre:string;
  libro?: LibroAdapterProp[];
}

export interface PropuestaProp extends BaseProp{
  nombre: string;
  cantidadLibros: number;
  libro?:LibroProp[];
}

export const PropuestaInicial:PropuestaProp = {
  ...baseInicial,
  nombre: '',
  cantidadLibros: 0,
  libro: [],
} 