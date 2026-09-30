import { BaseAdapterProp, baseInicial } from "../base/base.interface";
import { ResumenProp } from "../cliente/resumen.interface";

export interface StockAdapterProp extends BaseAdapterProp {
  stock: number;
  pendiente: number;
  listo: number;
  retirado: number;
  cancelado: number;
}

export interface StockProp extends ResumenProp {
  stock?: number;
}

export const stockInicial: StockProp = {
  ...baseInicial,
  stock: 0,
  pendiente: 0,
  listo: 0,
  retirado: 0,
  cancelado: 0,
}