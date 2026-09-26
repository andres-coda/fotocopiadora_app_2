import { WritableDraft } from "@reduxjs/toolkit";
import { ActionProp, ReduxProp } from "../modelo/reduxContext.interface";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { CambiarEstadoLibroItem, CambiarEstadoPedidoProp } from "../../modelo/Entidades/pedido_libro/cambioEstado.interface";
import { PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";



export const modificarEstadoPedidoFuncion = (
  state: WritableDraft<ReduxProp<PedidoProp>>,
  action: ActionProp<CambiarEstadoPedidoProp>
) => {
  const newBusquedaActual = {
    ...state.busquedaActual,
    datosQuery: actualizarEstadoPedidoLista(action.payload, state.busquedaActual.datosQuery)
  };
  const datosIniciales = {
    ...state.busquedaActual,
    datosQuery: actualizarEstadoPedidoLista(action.payload, state.busquedaActual.datosQuery)
  };
  return {
    ...state,
    datosIniciales: datosIniciales,
    busquedaActual: newBusquedaActual,
    datoSeleccionado: modificarEstadoPedidoSelect(action.payload, state.datoSeleccionado)
  };
};

const modificarEstadoPedidoSelect = (prop: CambiarEstadoPedidoProp, pedido: PedidoProp | undefined): PedidoProp | undefined => {
  if (!prop?.id || !pedido || pedido.id != prop.id) return pedido;
  return {
    ...pedido,
    estado: prop.estado,
    ultAct: prop.ultAct ?? pedido.ultAct
  }
}

const actualizarEstadoPedidoLista = (prop: CambiarEstadoPedidoProp, pedidos: PedidoProp[]): PedidoProp[] => {
  if (!prop || !pedidos || pedidos.length === 0) return pedidos;
  return pedidos.map(pedido => {
    if (pedido.id != prop.id) return pedido;
    return {
      ...pedido,
      estado: prop.estado,
      ultAct: prop.ultAct ?? pedido.ultAct
    }
  });
}

const agregarItemsPedido = (items: PedidoLibroProp[], pedido: PedidoProp | undefined): PedidoProp | undefined => {
  if (!pedido) return pedido;
  return {
    ...pedido,
    libroPedidos: items
  }
}

export const agregarItemsPedidoSeleccionadoFincion = (
  state: WritableDraft<ReduxProp<PedidoProp>>,
  action: ActionProp<PedidoLibroProp[]>
) => {
  return {
    ...state,
    datoSeleccionado: agregarItemsPedido(action.payload, state.datoSeleccionado)
  };
}

export const cambiarSedePedidoLibroFuncion = (
  state: WritableDraft<ReduxProp<PedidoLibroProp>>,
  action: ActionProp<PedidoLibroProp>
) => {
  return {
    ...state,
    datoSeleccionado: cambiarSedeFuncion(action.payload, state.datoSeleccionado)
  };
}

const cambiarSedeFuncion = (prop: PedidoLibroProp, pedido: PedidoLibroProp | undefined): PedidoLibroProp | undefined => {
  if (!pedido) return pedido;
  return {
    ...pedido,
    sede: prop.sede
  }
}

/**
 * Actualiza el estado de un item en el slice pedidoLibro
 * Usa el mismo formato CambiarEstadoLibroPedidoProp que los reducers existentes
 * Actualiza: búsqueda inicial, búsqueda actual y dato seleccionado
 */
export const modificarEstadoPedidoLibroFuncion = (
  state: WritableDraft<ReduxProp<PedidoLibroProp>>,
  action: ActionProp<CambiarEstadoLibroItem[]>
) => {
  const newBusquedaActual = {
    ...state.busquedaActual,
    datosQuery: actualizarEstadoPedidoLibroLista(action.payload, state.busquedaActual.datosQuery)
  };
  const newDatosIniciales = {
    ...state.datosIniciales,
    datosQuery: actualizarEstadoPedidoLibroLista(action.payload, state.datosIniciales.datosQuery)
  };
  return {
    ...state,
    datosIniciales: newDatosIniciales,
    busquedaActual: newBusquedaActual,
    datoSeleccionado: modificarEstadoPedidoLibroSelected(action.payload, state.datoSeleccionado)
  };
};

const modificarEstadoPedidoLibroSelected = (prop: CambiarEstadoLibroItem[], pedidoLibro: PedidoLibroProp | undefined): PedidoLibroProp | undefined => {
  if (!prop || prop.length === 0 || !pedidoLibro) return pedidoLibro;
  const item: CambiarEstadoLibroItem | undefined = prop.find(i => i.idPedido === pedidoLibro.idPedido && i.nro === Number(pedidoLibro.id));
  if (!item) return pedidoLibro;
  return {
    ...pedidoLibro,
    estado: item.estado,
    ultAct: item.ultAct || pedidoLibro.ultAct
  }
}

const actualizarEstadoPedidoLibroLista = (prop: CambiarEstadoLibroItem[], pedidoLibros: PedidoLibroProp[]): PedidoLibroProp[] => {
  if (!prop?.length || !pedidoLibros?.length) return pedidoLibros;

  return pedidoLibros.map((pl) => {
    const item = prop.find(i => i.idPedido === pl.idPedido && i.nro === Number(pl.id));

    if (!item) return pl;

    return {
      ...pl,
      estado: item.estado,
      ultAct: item.ultAct || pl.ultAct
    };
  });
}