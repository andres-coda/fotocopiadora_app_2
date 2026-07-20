import { createSlice, WritableDraft } from "@reduxjs/toolkit";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { ActionProp, ReduxProp, UltimaBusquedaProp } from "../modelo/reduxContext.interface";

const cantidadBusquedas: number = 15;

export const busquedaLibroInicial: UltimaBusquedaProp<LibroProp> = {
  query: undefined,
  datosQuery: [],
  pagina: 1,
  limite: 20,
  total: 0,
  orden: 'asc'
}

const estadoLibroInicial: ReduxProp<LibroProp> = {
  datosIniciales: busquedaLibroInicial,
  busquedaActual: busquedaLibroInicial,
  ultimasBusqueda: [],
  datoSeleccionado: undefined
}

const createDatoInicial = (state: WritableDraft<ReduxProp<LibroProp>>, action: ActionProp<UltimaBusquedaProp<LibroProp>>) => {
  state.datosIniciales = { ...action.payload };
  state.busquedaActual = { ...action.payload };
};

const evaluarUltimasBusquedas = (state: WritableDraft<ReduxProp<LibroProp>>, nueva: UltimaBusquedaProp<LibroProp>): void => {

  const indice = state.ultimasBusqueda.findIndex(
    b => b.query === nueva.query
  );

  if (indice !== -1) {
    const [busqueda] = state.ultimasBusqueda.splice(indice, 1);
    state.ultimasBusqueda.push(busqueda);
  } else {
    if (state.ultimasBusqueda.length === cantidadBusquedas) {
      state.ultimasBusqueda.shift();
    }
    state.ultimasBusqueda.push(nueva);
  }
}

const createBusqueda = (state: WritableDraft<ReduxProp<LibroProp>>, action: ActionProp<UltimaBusquedaProp<LibroProp>>) => {
  evaluarUltimasBusquedas(state, { ...action.payload });
  state.busquedaActual = { ...action.payload };
};

const resetBusqueda = (state: WritableDraft<ReduxProp<LibroProp>>) => {
  if (!state.busquedaActual) return;
  evaluarUltimasBusquedas(state, { ...state.busquedaActual });
  state.busquedaActual = { ...state.datosIniciales };
}

const seleccionarDato = (state: WritableDraft<ReduxProp<LibroProp>>, action: ActionProp<LibroProp>) => {
  state.datoSeleccionado = { ...action.payload };
}

const resetSeleccionDato = (state: WritableDraft<ReduxProp<LibroProp>>) => {
  state.datoSeleccionado = undefined;
}

export const libroEmpresaSlice = createSlice({
  name: 'libro_empresa',
  initialState: estadoLibroInicial,
  reducers: {
    crearLibros: createDatoInicial,
    crearBusquedaLibro: createBusqueda,
    resetBusquedaLibro: resetBusqueda,
    seleccionarLibro: seleccionarDato,
    resetSeleccionarLibro: resetSeleccionDato
  }
});

export const { crearLibros, crearBusquedaLibro, resetBusquedaLibro, resetSeleccionarLibro, seleccionarLibro } = libroEmpresaSlice.actions;

export default libroEmpresaSlice.reducer;

