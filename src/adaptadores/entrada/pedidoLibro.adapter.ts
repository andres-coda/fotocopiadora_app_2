import { camposBusquedaPedidoLibro } from "../../filtro/pedido_libro.filtro";
import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { EspecificacionProp } from "../../modelo/Entidades/especificacion/especificacion.interface";
import { libroInicial, LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { PedidoLibroAdapterProp, PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { sedeInicial, SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { baseAdapter } from "./base.adapter";
import { especificacionAdapterArray } from "./especificacion.adapter";
import { libroAdapter } from "./libro.adapter";
import { sedeAdapter } from "./sede.adapter";

export const pedidoLibroAdapter = (pedidoLibro?: PedidoLibroAdapterProp): PedidoLibroProp | undefined => {
  if (!pedidoLibro) return undefined;

  const base: BaseProp | undefined = baseAdapter<PedidoLibroAdapterProp>({ base: pedidoLibro, busqueda: camposBusquedaPedidoLibro });

  if (!base) return undefined;

  const libro: LibroProp | undefined = libroAdapter(pedidoLibro.libro);
  const sede: SedeProp | undefined = sedeAdapter(pedidoLibro.sede);
  const especificaciones: EspecificacionProp[] = especificacionAdapterArray(pedidoLibro.especificaciones);


  const newPedidoLibro: PedidoLibroProp = {
    ...base,
    cantidad: pedidoLibro.cantidad,
    detalles: pedidoLibro.detalles,
    estado: pedidoLibro.estado,
    libro: libro || libroInicial,
    sede: sede || sedeInicial,
    especificaciones,
  }
  return newPedidoLibro;
}

export const pedidoLibroAdapterArray = (pedidoLibros?: PedidoLibroAdapterProp[]): PedidoLibroProp[] => {
  const newPedidoLibros: PedidoLibroProp[] =
    pedidoLibros?.flatMap(pl => {
      const pedLibro = pedidoLibroAdapter(pl);
      return pedLibro ? [pedLibro] : [];
    }) ?? [];

  return newPedidoLibros;
}