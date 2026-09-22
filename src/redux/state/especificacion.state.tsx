import { createSlice } from "@reduxjs/toolkit";
import { EspecificacionProp } from "../../modelo/Entidades/especificacion/especificacion.interface";
import { ReduxProp, UltimaBusquedaProp, orden } from "../modelo/reduxContext.interface";
import {crearDatoInicial, crearBusqueda, resetBusqueda, seleccionarDato, resetSeleccionDato, agregarDatosBusquedaActual, cambiarOrden} from "../utils/funcionesGenericasEmpresa";

const cantidadBusquedas: number = 1;

export const busquedaEspecificacionInicial: UltimaBusquedaProp<EspecificacionProp> = {
  query: undefined,
  datosQuery: [],
  sortBy: 'ultAct' as keyof EspecificacionProp,
  sortOrder: 'asc' as orden,
  pagina: 1,
  limite: 20,
  total: 0
}

const estadoEspecificacionInicial: ReduxProp<EspecificacionProp> = {
  datosIniciales: busquedaEspecificacionInicial,
  busquedaActual: busquedaEspecificacionInicial,
  ultimasBusqueda: [],
  datoSeleccionado: undefined
}

export const especificacionSlice = createSlice({
  name: 'especificacion',
  initialState: estadoEspecificacionInicial,
  reducers: {
    crearEspecificaciones: crearDatoInicial,
    crearBusquedaEspecificacion: crearBusqueda<EspecificacionProp>(cantidadBusquedas),
    resetBusquedaEspecificacion: resetBusqueda<EspecificacionProp>(cantidadBusquedas),
    seleccionarEspecificacion: seleccionarDato,
    resetSeleccionarEspecificacion: resetSeleccionDato,
    agregarEspecificacionesBusquedaActual: agregarDatosBusquedaActual<EspecificacionProp>,
    cambiarOrdenEspecificacion: cambiarOrden<EspecificacionProp>
  }
});

export const { 
  crearEspecificaciones, 
  crearBusquedaEspecificacion, 
  resetBusquedaEspecificacion, 
  resetSeleccionarEspecificacion, 
  seleccionarEspecificacion, 
  agregarEspecificacionesBusquedaActual,
  cambiarOrdenEspecificacion
} = especificacionSlice.actions;

export default especificacionSlice.reducer;