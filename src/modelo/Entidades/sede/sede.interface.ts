import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";

export interface SedeAdapterProp extends BaseAdapterProp{
  nombre: string;
}

export interface SedeProp extends BaseProp{
  nombre: string;
}

export const sedeInicial :SedeProp= {
  ...baseInicial,
  nombre: '',
}