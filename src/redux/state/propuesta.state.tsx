import { createSlice } from "@reduxjs/toolkit";
import { addFiltroGenerico, agregarElementoItems, cambiarOrdenGenerico, createElmentoItems, resetElementosItems, resetFiltroGenerico, resetSelectElemento, selectElemento, setOrdenGenerico, substractElementoItems, substractFiltroGenerico, verificarElemento } from "../utils/funcionesGenericas";
import { filterContext, FiltersState } from "../modelo/reduxContext.interface";
import { PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";
import { filtrosInicialesPropuesta } from "../../filtro/propuesta.filtro";

const filterDefault: FiltersState<PropuestaProp> = {
  filtros: filtrosInicialesPropuesta,
  sortBy: 'ultAct',
  sortOrder: 'asc'
}

const initialState: filterContext<PropuestaProp> = {
  items: [],
  selected: null,
  filter: filterDefault
};

export const propuestaSlice = createSlice({
  name: 'propuesta',
  initialState: initialState,
  reducers: {
    createPropuestas: createElmentoItems<PropuestaProp>,
    addPropuestas: agregarElementoItems<PropuestaProp>,
    substractPropuestas: substractElementoItems<PropuestaProp>,
    resetPropuestas: resetElementosItems<PropuestaProp>,
    selectPropuesta: selectElemento<PropuestaProp>,
    resetSelectPropuesta: resetSelectElemento<PropuestaProp>,
    verificarPropuesta: verificarElemento<PropuestaProp>,
    addFiltroPropuesta: addFiltroGenerico<PropuestaProp>,
    substractFiltroPropuesta: substractFiltroGenerico<PropuestaProp>,
    resetFiltrosPropuesta: resetFiltroGenerico<PropuestaProp>,
    setOrdenamientoPropuestas: setOrdenGenerico<PropuestaProp>,
    cambiarOrdenPropuesta: cambiarOrdenGenerico<PropuestaProp>
  }
});

export const { 
  createPropuestas, addPropuestas, substractPropuestas, resetPropuestas,
  selectPropuesta, resetSelectPropuesta, verificarPropuesta, 
  addFiltroPropuesta, substractFiltroPropuesta, resetFiltrosPropuesta, setOrdenamientoPropuestas,
  cambiarOrdenPropuesta,
} = propuestaSlice.actions;

export default propuestaSlice.reducer;