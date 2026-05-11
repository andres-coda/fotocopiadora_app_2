import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";
import { Especificaciones } from "../especificacion/especificacion.enum";
import { ComponenteAdapterProp, ComponenteProp } from "./componente.interface";
import { MateriaAdapterProp, materiaInicial, MateriaProp } from "./materia.interface";
import { StockAdapterProp, stockInicial, StockProp } from "./stock.interface";

export interface LibroAdapterProp extends BaseAdapterProp{
  nombre: string;
  descripcion?:string;
  editorial?: string;
  edicion?: number;
  nivel?: string;
  cantidadPg: number;
  anio?: string;
  adhesivos?: number;
  autor?: string;
  img?: string;
  especificacionesDefecto?: Especificaciones[];
  componentes: ComponenteAdapterProp[];
  materia: MateriaAdapterProp;
  stock: StockAdapterProp;
}

export interface LibroProp extends BaseProp{
  nombre: string;
  descripcion?:string;
  editorial?: string;
  edicion?: number;
  nivel?: string;
  cantidadPg: number;
  anio?: string;
  adhesivos?: number;
  autor?: string;
  img?: string;
  especificacionesDefecto?: Especificaciones[];
  componentes?: ComponenteProp[];
  materia: MateriaProp;
  stock: StockProp;
}

export const libroInicial :LibroProp= {
  ...baseInicial,
  nombre: '',
  descripcion:'',
  editorial: '',
  edicion: 0,
  nivel: '',
  cantidadPg:0,
  anio: '',
  adhesivos: 0,
  autor: '',
  img: '',
  especificacionesDefecto: [],
  componentes: [],
  materia: materiaInicial,
  stock: stockInicial,
}