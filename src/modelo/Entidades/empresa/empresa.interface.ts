import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";

export interface EmpresaAdapterProp extends BaseAdapterProp {
  nombre: string;
  email: string;
  telefono: string;
}

export interface EmpresaProp extends BaseProp {
  nombre: string;
  email: string;
  telefono: string;
}

export const empresaInicial: EmpresaProp = {
  ...baseInicial,
  nombre: '',
  email: '',
  telefono: '',
}
