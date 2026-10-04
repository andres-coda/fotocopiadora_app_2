import { WritableDraft } from "@reduxjs/toolkit";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { ReduxProp } from "../modelo/reduxContext.interface";
import { ActionProp } from "../modelo/reduxContext.interface";
import { stockIndividualProp, StockProp } from "../../modelo/Entidades/libro/stock.interface";

export const actualizarMuchosStockFn = (
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

export const actualizarStockFn = (
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
  const stock: StockProp | undefined = prop.find(s => s.id === libro.id);
  if (!stock) return libro;
  return {
    ...libro,
    stock
  }
}

export const actualizarStockLocalFn = (
  state: WritableDraft<ReduxProp<LibroProp>>,
  action: ActionProp<stockIndividualProp>
) => {
  const newBusquedaActual = {
    ...state.busquedaActual,
    datosQuery: actualizarStockLocalLista(action.payload, state.busquedaActual.datosQuery)
  };

  const newDatosIniciales = {
    ...state.datosIniciales,
    datosQuery: actualizarStockLocalLista(action.payload, state.datosIniciales.datosQuery)
  };

  return {
    ...state,
    datosIniciales: newDatosIniciales,
    busquedaActual: newBusquedaActual,
    datoSeleccionado: modificarStockLocalSelected(action.payload, state.datoSeleccionado)
  };
};

const actualizarStockLocalLista = (
  prop: stockIndividualProp,
  libros: LibroProp[]
): LibroProp[] => {

  if (!prop || !libros.length) return libros;

  return libros
    .map(libro => modificarStockLocalSelected(prop, libro))
    .filter((libro): libro is LibroProp => libro !== undefined);
}

const modificarStockLocalSelected = (prop: stockIndividualProp, libro: LibroProp | undefined): LibroProp | undefined => {
  if (!prop || !libro || libro.id != prop.id || !libro.stock) return libro;
  const newStock: StockProp = {
      ...libro.stock,
      stock: prop.stock
    }
    return {
      ...libro,
      stock:newStock
    }
}
