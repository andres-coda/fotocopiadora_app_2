import { Especificaciones } from "../Entidades/especificacion/especificacion.enum";
import { LibroProp } from "../Entidades/libro/libro.interface";
import { PrecioProp } from "../Entidades/precio/precio.interface";

export interface PresupuestoProp {
  libro?: LibroProp;
  nuevasEsp?: Especificaciones[];
  libros?: LibroProp[];
}

export interface CalcularPresupuestoRetorno {
  texto: string;
  valor: number;
}

export interface CalcularPresupuestoProp extends PresupuestoProp {
  precios: PrecioProp[]
}
