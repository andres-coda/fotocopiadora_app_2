import { createSlice } from '@reduxjs/toolkit';
import { EspecificacionProp } from '../../modelo/Entidades/especificacion/especificacion.interface';
import { ReduxProp } from '../modelo/reduxContext.interface';
import {
  crearDatoInicial,
  crearBusqueda,
  resetBusqueda,
  seleccionarDato,
  resetSeleccionDato,
  agregarDatosBusquedaActual,
  cambiarOrden,
  resetRedux,
} from '../utils/funcionesGenericasEmpresa';
import { estadoInicialRedux } from '../utils/reduxInicial';

const cantidadBusquedas: number = 1;

const estadoEspecificacionInicial: ReduxProp<EspecificacionProp> = estadoInicialRedux<EspecificacionProp>('nombre', 20);

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
    cambiarOrdenEspecificacion: cambiarOrden<EspecificacionProp>,
    resetReduxEspecificaciones: resetRedux<EspecificacionProp>,
  },
});

export const {
  crearEspecificaciones,
  crearBusquedaEspecificacion,
  resetBusquedaEspecificacion,
  resetSeleccionarEspecificacion,
  seleccionarEspecificacion,
  agregarEspecificacionesBusquedaActual,
  cambiarOrdenEspecificacion,
  resetReduxEspecificaciones,
} = especificacionSlice.actions;

export default especificacionSlice.reducer;
