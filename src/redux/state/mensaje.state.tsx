import { createSlice } from '@reduxjs/toolkit';
import { ReduxProp, UltimaBusquedaProp, orden } from '../modelo/reduxContext.interface';
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

const cantidadBusquedas: number = 1;

export const busquedaMensajeInicial: UltimaBusquedaProp<MensajeProp> = {
  query: undefined,
  datosQuery: [],
  sortBy: 'nombre' as keyof MensajeProp,
  sortOrder: 'asc' as orden,
  pagina: 1,
  limite: 20,
  total: 0,
};

const estadoMensajeInicial: ReduxProp<MensajeProp> = {
  datosIniciales: busquedaMensajeInicial,
  busquedaActual: busquedaMensajeInicial,
  ultimasBusqueda: [],
  datoSeleccionado: undefined,
};

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
  resetReduxMensaje,
} = mensajeSlice.actions;

export default mensajeSlice.reducer;
