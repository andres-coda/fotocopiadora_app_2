import { WritableDraft } from '@reduxjs/toolkit';
import { ActionProp, ReduxProp } from '../modelo/reduxContext.interface';
import { ClienteProp } from '../../modelo/Entidades/cliente/cliente.interface';
import { ResumenProp } from '../../modelo/Entidades/cliente/resumen.interface';
import { crearAgregarSocket } from './funcionesGenericasEmpresa';

/** La busqueda del back resuelve por nombre o por telefono (fc_busqueda_cliente). */
export const coincideCliente = (cliente: ClienteProp, query?: string): boolean => {
  if (!query) return true;

  const texto = query.toLowerCase();
  return (
    (cliente.nombre ?? '').toLowerCase().includes(texto) ||
    (cliente.telefono ?? '').toLowerCase().includes(texto)
  );
};

/** Inserta un cliente recibido por socket respetando busqueda, limite y orden. */
export const agregarClienteSocket = crearAgregarSocket<ClienteProp>(coincideCliente);

export const modificarResumenClienteRedux = (
  state: WritableDraft<ReduxProp<ClienteProp>>,
  action: ActionProp<ResumenProp>
) => {
  const newBusquedaActual = {
    ...state.busquedaActual,
    datosQuery: actualizarResumenLista(action.payload, state.busquedaActual.datosQuery),
  };
  const newDatosIniciales = {
    ...state.datosIniciales,
    datosQuery: actualizarResumenLista(action.payload, state.datosIniciales.datosQuery),
  };
  return {
    ...state,
    busquedaActual: newBusquedaActual,
    datosIniciales: newDatosIniciales,
    datoSeleccionado: modificarResumenSelected(action.payload, state.datoSeleccionado),
  };
};

const modificarResumenSelected = (
  prop: ResumenProp,
  c: ClienteProp | undefined
): ClienteProp | undefined => {
  if (!prop || !c || c.id != prop.id) return c;
  return {
    ...c,
    resumen: prop,
  };
};

const actualizarResumenLista = (prop: ResumenProp, clientes: ClienteProp[]): ClienteProp[] => {
  if (!prop || !clientes || clientes.length === 0) return clientes;
  return clientes.map(c => {
    if (c.id != prop.id) return c;
    return {
      ...c,
      resumen: prop,
    };
  });
};
