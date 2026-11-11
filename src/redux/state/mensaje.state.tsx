import { createSlice } from '@reduxjs/toolkit';
import { ReduxProp } from '../modelo/reduxContext.interface';
import { MensajeProp } from '../../modelo/Entidades/mensaje/mensaje.interface';
import {
  crearDatoInicial,
  crearBusqueda,
  resetBusqueda,
  seleccionarDato,
  resetSeleccionDato,
  agregarDatosBusquedaActual,
  cambiarOrden,
  eliminarElemento,
  modificarElementoRedux,
  agregarElementoInicio,
  resetRedux,
} from '../utils/funcionesGenericasEmpresa';
import { estadoInicialRedux } from '../utils/reduxInicial';
import { actualizarMensajeSocket, agregarMensajeSocket } from '../utils/funcionesMensaje';

const cantidadBusquedas: number = 1;

const estadoMensajeInicial: ReduxProp<MensajeProp> = estadoInicialRedux<MensajeProp>('nombre', 15);

export const mensajeSlice = createSlice({
  name: 'mensaje',
  initialState: estadoMensajeInicial,
  reducers: {
    crearMensajes: crearDatoInicial<MensajeProp>,
    crearBusquedaMensaje: crearBusqueda<MensajeProp>(cantidadBusquedas),
    resetBusquedaMensaje: resetBusqueda<MensajeProp>(cantidadBusquedas),
    seleccionarMensaje: seleccionarDato<MensajeProp>,
    resetSeleccionarMensaje: resetSeleccionDato<MensajeProp>,
    agregarMensajesBusquedaActual: agregarDatosBusquedaActual<MensajeProp>,
    cambiarOrdenMensaje: cambiarOrden<MensajeProp>,
    eliminarMensajeRedux: eliminarElemento<MensajeProp>,
    actualizarMensajeRedux: modificarElementoRedux<MensajeProp>,
    agregarMensajeInicioRedux: agregarElementoInicio<MensajeProp>,
    agregarMensajeSocketRedux: agregarMensajeSocket,
    actualizarMensajeSocketRedux: actualizarMensajeSocket,
    resetReduxMensaje: resetRedux<MensajeProp>,
  },
});

export const {
  crearMensajes,
  crearBusquedaMensaje,
  resetBusquedaMensaje,
  resetSeleccionarMensaje,
  seleccionarMensaje,
  agregarMensajesBusquedaActual,
  cambiarOrdenMensaje,
  eliminarMensajeRedux,
  actualizarMensajeRedux,
  agregarMensajeInicioRedux,
  agregarMensajeSocketRedux,
  actualizarMensajeSocketRedux,
  resetReduxMensaje,
} = mensajeSlice.actions;

export default mensajeSlice.reducer;
