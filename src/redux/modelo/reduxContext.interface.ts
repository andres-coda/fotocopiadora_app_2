export interface filtroLlamada{
  id:string;
  estado:boolean;
  xor?:boolean;
}

export type orden = 'asc' | 'desc' | undefined

export interface BusquedaRedux {
  query?: string;
  sortOrder: orden;
  pagina: number;
  limite:number;
  total:number;
  sortBy: string;
}

export interface UltimaBusquedaProp<T> extends Omit<BusquedaRedux, 'sortBy'>{
  datosQuery: T[];
  sortBy: keyof T;
}

export interface ReduxProp<T>{
  datosIniciales: UltimaBusquedaProp<T>;
  busquedaActual:UltimaBusquedaProp<T>;
  ultimasBusqueda: UltimaBusquedaProp<T>[];
  datoSeleccionado?:T
}

export interface ActionProp<T> {
  payload: T;
  type: string;
}