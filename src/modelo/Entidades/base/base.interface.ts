export interface BaseAdapterProp {
  id: string;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
  deleted: boolean;
}

export interface BaseProp{
  id: string;
  ultAct: string;
  deleted: boolean;
  campoBusqueda?: { valor: string; tipo?: TipoBusqueda }[];
}

export enum TipoBusqueda {
  INVERSO = 'inverso',
  ESTRICTO = 'estricto',
}

interface CampoBusquedaResultado {
  valor: string;
  tipo?: TipoBusqueda;
}

export type CampoBusqueda<T> =
  (obj: T) => CampoBusquedaResultado;

export const baseInicial :BaseProp= {
  id: '',
  deleted:false,
  ultAct: '',
}