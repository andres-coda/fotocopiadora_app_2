import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";
import { ConfiguracionAdapterProp, ConfiguracionProp } from "../configuracion/configuracion.interface";

export interface EmpresaAdapterProp extends BaseAdapterProp {
  nombre: string;
  email: string;
  telefono: string;
  configuracion?: ConfiguracionAdapterProp;
}

export interface EmpresaProp extends BaseProp {
  nombre: string;
  email: string;
  telefono: string;
  configuracion?: ConfiguracionProp;
}

export const empresaInicial: EmpresaProp = {
  ...baseInicial,
  nombre: '',
  email: '',
  telefono: '',
}
