import { WritableDraft } from "@reduxjs/toolkit";
import { ActionProp, ReduxProp } from "../modelo/reduxContext.interface";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { CambiarEstadoLibroPedidoProp } from "../../modelo/Entidades/pedido_libro/cambioEstado.interface";
import { PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";

export const modificarEstadoPedidoFuncion = (
  state: WritableDraft<ReduxProp<PedidoProp>>,
  action: ActionProp<CambiarEstadoLibroPedidoProp>
) => {
  const newBusquedaActual = {
    ...state.busquedaActual,
    datosQuery: actualizarEstadoPedidoLista(action.payload, state.busquedaActual.datosQuery)
  };
  return {
    ...state,
    busquedaActual: newBusquedaActual,
    datoSeleccionado: modificarEstadoPedidoSelect(action.payload, state.datoSeleccionado)
  };
};

const modificarEstadoPedidoSelect = (prop: CambiarEstadoLibroPedidoProp, pedido: PedidoProp | undefined): PedidoProp | undefined => {
  if (!prop?.idPedido || !pedido || pedido.id != prop.idPedido) return pedido;
  return {
    ...pedido,
    estado: prop.pedido.estado
  }
}

const actualizarEstadoPedidoLista = (prop: CambiarEstadoLibroPedidoProp, pedidos: PedidoProp[]): PedidoProp[] => {
  if (!prop?.resumenCliente || !pedidos || pedidos.length === 0) return pedidos;
  return pedidos.map(pedido => {
    if (pedido.id != prop.idPedido) return pedido;
    return {
      ...pedido,
      estado: prop.pedido.estado
    }
  });
}

const agregarItemsPedido = (items: PedidoLibroProp[], pedido: PedidoProp | undefined):PedidoProp | undefined=>{
  if(!pedido) return pedido;
  return {
    ...pedido,
    libroPedidos: items
  }
}

export const agregarItemsPedidoSeleccionadoFincion = (
  state: WritableDraft<ReduxProp<PedidoProp>>,
  action: ActionProp<PedidoLibroProp[]>
)  => {
  return {
    ...state,
    datoSeleccionado: agregarItemsPedido(action.payload, state.datoSeleccionado)
  };
}

