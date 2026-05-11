import { BaseAdapterProp } from "../base/base.interface";

export interface ResumenAdapterProp extends BaseAdapterProp {
  pendiente: number;
  listo: number;
  retirado: number;
}