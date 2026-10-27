import { PayloadAction } from '@reduxjs/toolkit';
import { ReduxProp, UltimaBusquedaProp, orden } from '../modelo/reduxContext.interface';
import { HasId } from '../../modelo/general/hasId.interface';

export const evaluarUltimasBusquedas = <T>(
  state: ReduxProp<T>,
  nueva: UltimaBusquedaProp<T>,
  cantidadBusquedas: number
): void => {
  const indice = state.ultimasBusqueda.findIndex(b => b.query === nueva.query);

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

export const crearBusqueda =
  <T>(cantidadBusqueda: number) =>
  (state: ReduxProp<T>, action: PayloadAction<UltimaBusquedaProp<T>>) => {
    evaluarUltimasBusquedas(state, action.payload, cantidadBusqueda);

    state.busquedaActual = action.payload;
  };

export const resetBusqueda =
  <T>(cantidadBusqueda: number) =>
  (state: ReduxProp<T>) => {
    if (!state.busquedaActual) return;

    evaluarUltimasBusquedas(state, state.busquedaActual, cantidadBusqueda);

    state.busquedaActual = state.datosIniciales;
  };

export const seleccionarDato = <T>(state: ReduxProp<T>, action: PayloadAction<T>) => {
  state.datoSeleccionado = action.payload;
};

export const resetSeleccionDato = <T>(state: ReduxProp<T>) => {
  state.datoSeleccionado = undefined;
};

export const agregarDatosBusquedaActual = <T>(
  state: ReduxProp<T>,
  action: PayloadAction<UltimaBusquedaProp<T>>
) => {
  state.busquedaActual = {
    ...state.busquedaActual,
    limite: action.payload.limite,
    total: action.payload.total,
    pagina: action.payload.pagina,
    datosQuery: [...state.busquedaActual.datosQuery, ...action.payload.datosQuery],
  };
};

export const agregarElementoInicio = <T extends HasId>(
  state: ReduxProp<T>,
  action: PayloadAction<T>
) => {
  state.busquedaActual = {
    ...state.busquedaActual,
    datosQuery: [action.payload, ...state.busquedaActual.datosQuery],
  };
};

export const cambiarOrden = <T>(
  state: ReduxProp<T>,
  action: PayloadAction<{ sortBy: keyof T; sortOrder: orden }>
) => {
  state.busquedaActual = {
    ...state.busquedaActual,
    sortBy: action.payload.sortBy,
    sortOrder: action.payload.sortOrder,
  };
};

export const eliminarElemento = <T extends HasId>(
  state: ReduxProp<T>,
  action: PayloadAction<string>
) => {
  state.busquedaActual = eliminarElementoLista(state.busquedaActual, action.payload);
  if (state.datoSeleccionado?.id === action.payload) state.datoSeleccionado = undefined;
  state.datosIniciales = eliminarElementoLista(state.datosIniciales, action.payload);
  state.ultimasBusqueda = state.ultimasBusqueda.map(b => eliminarElementoLista(b, action.payload));
};

const eliminarElementoLista = <T extends HasId>(
  elementos: UltimaBusquedaProp<T>,
  id: string
): UltimaBusquedaProp<T> => {
  return {
    ...elementos,
    datosQuery: elementos.datosQuery.filter(e => e.id != id),
  };
};

export const modificarElementoRedux = <T extends HasId>(
  state: ReduxProp<T>,
  action: PayloadAction<T>
) => {
  state.busquedaActual = modificarElementoLista(state.busquedaActual, action.payload);
  state.datosIniciales = modificarElementoLista(state.datosIniciales, action.payload);
  state.ultimasBusqueda = state.ultimasBusqueda.map(b => modificarElementoLista(b, action.payload));

  const actual = state.datoSeleccionado;
  if (actual && actual.id === action.payload.id)
    state.datoSeleccionado = { ...actual, ...action.payload };
};

const modificarElementoLista = <T extends HasId>(
  elementos: UltimaBusquedaProp<T>,
  elemento: T
): UltimaBusquedaProp<T> => {
  return {
    ...elementos,
    datosQuery: elementos.datosQuery.map(e => (e.id != elemento.id ? e : { ...e, ...elemento })),
  };
};

export const resetRedux = <T extends HasId>(
  state: ReduxProp<T>,
) => {
  resetSeleccionDato<T>(state);
  state.datosIniciales = {...state.datosIniciales, query: undefined, datosQuery: [], pagina:1};
  state.busquedaActual = state.datosIniciales;
  state.ultimasBusqueda = [];
}