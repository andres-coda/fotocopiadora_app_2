import { camposBusquedaPedido } from "../../filtro/pedido.filtro";
import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { clienteInicial, ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { PedidoAdapterProp, PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { baseAdapter } from "./base.adapter";
import { clienteAdapter } from "./cliente.adapter";
import { pedidoLibroAdapter } from "./pedidoLibro.adapter";

const pedidoAdapter = (pedido: PedidoAdapterProp): PedidoProp | undefined => {
  if (!pedido) return undefined;

  const base: BaseProp | undefined = baseAdapter<PedidoAdapterProp>({ base: pedido, busqueda: camposBusquedaPedido });

  if (!base) return undefined;

  
  const cliente: ClienteProp | undefined = clienteAdapter(pedido.cliente);

  const pedidoLibro: PedidoLibroProp[] = pedido.libroPedidos?.flatMap(lp => {
    const libPedido = pedidoLibroAdapter(lp);
    return libPedido ? [libPedido] : [];
  }) ?? [];


  const newPedido: PedidoProp = {
    ...base,
    fechaEntrega: pedido.fechaEntrega,
    fechaTomado: pedido.fechaCreacion,
    importeTotal: pedido.importeTotal,
    archivos: pedido.archivos,
    anillados: pedido.anillados,
    sena: pedido.sena,
    estado: pedido.estado,
    libroPedidos: pedidoLibro,
    cliente: cliente ?? clienteInicial,
  }
  return newPedido;
}


export const pedidoAdapterArray = (pedidos?: PedidoAdapterProp[]): PedidoProp[] => {
  const newPedidos: PedidoProp[] =
    pedidos?.flatMap(p => {
      const pedido = pedidoAdapter(p);
      return pedido ? [pedido] : [];
    }) ?? [];

  return newPedidos;
}