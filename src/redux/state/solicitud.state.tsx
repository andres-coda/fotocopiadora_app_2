import { createSlice } from '@reduxjs/toolkit';
import { SolicitudProp } from '../../modelo/Entidades/solicitud/solicitud.interface';
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
  eliminarElemento,
} from '../utils/funcionesGenericasEmpresa';
import { estadoInicialRedux } from '../utils/reduxInicial';

const cantidadBusquedas: number = 1;

const estadoSolicitudInicial: ReduxProp<SolicitudProp> = estadoInicialRedux<SolicitudProp>('nombreLibro', 20);

export const solicitudSlice = createSlice({
  name: 'solicitud',
  initialState: estadoSolicitudInicial,
  reducers: {
    crearSolicitudes: crearDatoInicial<SolicitudProp>,
    crearBusquedaSolicitud: crearBusqueda<SolicitudProp>(cantidadBusquedas),
    resetBusquedaSolicitud: resetBusqueda<SolicitudProp>(cantidadBusquedas),
    seleccionarSolicitud: seleccionarDato<SolicitudProp>,
    resetSeleccionarSolicitud: resetSeleccionDato,
    agregarSolicitudesBusquedaActual: agregarDatosBusquedaActual<SolicitudProp>,
    cambiarOrdenSolicitud: cambiarOrden<SolicitudProp>,
    eliminarSolicitudRedux: eliminarElemento<SolicitudProp>,
    resetReduxSolicitud: resetRedux<SolicitudProp>,
  },
});

export const {
  crearSolicitudes,
  crearBusquedaSolicitud,
  resetBusquedaSolicitud,
  seleccionarSolicitud,
  resetSeleccionarSolicitud,
  agregarSolicitudesBusquedaActual,
  cambiarOrdenSolicitud,
  resetReduxSolicitud,
  eliminarSolicitudRedux,
} = solicitudSlice.actions;

export default solicitudSlice.reducer;

export type SolicitudStateProp = ReduxProp<SolicitudProp>;