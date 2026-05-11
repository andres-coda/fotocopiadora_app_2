import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";

export interface ComponenteAdapterProp extends BaseAdapterProp{
  nombre: string;
}

export interface ComponenteProp extends BaseProp{
  nombre: string;
}

export const componenteInicial :ComponenteProp= {
  ...baseInicial,
  nombre: '',
}