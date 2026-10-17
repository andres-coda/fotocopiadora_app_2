import { WritableDraft } from "@reduxjs/toolkit";
import { ActionProp, ReduxProp, UltimaBusquedaProp } from "../modelo/reduxContext.interface";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { CambiarEstadoItemProp, CambiarEstadoPedidoCompletoProp, CambiarEstadoPedidoProp } from "../../modelo/Entidades/pedido_libro/cambioEstado.interface";
import { PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";

export const modificarEstadoPedidoRedux = (
  state: WritableDraft<ReduxProp<PedidoProp>>,
  action: ActionProp<CambiarEstadoPedidoCompletoProp>
) => {
  const newBusquedaActual = {
    ...state.busquedaActual,
    datosQuery: actualizarEstadoPedidoLista(action.payload.pedido, state.busquedaActual.datosQuery)
  };
  const newDatosIniciales = {
    ...state.datosIniciales,
    datosQuery: actualizarEstadoPedidoLista(action.payload.pedido, state.datosIniciales.datosQuery)
  };
  return {
    ...state,
    datosIniciales: newDatosIniciales,
    busquedaActual: newBusquedaActual,
    datoSeleccionado: modificarEstadoPedidoSelect(action.payload, state.datoSeleccionado)
  };
};

const modificarEstadoPedidoSelect = (prop: CambiarEstadoPedidoCompletoProp, pedido: PedidoProp | undefined): PedidoProp | undefined => {
  if (!prop?.pedido.id || !pedido || pedido.id != prop.pedido.id) return pedido;
  
  // Actualizar estado del pedido
  const updatedPedido = {
    ...pedido,
    estado: prop.pedido.estado,
    ultAct: prop.pedido.ultAct ?? pedido.ultAct
  };
  
  // Actualizar items del pedido si vienen en la respuesta
  if (prop.items && prop.items.length > 0) {
    updatedPedido.libroPedidos = actualizarItemsPedidoLista(prop.items, pedido.libroPedidos);
  }
  
  return updatedPedido;
};

const actualizarItemsPedidoLista = (items: CambiarEstadoItemProp[], libroPedidos: PedidoLibroProp[]): PedidoLibroProp[] => {
  if (!items?.length || !libroPedidos?.length) return libroPedidos;
  
  return libroPedidos.map(lp => {
    const item = items.find(i => i.idPedido === lp.idPedido && i.id === lp.id);
    if (!item) return lp;
    return {
      ...lp,
      estado: item.estado,
      ultAct: item.ultAct ?? lp.ultAct
    };
  });
};

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
};

const agregarItemsPedido = (items: PedidoLibroProp[], pedido: PedidoProp | undefined): PedidoProp | undefined => {
  if (!pedido) return pedido;
  return {
    ...pedido,
    libroPedidos: items
  }
}

export const agregarItemsPedidoSeleccionadoRedux = (
  state: WritableDraft<ReduxProp<PedidoProp>>,
  action: ActionProp<PedidoLibroProp[]>
) => {
  return {
    ...state,
    datoSeleccionado: agregarItemsPedido(action.payload, state.datoSeleccionado)
  };
}

export const cambiarSedePedidoLibroRedux = (
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
 * Actualiza el estado de items en el slice pedidoLibro
 * Actualiza: búsqueda inicial, búsqueda actual y dato seleccionado
 */
export const modificarEstadoPedidoLibroFn = (
  state: WritableDraft<ReduxProp<PedidoLibroProp>>,
  action: ActionProp<CambiarEstadoPedidoCompletoProp>
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
    ultimasBusqueda: modificarEstadoItemUltimaBusqueda(action.payload, state.ultimasBusqueda),
    datoSeleccionado: modificarEstadoPedidoLibroSelected(action.payload.items, state.datoSeleccionado)
  };
};

const modificarEstadoItemUltimaBusqueda = (prop: CambiarEstadoPedidoCompletoProp, ultBusqueda: UltimaBusquedaProp<PedidoLibroProp>[]): UltimaBusquedaProp<PedidoLibroProp>[] => {
  if (!prop || !prop.items?.length || !ultBusqueda || ultBusqueda.length === 0) return ultBusqueda;
  return ultBusqueda.map(ub => {
    return {
      ...ub,
      datosQuery: actualizarEstadoPedidoLibroLista(prop, ub.datosQuery)
    }
  })
}

const modificarEstadoPedidoLibroSelected = (prop: CambiarEstadoItemProp[], pedidoLibro: PedidoLibroProp | undefined): PedidoLibroProp | undefined => {
  if (!prop || prop.length === 0 || !pedidoLibro) return pedidoLibro;
  const item: CambiarEstadoItemProp | undefined = prop.find(i => i.idPedido === pedidoLibro.idPedido && i.id === pedidoLibro.id);
  if (!item) return pedidoLibro;
  return {
    ...pedidoLibro,
    estado: item.estado,
    ultAct: item.ultAct || pedidoLibro.ultAct
  }
}

const actualizarEstadoPedidoLibroLista = (prop: CambiarEstadoPedidoCompletoProp, pedidoLibros: PedidoLibroProp[]): PedidoLibroProp[] => {
  if (!prop.items?.length || !pedidoLibros?.length) return pedidoLibros;

  return pedidoLibros.map((pl) => {
    const item = prop.items.find(i => i.idPedido === pl.idPedido && i.id === pl.id);

    if (!item) return pl;

    const pedido = !pl.pedido ? undefined : {
      ...pl.pedido,
      estado: prop.pedido.estado,
    }

    return {
      ...pl,
      estado: item.estado,
      ultAct: item.ultAct || pl.ultAct,
      pedido
    };
  });
}