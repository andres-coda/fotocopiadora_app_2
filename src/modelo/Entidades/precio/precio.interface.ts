import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";
import { PrecioAbareviatura } from "./precio.enum";

export interface PrecioAdapterProp extends BaseAdapterProp{
  nombre: string;
  importe: number;
  abreviatura?: PrecioAbareviatura[];
}

export interface PrecioProp extends BaseProp{
  nombre: string;
  importe:number;
  abreviatura?:PrecioAbareviatura[];
}

export const precioInicial :PrecioProp= {
  ...baseInicial,
  nombre: '',
  importe:0
}