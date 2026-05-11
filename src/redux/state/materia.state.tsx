import { createSlice } from "@reduxjs/toolkit";
import { addFiltroGenerico, agregarElementoItems, cambiarOrdenGenerico, createElmentoItems, resetElementosItems, resetFiltroGenerico, resetSelectElemento, selectElemento, setOrdenGenerico, substractElementoItems, substractFiltroGenerico, verificarElemento } from "../utils/funcionesGenericas";
import { filterContext, FiltersState } from "../modelo/reduxContext.interface";
import { MateriaProp } from "../../modelo/Entidades/libro/materia.interface";
import { filtrosInicialesMateria } from "../../filtro/materia.filtro";

const filterDefault: FiltersState<MateriaProp> = {
  filtros: filtrosInicialesMateria,
  sortBy: 'ultAct',
  sortOrder: 'asc'
}

const initialState: filterContext<MateriaProp> = {
  items: [],
  selected: null,
  filter: filterDefault
};

export const materiaSlice = createSlice({
  name: 'materia',
  initialState: initialState,
  reducers: {
    createMaterias: createElmentoItems<MateriaProp>,
    addMaterias: agregarElementoItems<MateriaProp>,
    substractMaterias: substractElementoItems<MateriaProp>,
    resetMaterias: resetElementosItems<MateriaProp>,
    selectMateria: selectElemento<MateriaProp>,
    resetSelectMateria: resetSelectElemento<MateriaProp>,
    verificarMateria: verificarElemento<MateriaProp>,
    addFiltroMateria: addFiltroGenerico<MateriaProp>,
    substractFiltroMateria: substractFiltroGenerico<MateriaProp>,
    resetFiltrosMateria: resetFiltroGenerico<MateriaProp>,
    setOrdenamientoMaterias: setOrdenGenerico<MateriaProp>,
    cambiarOrdenMateria: cambiarOrdenGenerico<MateriaProp>
  }
});

export const { 
  createMaterias, addMaterias, substractMaterias, resetMaterias,
  selectMateria, resetSelectMateria, verificarMateria, 
  addFiltroMateria, substractFiltroMateria, resetFiltrosMateria, setOrdenamientoMaterias,
  cambiarOrdenMateria,
} = materiaSlice.actions;

export default materiaSlice.reducer;