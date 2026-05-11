import { createSlice } from "@reduxjs/toolkit";
import { addFiltroGenerico, agregarElementoItems, cambiarOrdenGenerico, createElmentoItems, resetElementosItems, resetFiltroGenerico, resetSelectElemento, selectElemento, setOrdenGenerico, substractElementoItems, substractFiltroGenerico, verificarElemento } from "../utils/funcionesGenericas";
import { filterContext, FiltersState } from "../modelo/reduxContext.interface";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { filtrosInicialesLibro } from "../../filtro/libro.filtro";

const filterDefault: FiltersState<LibroProp> = {
  filtros: filtrosInicialesLibro,
  sortBy: 'nombre',
  sortOrder: 'asc'
}

const initialState: filterContext<LibroProp> = {
  items: [],
  selected: null,
  filter: filterDefault
};

export const libroSlice = createSlice({
  name: 'libro',
  initialState: initialState,
  reducers: {
    createLibros: createElmentoItems<LibroProp>,
    addLibros: agregarElementoItems<LibroProp>,
    substractLibros: substractElementoItems<LibroProp>,
    resetLibros: resetElementosItems<LibroProp>,
    selectLibro: selectElemento<LibroProp>,
    resetSelectLibro: resetSelectElemento<LibroProp>,
    verificarLibro: verificarElemento<LibroProp>,
    addFiltroLibro: addFiltroGenerico<LibroProp>,
    substractFiltroLibro: substractFiltroGenerico<LibroProp>,
    resetFiltrosLibro: resetFiltroGenerico<LibroProp>,
    setOrdenamientoLibros: setOrdenGenerico<LibroProp>,
    cambiarOrdenLibro: cambiarOrdenGenerico<LibroProp>
  }
});

export const { 
  createLibros, addLibros, substractLibros, resetLibros,
  selectLibro, resetSelectLibro, verificarLibro, 
  addFiltroLibro, substractFiltroLibro, resetFiltrosLibro, setOrdenamientoLibros,
  cambiarOrdenLibro,
} = libroSlice.actions;

export default libroSlice.reducer;