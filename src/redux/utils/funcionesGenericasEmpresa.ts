import { PayloadAction } from "@reduxjs/toolkit";
import { ReduxProp, UltimaBusquedaProp } from "../modelo/reduxContext.interface";

export const evaluarUltimasBusquedas = <T>(
  state: ReduxProp<T>,
  nueva: UltimaBusquedaProp<T>,
  cantidadBusquedas: number
): void => {

  const indice = state.ultimasBusqueda.findIndex(
    b => b.query === nueva.query
  );

  if (indice !== -1) {
    const [busqueda] = state.ultimasBusqueda.splice(indice, 1);
    state.ultimasBusqueda.push(busqueda);
  } else {

    if (state.ultimasBusqueda.length === cantidadBusquedas) {
      state.ultimasBusqueda.shift();
    }

    state.ultimasBusqueda.push(nueva);
  }
};


export const crearDatoInicial = <T>(
  state: ReduxProp<T>,
  action: PayloadAction<UltimaBusquedaProp<T>>
) => {

  state.datosIniciales = action.payload;
  state.busquedaActual = action.payload;
};


export const crearBusqueda = <T>(cantidadBusqueda: number) =>(
  state: ReduxProp<T>,
  action: PayloadAction<UltimaBusquedaProp<T>>
) => {

  evaluarUltimasBusquedas(
    state,
    action.payload,
    cantidadBusqueda
  );

  state.busquedaActual = action.payload;
};


export const resetBusqueda = <T>(cantidadBusqueda:number)=>(
  state: ReduxProp<T>,
) => {

  if (!state.busquedaActual) return;

  evaluarUltimasBusquedas(
    state,
    state.busquedaActual,
    cantidadBusqueda
  );

  state.busquedaActual = state.datosIniciales;
};


export const seleccionarDato = <T>(
  state: ReduxProp<T>,
  action: PayloadAction<T>
) => {

  state.datoSeleccionado = action.payload;
};


export const resetSeleccionDato = <T>(
  state: ReduxProp<T>
) => {

  state.datoSeleccionado = undefined;
};