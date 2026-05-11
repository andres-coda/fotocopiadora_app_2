import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";
import { ResumenAdapterProp } from "./resumen.interface";

export interface ClienteAdapterProp extends BaseAdapterProp{
  nombre?: string;
  telefono?: string;
  email?: string;  
  resumen:ResumenAdapterProp;
}

export interface ClienteProp extends BaseProp{
  nombre?: string;
  telefono?: string;
  email?: string;  
  pendiente: number;
  listo: number;
  retirado: number;  
}

export const clienteInicial :ClienteProp= {
  ...baseInicial,
  nombre: '',
  telefono: '',
  email: '',  
  pendiente: 0,
  listo: 0,
  retirado: 0
}