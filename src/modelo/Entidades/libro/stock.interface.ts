import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";

export interface StockAdapterProp extends BaseAdapterProp {
  stock: number;
  pendiente: number;
  listo: number;
  retirado: number;
  cancelado: number;
}

export interface StockProp extends BaseProp {
  stock: number;
  pendiente: number;
  listo: number;
  retirado: number;
  cancelado: number;
}

export const stockInicial: StockProp = {
  ...baseInicial,
  stock: 0,
  pendiente: 0,
  listo: 0,
  retirado: 0,
  cancelado: 0,
}