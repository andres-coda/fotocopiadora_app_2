import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";
import { Especificaciones } from "./especificacion.enum";

export interface EspecificacionAdapterProp extends BaseAdapterProp{
  nombre: Especificaciones;
}

export interface EspecificacionProp extends BaseProp{
  nombre: Especificaciones;
}

export const especificacionInicial :EspecificacionProp= {
  ...baseInicial,
  nombre: Especificaciones.COLOR,
}

export interface GruposExlusivosProp {
  opciones: Especificaciones[];
  defecto?: Especificaciones;
  obligatorio: boolean,
}