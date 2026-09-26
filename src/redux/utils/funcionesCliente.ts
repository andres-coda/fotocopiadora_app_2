import { WritableDraft } from "@reduxjs/toolkit";
import { ActionProp, ReduxProp } from "../modelo/reduxContext.interface";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { CambiarEstadoLibroPedidoProp } from "../../modelo/Entidades/pedido_libro/cambioEstado.interface";
import { ResumenProp } from "../../modelo/Entidades/cliente/resumen.interface";

export const modificarResumenFuncion = (
  state: WritableDraft<ReduxProp<ClienteProp>>,
  action: ActionProp<ResumenProp>
) => {
  const newBusquedaActual = {
    ...state.busquedaActual,
    datosQuery: actualizarResumenLista(action.payload, state.busquedaActual.datosQuery)
  };
  const newDatosIniciales = {
    ...state.datosIniciales,
    datosQuery: actualizarResumenLista(action.payload, state.datosIniciales.datosQuery)
  };
  return {
    ...state,
    busquedaActual: newBusquedaActual,
    datosIniciales: newDatosIniciales,
    datoSeleccionado: modificarResumenSelected(action.payload, state.datoSeleccionado)
  };
};

const modificarResumenSelected = (prop: ResumenProp, c: ClienteProp | undefined): ClienteProp | undefined => {
  if (!prop || !c || c.id != prop.id) return c;
  return {
    ...c,
    resumen: prop
  }
}

const actualizarResumenLista = (prop: ResumenProp, clientes: ClienteProp[]): ClienteProp[] => {
  if (!prop || !clientes || clientes.length === 0) return clientes;
  return clientes.map(c => {
    if (c.id != prop.id) return c;
    return {
      ...c,
      resumen: prop
    }
  });
}