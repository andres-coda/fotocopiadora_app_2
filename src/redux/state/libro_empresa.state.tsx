import { createSlice } from "@reduxjs/toolkit";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { ReduxProp, UltimaBusquedaProp } from "../modelo/reduxContext.interface";
import {crearDatoInicial, crearBusqueda, resetBusqueda, seleccionarDato, resetSeleccionDato, agregarDatosBusquedaActual} from "../utils/funcionesGenericasEmpresa";

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

export const libroEmpresaSlice = createSlice({
  name: 'libro_empresa',
  initialState: estadoLibroInicial,
  reducers: {
    crearLibros: crearDatoInicial,
    crearBusquedaLibro: crearBusqueda<LibroProp>(cantidadBusquedas),
    resetBusquedaLibro: resetBusqueda<LibroProp>(cantidadBusquedas),
    seleccionarLibro: seleccionarDato,
    resetSeleccionarLibro: resetSeleccionDato,
    agregarLibrosBusquedaActual: agregarDatosBusquedaActual<LibroProp>
  }
});

export const { crearLibros, crearBusquedaLibro, resetBusquedaLibro, resetSeleccionarLibro, seleccionarLibro, agregarLibrosBusquedaActual } = libroEmpresaSlice.actions;

export default libroEmpresaSlice.reducer;

