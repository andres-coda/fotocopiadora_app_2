export interface filtroLlamada{
  id:string;
  estado:boolean;
  xor?:boolean;
}

export interface FiltersState<T>{
  filtros:filtroLlamada[];
  sortBy: keyof T;
  sortOrder?: orden;
  // Agrega más filtros según necesites
}

export interface stateContext<T> {
  items: T[];
  selected: T | null;
}

export interface editContext<T> extends filterContext<T> {
  edit: T | null;
}

export interface filterContext<T> extends stateContext<T> {
  filter:FiltersState<T>
}

export type orden = 'asc' | 'desc' | undefined

export interface UltimaBusquedaProp<T>{
  query?: string;
  datosQuery: T[];
  orden: orden;
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