import { WritableDraft } from "@reduxjs/toolkit";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { ReduxProp } from "../modelo/reduxContext.interface";
import { ActionProp } from "../modelo/reduxContext.interface";
import { StockProp } from "../../modelo/Entidades/libro/stock.interface";

export const modificarMuchosStockFuncion = (
  state: WritableDraft<ReduxProp<LibroProp>>,
  action: ActionProp<StockProp[]>
) => {
  const newBusquedaActual = {
    ...state.busquedaActual,
    datosQuery: actualizarMuchosStockLista(action.payload, state.busquedaActual.datosQuery)
  };

  const newDatosIniciales = {
    ...state.datosIniciales,
    datosQuery: actualizarMuchosStockLista(action.payload, state.datosIniciales.datosQuery)
  };

  return {
    ...state,
    datosIniciales: newDatosIniciales,
    busquedaActual: newBusquedaActual,
    datoSeleccionado: modificarMuchosStockSelected(action.payload, state.datoSeleccionado)
  };
}

export const modificarStockFuncion = (
  state: WritableDraft<ReduxProp<LibroProp>>,
  action: ActionProp<StockProp>
) => {
  const newBusquedaActual = {
    ...state.busquedaActual,
    datosQuery: actualizarStockLista(action.payload, state.busquedaActual.datosQuery)
  };

  const newDatosIniciales = {
    ...state.datosIniciales,
    datosQuery: actualizarStockLista(action.payload, state.datosIniciales.datosQuery)
  };

  return {
    ...state,
    datosIniciales: newDatosIniciales,
    busquedaActual: newBusquedaActual,
    datoSeleccionado: modificarStockSelected(action.payload, state.datoSeleccionado)
  };
};

const modificarStockSelected = (prop: StockProp, libro: LibroProp | undefined): LibroProp | undefined => {
  if (!prop || !libro || libro.id != prop.id) return libro;
  return {
    ...libro,
    stock: prop
  }
}

const actualizarStockLista = (prop: StockProp, libros: LibroProp[]): LibroProp[] => {
  if (!prop || !libros || libros.length === 0) return libros;
  return libros.map(l => {
    if (l.id != prop.id) return l;
    return {
      ...l,
      stock: prop
    }
  });
}

const actualizarMuchosStockLista = (prop: StockProp[], libros: LibroProp[]): LibroProp[] => {
   if (!prop?.length || !libros?.length) return libros;

  return libros.map((libro) => {
    const stock = prop.find((s) => s.id === libro.id);

    if (!stock) return libro;

    return {
      ...libro,
      stock
    };
  });
}

const modificarMuchosStockSelected = (prop: StockProp[], libro: LibroProp | undefined): LibroProp | undefined => {
  if (!prop || prop.length === 0 || !libro) return libro;
  const stock:StockProp | undefined = prop.find(s=> s.id === libro.id);
  if(!stock) return libro;
  return {
    ...libro,
    stock
  }
}