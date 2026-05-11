import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";

export interface MateriaAdapterProp extends BaseAdapterProp{
  nombre: string;
}

export interface MateriaProp extends BaseProp{
  nombre: string;
}

export const materiaInicial :MateriaProp= {
  ...baseInicial,
  nombre: '',
}