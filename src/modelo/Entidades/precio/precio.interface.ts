import { BaseAdapterProp, baseInicial } from '../base/base.interface';
import { PrecioAbareviatura } from './precio.enum';

export interface PrecioNombreAdapterProp {
  id: string;
  nombre: string;
  abreviatura: PrecioAbareviatura;
  descripcion?: string;
}

export interface PrecioNombreProp {
  id: string;
  nombre: string;
  abreviatura: PrecioAbareviatura;
  descripcion?: string;
}

export interface PrecioAdapterProp extends BaseAdapterProp {
  descripcion?: string;
  importe: number;
  detalles?: string;
  nombre: string;
  abreviatura?: PrecioAbareviatura;
  categoria?: {
    id: string;
    nombre: string;
  }
}

export interface PrecioProp {
  id: string;
  descripcion?: string;
  detalles?: string;
  nombre: string;
  importe: number;
  categoria?: {
    id: string;
    nombre: string;
  }
  ultAct: string;
  deleted: boolean;
  abreviatura?: PrecioAbareviatura;
}

export const precioInicial: PrecioProp = {
  ...baseInicial,
  nombre: '',
  importe: 0,
};
