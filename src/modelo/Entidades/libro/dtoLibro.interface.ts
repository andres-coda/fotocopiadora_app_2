import { Especificaciones } from "../especificacion/especificacion.enum";

export interface LibroEmresaDtoProp {
  cantidadPg: number;
  adhesivos?: number;
  especificacionesDefecto?: Especificaciones[];
  detalle_impresion?: string;
}

export interface LibroExtraDtoProp{
  anio?: string;
  img?: string;
  descripcion?: string;
  autor?: string;
  edicion?: number;
}

export interface LibroPrincipalDtoProp{
  nombre: string;
  nivel?: string;
  editorial?: string;
  materia: string;
  componentes?: string[];
}

export interface libroDtoProp extends LibroExtraDtoProp, LibroEmresaDtoProp, LibroPrincipalDtoProp {
}


