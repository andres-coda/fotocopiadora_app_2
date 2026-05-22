import { camposBusquedaPedidoLibro } from "../../filtro/pedido_libro.filtro";
import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { libroInicial, LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { PedidoLibroAdapterProp, PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { sedeInicial, SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { baseAdapter } from "./base.adapter";
import { libroAdapter } from "./libro.adapter";
import { sedeAdapter } from "./sede.adapter";

export const pedidoLibroAdapter = (pedidoLibro?: PedidoLibroAdapterProp): PedidoLibroProp | undefined => {
  if (!pedidoLibro) return undefined;

  const base: BaseProp | undefined = baseAdapter<PedidoLibroAdapterProp>({ base: pedidoLibro, busqueda: camposBusquedaPedidoLibro });

  if (!base) return undefined;

  const libro: LibroProp | undefined = libroAdapter(pedidoLibro.libro);
  const sede: SedeProp | undefined = sedeAdapter(pedidoLibro.sede);
  const campoBusqueda: string[] = campoBusquedaExtraer(pedidoLibro);

  const newPedidoLibro: PedidoLibroProp = {
    ...base,
    cantidad: pedidoLibro.cantidad,
    detalles: pedidoLibro.detalles,
    estado: pedidoLibro.estado,
    libro: libro || libroInicial,
    sede: sede || sedeInicial,
    especificaciones: [],
    campoBusqueda
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

const campoBusquedaExtraer = (pl: PedidoLibroAdapterProp): string[] => {
  const campos: string[] = [];
  if (pl.detalles) campos.push(pl.detalles);
  if (pl.libro?.nombre) campos.push(pl.libro.nombre)
  if (pl.libro?.nivel) campos.push(pl.libro.nivel)
  if (pl.libro?.componentes && pl.libro?.componentes?.length != 0) pl.libro.componentes.map(c => campos.push(c.nombre));
  return campos;
}