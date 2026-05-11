import { createSlice } from "@reduxjs/toolkit";
import { addFiltroGenerico, agregarElementoItems, cambiarOrdenGenerico, createElmentoItems, resetElementosItems, resetFiltroGenerico, resetSelectElemento, selectElemento, setOrdenGenerico, substractElementoItems, substractFiltroGenerico, verificarElemento } from "../utils/funcionesGenericas";
import { filterContext, FiltersState } from "../modelo/reduxContext.interface";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { filtrosInicialesPrecio } from "../../filtro/precio.filtro";

const filterDefault: FiltersState<PrecioProp> = {
  filtros: filtrosInicialesPrecio,
  sortBy: 'ultAct',
  sortOrder: 'asc'
}

const initialState: filterContext<PrecioProp> = {
  items: [],
  selected: null,
  filter: filterDefault
};

export const precioSlice = createSlice({
  name: 'precio',
  initialState: initialState,
  reducers: {
    createPrecios: createElmentoItems<PrecioProp>,
    addPrecios: agregarElementoItems<PrecioProp>,
    substractPrecios: substractElementoItems<PrecioProp>,
    resetPrecios: resetElementosItems<PrecioProp>,
    selectPrecio: selectElemento<PrecioProp>,
    resetSelectPrecio: resetSelectElemento<PrecioProp>,
    verificarPrecio: verificarElemento<PrecioProp>,
    addFiltroPrecio: addFiltroGenerico<PrecioProp>,
    substractFiltroPrecio: substractFiltroGenerico<PrecioProp>,
    resetFiltrosPrecio: resetFiltroGenerico<PrecioProp>,
    setOrdenamientoPrecios: setOrdenGenerico<PrecioProp>,
    cambiarOrdenPrecio: cambiarOrdenGenerico<PrecioProp>
  }
});

export const { 
  createPrecios, addPrecios, substractPrecios, resetPrecios,
  selectPrecio, resetSelectPrecio, verificarPrecio, 
  addFiltroPrecio, substractFiltroPrecio, resetFiltrosPrecio, setOrdenamientoPrecios,
  cambiarOrdenPrecio,
} = precioSlice.actions;

export default precioSlice.reducer;