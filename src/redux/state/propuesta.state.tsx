import { createSlice } from "@reduxjs/toolkit";
import { PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";
import { ReduxProp, UltimaBusquedaProp } from "../modelo/reduxContext.interface";
import { crearBusqueda, crearDatoInicial, resetBusqueda, resetSeleccionDato, seleccionarDato } from "../utils/funcionesGenericasEmpresa";


const cantidadBusquedas: number = 15;

export const busquedaPropuestaInicial: UltimaBusquedaProp<PropuestaProp> = {
  query: undefined,
  datosQuery: [],
  pagina: 1,
  limite: 20,
  total: 0,
  orden: 'asc'
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
    resetSeleccionarPropuesta: resetSeleccionDato
  }
});

export const { crearPropuestas, crearBusquedaPropuesta, resetBusquedaPropuesta, resetSeleccionarPropuesta, seleccionarPropuesta } = propuestaSlice.actions;

export default propuestaSlice.reducer;