import { PayloadAction } from '@reduxjs/toolkit';
import { MensajeProp } from '../../modelo/Entidades/mensaje/mensaje.interface';
import { ReduxProp, UltimaBusquedaProp } from '../modelo/reduxContext.interface';
import { crearAgregarSocket } from './funcionesGenericasEmpresa';

export const coincideMensaje = (mensaje: MensajeProp, query?: string): boolean => {
  if (!query) return true;
  return (mensaje.nombre ?? '').toLowerCase().includes(query.toLowerCase());
};

/** Inserta un mensaje recibido por socket respetando busqueda, limite y orden. */
export const agregarMensajeSocket = crearAgregarSocket<MensajeProp>(coincideMensaje);

/**
 * El favorito es por usuario, no por empresa: el evento de edicion trae el
 * favorito de QUIEN edito. Se actualizan solo los datos compartidos y se
 * conserva el favorito local de cada cliente.
 */
export const actualizarMensajeSocket = (
  state: ReduxProp<MensajeProp>,
  action: PayloadAction<MensajeProp>
): void => {
  state.busquedaActual = actualizarMensajeLista(state.busquedaActual, action.payload);
  state.datosIniciales = actualizarMensajeLista(state.datosIniciales, action.payload);
  state.ultimasBusqueda = state.ultimasBusqueda.map(busqueda =>
    actualizarMensajeLista(busqueda, action.payload)
  );

  const actual = state.datoSeleccionado;
  if (actual && actual.id === action.payload.id) {
    state.datoSeleccionado = {
      ...actual,
      nombre: action.payload.nombre,
      mensaje: action.payload.mensaje,
    };
  }
};

const actualizarMensajeLista = (
  busqueda: UltimaBusquedaProp<MensajeProp>,
  mensaje: MensajeProp
): UltimaBusquedaProp<MensajeProp> => ({
  ...busqueda,
  datosQuery: busqueda.datosQuery.map(actual =>
    actual.id === mensaje.id
      ? { ...actual, nombre: mensaje.nombre, mensaje: mensaje.mensaje }
      : actual
  ),
});
