import { WritableDraft } from "@reduxjs/toolkit";
import { ActionProp, ReduxProp } from "../modelo/reduxContext.interface";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { CambiarEstadoLibroPedidoProp } from "../../modelo/Entidades/pedido_libro/cambioEstado.interface";

export const modificarResumenFuncion = (
  state: WritableDraft<ReduxProp<ClienteProp>>,
  action: ActionProp<CambiarEstadoLibroPedidoProp>
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

const modificarResumenSelected = (prop: CambiarEstadoLibroPedidoProp, c: ClienteProp | undefined): ClienteProp | undefined => {
  if (!prop?.resumenCliente || !c || c.id != prop.resumenCliente.id) return c;
  return {
    ...c,
    resumen: prop.resumenCliente
  }
}

const actualizarResumenLista = (prop: CambiarEstadoLibroPedidoProp, clientes: ClienteProp[]): ClienteProp[] => {
  if (!prop?.resumenCliente || !clientes || clientes.length === 0) return clientes;
  return clientes.map(c => {
    if (c.id != prop.resumenCliente.id) return c;
    return {
      ...c,
      resumen: prop.resumenCliente
    }
  });
}