import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";

export interface NivelAdapterProp extends BaseAdapterProp{
  nombre: string;
}

export interface NivelProp extends BaseProp{
  nombre: string;
}

export const nivelInicial :NivelProp= {
  ...baseInicial,
  nombre: '',
}