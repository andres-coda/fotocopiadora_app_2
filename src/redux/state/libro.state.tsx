import { createSlice } from "@reduxjs/toolkit";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { ReduxProp, UltimaBusquedaProp, orden } from "../modelo/reduxContext.interface";
import {crearDatoInicial, crearBusqueda, resetBusqueda, seleccionarDato, resetSeleccionDato, agregarDatosBusquedaActual, cambiarOrden} from "../utils/funcionesGenericasEmpresa";
import { modificarMuchosStockFuncion, modificarStockFuncion } from "../utils/funcionesLibro";

const cantidadBusquedas: number = 15;

export const busquedaLibroInicial: UltimaBusquedaProp<LibroProp> = {
  query: undefined,
  datosQuery: [],
  sortBy: 'nombre' as keyof LibroProp,
  sortOrder: 'asc' as orden,
  pagina: 1,
  limite: 20,
  total: 0
}

const estadoLibroInicial: ReduxProp<LibroProp> = {
  datosIniciales: busquedaLibroInicial,
  busquedaActual: busquedaLibroInicial,
  ultimasBusqueda: [],
  datoSeleccionado: undefined
}

export const libroSlice = createSlice({
  name: 'libro',
  initialState: estadoLibroInicial,
  reducers: {
    crearLibros: crearDatoInicial,
    crearBusquedaLibro: crearBusqueda<LibroProp>(cantidadBusquedas),
    resetBusquedaLibro: resetBusqueda<LibroProp>(cantidadBusquedas),
    seleccionarLibro: seleccionarDato,
    resetSeleccionarLibro: resetSeleccionDato,
    agregarLibrosBusquedaActual: agregarDatosBusquedaActual<LibroProp>,
    actualizarStock: modificarStockFuncion,
    actualizarMuchosStock: modificarMuchosStockFuncion,
    cambiarOrdenLibro: cambiarOrden<LibroProp>
  }
});

export const { 
  crearLibros, 
  crearBusquedaLibro, 
  resetBusquedaLibro, 
  resetSeleccionarLibro, 
  seleccionarLibro, 
  agregarLibrosBusquedaActual,
  actualizarStock,
  actualizarMuchosStock,
  cambiarOrdenLibro
} = libroSlice.actions;

export default libroSlice.reducer;