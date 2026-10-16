import { WritableDraft } from "@reduxjs/toolkit";
import { ActionProp, ReduxProp } from "../modelo/reduxContext.interface";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";

/**
 * Reemplaza un precio por su id en la busqueda actual, los datos iniciales
 * y el dato seleccionado. Se usa tras editar un precio para reflejar el retorno.
 */
export const modificarPrecioRedux = (
  state: WritableDraft<ReduxProp<PrecioProp>>,
  action: ActionProp<PrecioProp>
) => {
  return {
    ...state,
    busquedaActual: {
      ...state.busquedaActual,
      datosQuery: actualizarPrecioLista(action.payload, state.busquedaActual.datosQuery)
    },
    datosIniciales: {
      ...state.datosIniciales,
      datosQuery: actualizarPrecioLista(action.payload, state.datosIniciales.datosQuery)
    },
    datoSeleccionado: modificarPrecioSeleccionado(action.payload, state.datoSeleccionado)
  };
};

const modificarPrecioSeleccionado = (precio: PrecioProp, actual: PrecioProp | undefined): PrecioProp | undefined => {
  if (!precio || !actual || actual.id != precio.id) return actual;
  return { ...actual, ...precio };
};

const actualizarPrecioLista = (precio: PrecioProp, precios: PrecioProp[]): PrecioProp[] => {
  if (!precio || !precios || precios.length === 0) return precios;
  return precios.map(p => (p.id != precio.id ? p : { ...p, ...precio }));
};
