import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";

export interface PrecioAdapterProp extends BaseAdapterProp{
  nombre: string;
  importe: number;
}

export interface PrecioProp extends BaseProp{
  nombre: string;
  importe:number;
}

export const precioInicial :PrecioProp= {
  ...baseInicial,
  nombre: '',
  importe:0
}