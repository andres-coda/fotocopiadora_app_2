import { createSlice } from "@reduxjs/toolkit";
import { addFiltroGenerico, agregarElementoItems, cambiarOrdenGenerico, createElmentoItems, resetElementosItems, resetFiltroGenerico, resetSelectElemento, selectElemento, setOrdenGenerico, substractElementoItems, substractFiltroGenerico, verificarElemento } from "../utils/funcionesGenericas";
import { filterContext, FiltersState } from "../modelo/reduxContext.interface";
import { ComponenteProp } from "../../modelo/Entidades/libro/componente.interface";
import { filtrosInicialesComponente } from "../../filtro/componente.filtro";

const filterDefault: FiltersState<ComponenteProp> = {
  filtros: filtrosInicialesComponente,
  sortBy: 'nombre',
  sortOrder: 'asc'
}

const initialState: filterContext<ComponenteProp> = {
  items: [],
  selected: null,
  filter: filterDefault
};

export const componenteSlice = createSlice({
  name: 'componente',
  initialState: initialState,
  reducers: {
    createComponentes: createElmentoItems<ComponenteProp>,
    addComponentes: agregarElementoItems<ComponenteProp>,
    substractComponentes: substractElementoItems<ComponenteProp>,
    resetComponentes: resetElementosItems<ComponenteProp>,
    selectComponente: selectElemento<ComponenteProp>,
    resetSelectComponente: resetSelectElemento<ComponenteProp>,
    verificarComponente: verificarElemento<ComponenteProp>,
    addFiltroComponente: addFiltroGenerico<ComponenteProp>,
    substractFiltroComponente: substractFiltroGenerico<ComponenteProp>,
    resetFiltrosComponente: resetFiltroGenerico<ComponenteProp>,
    setOrdenamientoComponentes: setOrdenGenerico<ComponenteProp>,
    cambiarOrdenComponente: cambiarOrdenGenerico<ComponenteProp>
  }
});

export const { 
  createComponentes, addComponentes, substractComponentes, resetComponentes,
  selectComponente, resetSelectComponente, verificarComponente, 
  addFiltroComponente, substractFiltroComponente, resetFiltrosComponente, setOrdenamientoComponentes,
  cambiarOrdenComponente,
} = componenteSlice.actions;

export default componenteSlice.reducer;