export interface filtroLlamada{
  id:string;
  estado:boolean;
  xor?:boolean;
}

export type orden = 'asc' | 'desc' | undefined

export interface UltimaBusquedaProp<T>{
  query?: string;
  datosQuery: T[];
  sortBy: keyof T;
  sortOrder: orden;
  pagina: number;
  limite:number;
  total:number;
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