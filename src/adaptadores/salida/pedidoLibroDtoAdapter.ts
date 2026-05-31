import { PedidoLibroDtoProp } from "../../modelo/Entidades/pedido_libro/dtoPedidoLibro.interface";
import { PedidoLibroConstruccionProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";

interface Prop{
  pl:PedidoLibroConstruccionProp;
  sede: SedeProp;
}

export const pedidoLibroDtoAdapter = ({pl, sede}:Prop): PedidoLibroDtoProp => {
  return {
    cantidad: pl.cantidad ?? 1,
    detalles: pl.detalles ?? undefined,
    especificaciones: pl.especificaciones,
    libro: pl.libro.id,
    sede: pl.sede?.id ?? sede.id,
  }
} 

interface PropArray extends Pick<Prop, 'sede'>{
  pls?: PedidoLibroConstruccionProp[];
}

export const pedidoLibroDtoAdapterArray = ({pls, sede}:PropArray): PedidoLibroDtoProp[] => {
  if(!pls || pls.length === 0) return [];
  const newPedidoLibros: PedidoLibroDtoProp[] =
    pls?.flatMap(pl => {
      const pedidoLibro = pedidoLibroDtoAdapter({pl, sede});
      return pedidoLibro ? [pedidoLibro] : [];
    }) ?? [];

  return newPedidoLibros;
}