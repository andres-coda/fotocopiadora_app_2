import { Especificaciones } from "../especificacion/especificacion.enum";

export interface libroDtoProp{
    nombre:string;
    descripcion?: string;
    autor?: string;
    edicion?: number;
    nivel?: string;
    editorial?: string;
    anio?: string;
    img?: string;
    cantidadPg: number;
    adhesivos?: number;
    materia: string;
    componentes?: string[];
    especificacionesDefecto?: Especificaciones[];
}
