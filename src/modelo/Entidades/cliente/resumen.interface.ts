import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";

export interface ResumenAdapterProp extends BaseAdapterProp {
  pendiente: number;
  listo: number;
  retirado: number;
  cancelado: number;
}

export interface ResumenProp extends BaseProp {
  pendiente: number;
  listo: number;
  retirado: number;
  cancelado: number;
}

export const resumenInicial:ResumenProp = {
  ...baseInicial,
  pendiente: 0,
  listo: 0,
  retirado: 0,
  cancelado: 0,
}