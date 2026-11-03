import { createSlice } from '@reduxjs/toolkit';
import { PropuestaProp } from '../../modelo/Entidades/propuesta/propuesta.interface';
import { ReduxProp } from '../modelo/reduxContext.interface';
import {
  agregarDatosBusquedaActual,
  crearBusqueda,
  crearDatoInicial,
  resetBusqueda,
  resetSeleccionDato,
  seleccionarDato,
  cambiarOrden,
  resetRedux,
  eliminarElemento,
} from '../utils/funcionesGenericasEmpresa';
import { estadoInicialRedux } from '../utils/reduxInicial';

const cantidadBusquedas: number = 15;

const estadoPropuestaInicial: ReduxProp<PropuestaProp> = estadoInicialRedux<PropuestaProp>('ultAct')

export const propuestaSlice = createSlice({
  name: 'propuesta_empresa',
  initialState: estadoPropuestaInicial,
  reducers: {
    crearPropuestas: crearDatoInicial<PropuestaProp>,
    crearBusquedaPropuesta: crearBusqueda<PropuestaProp>(cantidadBusquedas),
    resetBusquedaPropuesta: resetBusqueda<PropuestaProp>(cantidadBusquedas),
    seleccionarPropuesta: seleccionarDato<PropuestaProp>,
    resetSeleccionarPropuesta: resetSeleccionDato<PropuestaProp>,
    agregarPropuestasBusquedaActual: agregarDatosBusquedaActual<PropuestaProp>,
    cambiarOrdenPropuesta: cambiarOrden<PropuestaProp>,
    resetReduxPropuesta: resetRedux<PropuestaProp>,
    eliminarPropuestaRedux: eliminarElemento<PropuestaProp>,
  },
});

export const {
  crearPropuestas,
  crearBusquedaPropuesta,
  resetBusquedaPropuesta,
  resetSeleccionarPropuesta,
  seleccionarPropuesta,
  agregarPropuestasBusquedaActual,
  cambiarOrdenPropuesta,
  resetReduxPropuesta,
  eliminarPropuestaRedux,
} = propuestaSlice.actions;

export default propuestaSlice.reducer;
