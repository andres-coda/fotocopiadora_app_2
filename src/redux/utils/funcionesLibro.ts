import { WritableDraft } from "@reduxjs/toolkit";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { CambiarEstadoLibroPedidoProp } from "../../modelo/Entidades/pedido_libro/cambioEstado.interface";
import { ReduxProp } from "../modelo/reduxContext.interface";
import { ActionProp } from "../modelo/reduxContext.interface";

export const modificarStockFuncion = (
  state: WritableDraft<ReduxProp<LibroProp>>,
  action: ActionProp<CambiarEstadoLibroPedidoProp>
) => {
  const newBusquedaActual = {
    ...state.busquedaActual,
    datosQuery: actualizarStockLista(action.payload, state.busquedaActual.datosQuery)
  };

  return {
    ...state,
    busquedaActual: newBusquedaActual,
    datoSeleccionado: modificarStockSelected(action.payload, state.datoSeleccionado)
  };
};

const modificarStockSelected = (prop: CambiarEstadoLibroPedidoProp, libro: LibroProp | undefined): LibroProp | undefined => {
  if (!prop?.stock || !libro || libro.stock?.id != prop.stock.id) return libro;
  return {
    ...libro,
    stock: prop.stock
  }
}

const actualizarStockLista = (prop: CambiarEstadoLibroPedidoProp, libros: LibroProp[]): LibroProp[] => {
  if (!prop?.stock || !libros || libros.length === 0) return libros;
  return libros.map(l => {
    if (l.stock?.id != prop.stock.id) return l;
    return {
      ...l,
      stock: prop.stock
    }
  });
}