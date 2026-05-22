import { BaseAdapterProp, baseInicial, BaseProp } from "../base/base.interface";
import { Especificaciones } from "../especificacion/especificacion.enum";
import { ComponenteAdapterProp, ComponenteProp } from "./componente.interface";
import { MateriaAdapterProp, materiaInicial, MateriaProp } from "./materia.interface";
import { StockAdapterProp, stockInicial, StockProp } from "./stock.interface";

export interface LibroAdapterProp extends BaseAdapterProp {
  nombre: string;
  descripcion?: string;
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

export interface LibroProp extends BaseProp {
  nombre: string;
  descripcion?: string;
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

export const libroInicial: LibroProp = {
  ...baseInicial,
  nombre: '',
  descripcion: '',
  editorial: '',
  edicion: 0,
  nivel: '',
  cantidadPg: 0,
  anio: '',
  adhesivos: 0,
  autor: '',
  img: '',
  especificacionesDefecto: [],
  componentes: [],
  materia: materiaInicial,
  stock: stockInicial,
}

export const libroPrueba: LibroProp = {
  "id": "0d009053-c70a-48b3-a715-2939e930a224",
  "deleted": false,
  "ultAct": "No se conoce",
  "nombre": "Learn whit us NOW",
  "editorial": "OXFORD UNIVERSITY PRESS",
  "nivel": "1",
  "cantidadPg": 64,
  "anio": "2025",
  "img": "",
  "especificacionesDefecto": [
    Especificaciones.COLOR,
    Especificaciones.DOBLE_FAZ,
    Especificaciones.ANILLADO
  ],
  "componentes": [
    {
      "id": "4a664b79-ff87-4942-b1fa-c0d4abec8db1",
      "deleted": false,
      "ultAct": "No se conoce",
      "nombre": "Activity Book",
      campoBusqueda: []
    }
  ],
  "materia": {
    "id": "49236ca3-8a7d-4d88-b85e-4597219ef684",
    "deleted": false,
    "ultAct": "No se conoce",
    "nombre": "Ingles",
    campoBusqueda: []
  },
  "stock": {
    "id": "685bfdc1-56d2-4c5c-bf3a-860f61fa3d56",
    "deleted": false,
    "ultAct": "No se conoce",
    "stock": 22,
    "pendiente": 2,
    "listo": 282,
    "retirado": 2882,
    "cancelado": 2,
    campoBusqueda: []
  },
  campoBusqueda: []
}