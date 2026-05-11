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
}

export const baseInicial :BaseProp= {
  id: '',
  deleted:false,
  ultAct: ''
}