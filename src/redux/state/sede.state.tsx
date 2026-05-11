import { createSlice } from "@reduxjs/toolkit";
import { addFiltroGenerico, agregarElementoItems, cambiarOrdenGenerico, createElmentoItems, resetElementosItems, resetFiltroGenerico, resetSelectElemento, selectElemento, setOrdenGenerico, substractElementoItems, substractFiltroGenerico, verificarElemento } from "../utils/funcionesGenericas";
import { filterContext, FiltersState } from "../modelo/reduxContext.interface";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { filtrosInicialesSede } from "../../filtro/sede.filtro";

const filterDefault: FiltersState<SedeProp> = {
  filtros: filtrosInicialesSede,
  sortBy: 'ultAct',
  sortOrder: 'asc'
}

const initialState: filterContext<SedeProp> = {
  items: [],
  selected: null,
  filter: filterDefault
};

export const sedeSlice = createSlice({
  name: 'sede',
  initialState: initialState,
  reducers: {
    createSedes: createElmentoItems<SedeProp>,
    addSedes: agregarElementoItems<SedeProp>,
    substractSedes: substractElementoItems<SedeProp>,
    resetSedes: resetElementosItems<SedeProp>,
    selectSede: selectElemento<SedeProp>,
    resetSelectSede: resetSelectElemento<SedeProp>,
    verificarSede: verificarElemento<SedeProp>,
    addFiltroSede: addFiltroGenerico<SedeProp>,
    substractFiltroSede: substractFiltroGenerico<SedeProp>,
    resetFiltrosSede: resetFiltroGenerico<SedeProp>,
    setOrdenamientoSedes: setOrdenGenerico<SedeProp>,
    cambiarOrdenSede: cambiarOrdenGenerico<SedeProp>
  }
});

export const { 
  createSedes, addSedes, substractSedes, resetSedes,
  selectSede, resetSelectSede, verificarSede, 
  addFiltroSede, substractFiltroSede, resetFiltrosSede, setOrdenamientoSedes,
  cambiarOrdenSede,
} = sedeSlice.actions;

export default sedeSlice.reducer;