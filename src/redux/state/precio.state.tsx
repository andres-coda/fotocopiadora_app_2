import { createSlice } from "@reduxjs/toolkit";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { ReduxProp, UltimaBusquedaProp, orden } from "../modelo/reduxContext.interface";
import {crearDatoInicial, crearBusqueda, resetBusqueda, seleccionarDato, resetSeleccionDato, agregarDatosBusquedaActual, cambiarOrden} from "../utils/funcionesGenericasEmpresa";

const cantidadBusquedas: number = 1;

export const busquedaPrecioInicial: UltimaBusquedaProp<PrecioProp> = {
  query: undefined,
  datosQuery: [],
  sortBy: 'ultAct' as keyof PrecioProp,
  sortOrder: 'asc' as orden,
  pagina: 1,
  limite: 20,
  total: 0
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
    agregarPreciosBusquedaActual: agregarDatosBusquedaActual<PrecioProp>,
    cambiarOrdenPrecio: cambiarOrden<PrecioProp>
  }
});

export const { crearPrecios, crearBusquedaPrecio, resetBusquedaPrecio, resetSeleccionarPrecio, seleccionarPrecio, agregarPreciosBusquedaActual, cambiarOrdenPrecio } = precioSlice.actions;

export default precioSlice.reducer;