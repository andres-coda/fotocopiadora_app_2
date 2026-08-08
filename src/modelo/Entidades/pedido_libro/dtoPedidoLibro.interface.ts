import { Especificaciones } from "../especificacion/especificacion.enum";

export interface PedidoLibroDtoProp{
  cantidad:number,
  detalles?: string,
  especificaciones:Especificaciones[],
  id_libro: string,
  id_sede: string,
}