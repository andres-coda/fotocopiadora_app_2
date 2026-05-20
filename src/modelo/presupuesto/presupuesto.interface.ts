import { Especificaciones } from "../Entidades/especificacion/especificacion.enum";
import { LibroProp } from "../Entidades/libro/libro.interface";

export interface PresupuestoProp{
    libro: LibroProp;
    nuevasEsp?: Especificaciones[];
}