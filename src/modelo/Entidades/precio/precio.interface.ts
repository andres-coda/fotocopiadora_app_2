import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";
import { PrecioAbareviatura } from "./precio.enum";

export interface PrecioAdapterProp{
  idPrecio: string;
  descripcion?: string;
  fecha_actualizacion: Date;
  fecha_creacion: Date;
  delete: boolean;
  importe: number;
  detalles?: string;
  nombre: string;
  abreviatura?: PrecioAbareviatura;
}

export interface PrecioProp{
  id:string;
  descripcion?: string;
  detalles?: string;
  nombre: string;
  importe:number;
  ultAct: string;
  deleted: boolean;
  abreviatura?:PrecioAbareviatura;
}

export const precioInicial :PrecioProp= {
  ...baseInicial,
  nombre: '',
  importe:0
}