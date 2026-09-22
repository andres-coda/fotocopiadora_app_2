import { createSlice } from "@reduxjs/toolkit";
import { PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";
import { ReduxProp, UltimaBusquedaProp, orden } from "../modelo/reduxContext.interface";
import { agregarDatosBusquedaActual, crearBusqueda, crearDatoInicial, resetBusqueda, resetSeleccionDato, seleccionarDato, cambiarOrden } from "../utils/funcionesGenericasEmpresa";

const cantidadBusquedas: number = 15;

export const busquedaPropuestaInicial: UltimaBusquedaProp<PropuestaProp> = {
  query: undefined,
  datosQuery: [],
  sortBy: 'ultAct' as keyof PropuestaProp,
  sortOrder: 'asc' as orden,
  pagina: 1,
  limite: 20,
  total: 0
}

const estadoPropuestaInicial: ReduxProp<PropuestaProp> = {
  datosIniciales: busquedaPropuestaInicial,
  busquedaActual: busquedaPropuestaInicial,
  ultimasBusqueda: [],
  datoSeleccionado: undefined
}

export const propuestaSlice = createSlice({
  name: 'propuesta_empresa',
  initialState: estadoPropuestaInicial,
  reducers: {
    crearPropuestas: crearDatoInicial,
    crearBusquedaPropuesta: crearBusqueda<PropuestaProp>(cantidadBusquedas),
    resetBusquedaPropuesta: resetBusqueda<PropuestaProp>(cantidadBusquedas),
    seleccionarPropuesta: seleccionarDato,
    resetSeleccionarPropuesta: resetSeleccionDato,
    agregarPropuestasBusquedaActual: agregarDatosBusquedaActual<PropuestaProp>,
    cambiarOrdenPropuesta: cambiarOrden<PropuestaProp>
  }
});

export const { crearPropuestas, crearBusquedaPropuesta, resetBusquedaPropuesta, resetSeleccionarPropuesta, seleccionarPropuesta, agregarPropuestasBusquedaActual, cambiarOrdenPropuesta } = propuestaSlice.actions;

export default propuestaSlice.reducer;