import { current, Draft, PayloadAction, WritableDraft } from "@reduxjs/toolkit";
import { editContext, filterContext, filtroLlamada, orden } from "../modelo/reduxContext.interface";
import { arregloOrdenado } from "./ordenarArreglo";
import { eliminarElementoArreglo } from "./eliminarElementoArreglo";
import { HasId } from "../../modelo/general/hasId.interface";

export interface actionProp<T> {
  payload: T;
  type: string;
}


export const createElmentoItems = <T>(state: WritableDraft<filterContext<T>>, action: actionProp<T[]>) => ({ ...state, items: action.payload });

export const agregarElementoItems = <T extends HasId>(
  state: WritableDraft<filterContext<T>>,
  action: actionProp<T>
) => ({
  ...state,
  items: arregloOrdenado<T>({
    dato: action.payload,
    datoContexto: [...state.items] as T[],
    sortKey: state.filter?.sortBy as keyof T | undefined,
    desendente: state.filter?.sortOrder === 'desc'
  })
})

export const substractElementoItems = <T extends HasId>(
  state: WritableDraft<filterContext<T>>,
  action: actionProp<string>
) => ({
  ...state,
  items: eliminarElementoArreglo<Draft<T>>({
    id: action.payload,
    datoContexto: state.items
  })
});

export const resetElementosItems = <T extends HasId>(
  state: WritableDraft<filterContext<T>>,
) => ({
  ...state,
  items: []
});

export const selectElemento = <T extends HasId>(
  state: WritableDraft<filterContext<T>>,
  action: actionProp<T>
) => ({
  ...state,
  selected: {...action.payload}
})

export const resetSelectElemento = <T extends HasId>(
  state: WritableDraft<filterContext<T>>,
) => ({
  ...state,
  selected: null
});

export const verificarElemento = <T extends HasId>(
  state: WritableDraft<filterContext<T>>,
  action: actionProp<string>
) => {
  substractElementoItems<T>
  if (state.selected?.id === action.payload) {
    state.selected = null;
  }
};

export const addFiltroGenerico = <T extends HasId>(
  state: WritableDraft<filterContext<T>>,
  action: actionProp<filtroLlamada>
) => {
  if (state.filter.filtros.some(f => f.id === action.payload.id)) return state;
  const newFiltros = [...state.filter.filtros, action.payload]
  return { ...state, filter: { ...state.filter, filtros: newFiltros } }
}

export const substractFiltroGenerico = <T extends HasId>(
  state: WritableDraft<filterContext<T>>,
  action: actionProp<string>
) => {
  const newFiltros = state.filter.filtros.filter(f => f.id != action.payload)
  return { ...state, filter: { ...state.filter, filtros: newFiltros } }
}

export const resetFiltroGenerico = <T extends HasId>(
  state: WritableDraft<filterContext<T>>,
) => ({ ...state, filter: { ...state.filter, filtros: [] } })

export const activarFiltro = <T extends HasId>(
  state: WritableDraft<filterContext<T>>,
  action: actionProp<string>
) => {
  const indexFiltro: number = state.filter.filtros.findIndex(f => f.id === action.payload)
  if (indexFiltro === -1) return;
  const newFiltros = [...state.filter.filtros];
  newFiltros[indexFiltro].estado = true;
  return { ...state, filter: { ...state.filter, filtros: newFiltros } }
}

export const desactivarFiltros = <T extends HasId>(
  state: WritableDraft<filterContext<T>>,
  action: actionProp<string>
) => {
  const indexFiltro: number = state.filter.filtros.findIndex(f => f.id === action.payload)
  if (indexFiltro === -1) return;
  const newFiltros = [...state.filter.filtros];
  newFiltros[indexFiltro].estado = false;
  return { ...state, filter: { ...state.filter, filtros: newFiltros } }
}

export const setFiltroGenerico = <T extends HasId>(
  state: WritableDraft<filterContext<T>>,
  action: actionProp<filtroLlamada[]>
) => {
  state.filter.filtros = action.payload;
}

export const setOrdenGenerico = <T extends HasId>(
  state: WritableDraft<filterContext<T>>,
  action: PayloadAction<{
    sortBy: Draft<keyof T>;
    sortOrder?: orden
  }>
) => {
  state.filter.sortBy = action.payload.sortBy
  state.filter.sortOrder = action.payload.sortOrder || 'asc';
}

export const setOrdenEditGenerico = <T extends HasId>(
  state: WritableDraft<editContext<T>>,
  action: PayloadAction<{
    sortBy: Draft<keyof T>;
    sortOrder?: orden
  }>
) => {
  state.filter.sortBy = action.payload.sortBy
  state.filter.sortOrder = action.payload.sortOrder || 'asc';
}

const cambiarOrden = (tipo?: orden): orden => {
  if (!tipo) return 'asc';
  return tipo === 'asc' ? 'desc' : 'asc';
}

export const cambiarOrdenGenerico = <T extends HasId>(
  state: WritableDraft<filterContext<T>>,
) => {
  state.filter.sortOrder = cambiarOrden(state.filter.sortOrder);
};

export const cambiarOrdenGeneticoEdit = <T extends HasId>(
  state: WritableDraft<editContext<T>>,
) => {
  state.filter.sortOrder = cambiarOrden(state.filter.sortOrder);
};

export const editElemento = <T extends HasId>(
  state: WritableDraft<editContext<T>>,
  action: actionProp<T>
) => ({
  ...state,
  edit: action.payload
})

export const resetEditElemento = <T extends HasId>(
  state: WritableDraft<editContext<T>>,
) => ({
  ...state,
  edit: null
});