import { Especificaciones } from "../especificacion/especificacion.enum";

export interface PedidoLibroDtoProp{
  cantidad:number,
  detalles?: string,
  especificaciones:Especificaciones[],
  libro: string,
  sede: string,
}