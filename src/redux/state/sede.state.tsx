import { createSlice } from "@reduxjs/toolkit";
import { ReduxProp, UltimaBusquedaProp, orden } from "../modelo/reduxContext.interface";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import {crearDatoInicial, crearBusqueda, resetBusqueda, seleccionarDato, resetSeleccionDato, agregarDatosBusquedaActual, cambiarOrden} from "../utils/funcionesGenericasEmpresa";

const cantidadBusquedas: number = 1;

export const busquedaSedeInicial: UltimaBusquedaProp<SedeProp> = {
  query: undefined,
  datosQuery: [],
  sortBy: 'ultAct' as keyof SedeProp,
  sortOrder: 'asc' as orden,
  pagina: 1,
  limite: 20,
  total: 0
}

const estadoSedeInicial: ReduxProp<SedeProp> = {
  datosIniciales: busquedaSedeInicial,
  busquedaActual: busquedaSedeInicial,
  ultimasBusqueda: [],
  datoSeleccionado: undefined
}

export const sedeSlice = createSlice({
  name: 'sede',
  initialState: estadoSedeInicial,
  reducers: {
    crearSedes: crearDatoInicial,
    crearBusquedaSede: crearBusqueda<SedeProp>(cantidadBusquedas),
    resetBusquedaSede: resetBusqueda<SedeProp>(cantidadBusquedas),
    seleccionarSede: seleccionarDato,
    resetSeleccionarSede: resetSeleccionDato,
    agregarSedesBusquedaActual: agregarDatosBusquedaActual<SedeProp>,
    cambiarOrdenSede: cambiarOrden<SedeProp>
  }
});

export const { crearSedes, crearBusquedaSede, resetBusquedaSede, resetSeleccionarSede, seleccionarSede, agregarSedesBusquedaActual, cambiarOrdenSede } = sedeSlice.actions;

export default sedeSlice.reducer;