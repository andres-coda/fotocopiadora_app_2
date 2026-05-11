import { createSlice } from "@reduxjs/toolkit";
import { addFiltroGenerico, agregarElementoItems, cambiarOrdenGenerico, createElmentoItems, resetElementosItems, resetFiltroGenerico, resetSelectElemento, selectElemento, setOrdenGenerico, substractElementoItems, substractFiltroGenerico, verificarElemento } from "../utils/funcionesGenericas";
import { filterContext, FiltersState } from "../modelo/reduxContext.interface";
import { EspecificacionProp } from "../../modelo/Entidades/especificacion/especificacion.interface";
import { filtrosInicialesEspecificacion } from "../../filtro/especificacion.filtro";

const filterDefault: FiltersState<EspecificacionProp> = {
  filtros: filtrosInicialesEspecificacion,
  sortBy: 'ultAct',
  sortOrder: 'asc'
}

const initialState: filterContext<EspecificacionProp> = {
  items: [],
  selected: null,
  filter: filterDefault
};

export const especificacionSlice = createSlice({
  name: 'especificacion',
  initialState: initialState,
  reducers: {
    createEspecificaciones: createElmentoItems<EspecificacionProp>,
    addEspecificaciones: agregarElementoItems<EspecificacionProp>,
    substractEspecificaciones: substractElementoItems<EspecificacionProp>,
    resetEspecificaciones: resetElementosItems<EspecificacionProp>,
    selectEspecificacion: selectElemento<EspecificacionProp>,
    resetSelectEspecificacion: resetSelectElemento<EspecificacionProp>,
    verificarEspecificacion: verificarElemento<EspecificacionProp>,
    addFiltroEspecificacion: addFiltroGenerico<EspecificacionProp>,
    substractFiltroEspecificacion: substractFiltroGenerico<EspecificacionProp>,
    resetFiltrosEspecificacion: resetFiltroGenerico<EspecificacionProp>,
    setOrdenamientoEspecificaciones: setOrdenGenerico<EspecificacionProp>,
    cambiarOrdenEspecificacion: cambiarOrdenGenerico<EspecificacionProp>
  }
});

export const { 
  createEspecificaciones, addEspecificaciones, substractEspecificaciones, resetEspecificaciones,
  selectEspecificacion, resetSelectEspecificacion, verificarEspecificacion, 
  addFiltroEspecificacion, substractFiltroEspecificacion, resetFiltrosEspecificacion, setOrdenamientoEspecificaciones,
  cambiarOrdenEspecificacion,
} = especificacionSlice.actions;

export default especificacionSlice.reducer;