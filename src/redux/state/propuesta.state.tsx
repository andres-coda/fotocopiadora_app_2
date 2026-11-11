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
  modificarElementoRedux,
} from '../utils/funcionesGenericasEmpresa';
import { estadoInicialRedux } from '../utils/reduxInicial';
import { agregarPropuestaSocket } from '../utils/funcionesPropuesta';

const cantidadBusquedas: number = 15;

const estadoPropuestaInicial: ReduxProp<PropuestaProp> = estadoInicialRedux<PropuestaProp>('nombre', 10)

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
    agregarPropuestaSocketRedux: agregarPropuestaSocket,
    actualizarPropuestaSocketRedux: modificarElementoRedux<PropuestaProp>,
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
  agregarPropuestaSocketRedux,
  actualizarPropuestaSocketRedux,
} = propuestaSlice.actions;

export default propuestaSlice.reducer;
