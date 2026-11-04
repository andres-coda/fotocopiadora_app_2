import { HasId } from "../../modelo/general/hasId.interface";

export interface filtroLlamada {
  id: string;
  estado: boolean;
  xor?: boolean;
}

export type orden = 'asc' | 'desc' | undefined;

export interface BusquedaRedux {
  query?: string;
  sortOrder: orden;
  pagina: number;
  limite: number;
  total: number;
  sortBy: string;
}

export interface UltimaBusquedaProp<T> extends Omit<BusquedaRedux, 'sortBy'> {
  datosQuery: T[];
  sortBy: keyof T;
  // Identifica una búsqueda alterada por filtros/orden, además del texto buscado.
  clave?: string;
}

export interface ReduxProp<T> {
  datosIniciales: UltimaBusquedaProp<T>;
  busquedaActual: UltimaBusquedaProp<T>;
  ultimasBusqueda: UltimaBusquedaProp<T>[];
  datoSeleccionado?: T;
  cargaInicial:boolean;
}

export interface ActionProp<T> {
  payload: T;
  type: string;
}

export interface ReduxSimple<T extends HasId>{
  datos:T[];
  cargaInicial: boolean;
  error?: string;
  loading: boolean;
};

export interface ReduxSimpleElemento<T extends HasId>{
  dato: T | null;
  cargaInicial: boolean;
  error?: string | null;
  loading: boolean;
};
