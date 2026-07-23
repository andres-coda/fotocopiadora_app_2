import { createSlice } from "@reduxjs/toolkit";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { ReduxProp, UltimaBusquedaProp } from "../modelo/reduxContext.interface";
import {crearDatoInicial, crearBusqueda, resetBusqueda, seleccionarDato, resetSeleccionDato, agregarDatosBusquedaActual} from "../utils/funcionesGenericasEmpresa";

const cantidadBusquedas: number = 1;

export const busquedaPrecioInicial: UltimaBusquedaProp<PrecioProp> = {
  query: undefined,
  datosQuery: [],
  pagina: 1,
  limite: 20,
  total: 0,
  orden: 'asc'
}

const estadoPrecioInicial: ReduxProp<PrecioProp> = {
  datosIniciales: busquedaPrecioInicial,
  busquedaActual: busquedaPrecioInicial,
  ultimasBusqueda: [],
  datoSeleccionado: undefined
}

export const precioSlice = createSlice({
  name: 'precio_empresa',
  initialState: estadoPrecioInicial,
  reducers: {
    crearPrecios: crearDatoInicial,
    crearBusquedaPrecio: crearBusqueda<PrecioProp>(cantidadBusquedas),
    resetBusquedaPrecio: resetBusqueda<PrecioProp>(cantidadBusquedas),
    seleccionarPrecio: seleccionarDato,
    resetSeleccionarPrecio: resetSeleccionDato,
    agregarPreciosBusquedaActual: agregarDatosBusquedaActual<PrecioProp>
  }
});

export const { crearPrecios, crearBusquedaPrecio, resetBusquedaPrecio, resetSeleccionarPrecio, seleccionarPrecio, agregarPreciosBusquedaActual } = precioSlice.actions;

export default precioSlice.reducer;

