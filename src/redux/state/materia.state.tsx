import { createSlice } from "@reduxjs/toolkit";
import { MateriaProp } from "../../modelo/Entidades/libro/materia.interface";
import { ReduxProp, UltimaBusquedaProp, orden } from "../modelo/reduxContext.interface";
import {crearDatoInicial, crearBusqueda, resetBusqueda, seleccionarDato, resetSeleccionDato, agregarDatosBusquedaActual, cambiarOrden} from "../utils/funcionesGenericasEmpresa";

const cantidadBusquedas: number = 1;

export const busquedaMateriaInicial: UltimaBusquedaProp<MateriaProp> = {
  query: undefined,
  datosQuery: [],
  sortBy: 'ultAct' as keyof MateriaProp,
  sortOrder: 'asc' as orden,
  pagina: 1,
  limite: 20,
  total: 0
}

const estadoMateriaInicial: ReduxProp<MateriaProp> = {
  datosIniciales: busquedaMateriaInicial,
  busquedaActual: busquedaMateriaInicial,
  ultimasBusqueda: [],
  datoSeleccionado: undefined
}

export const materiaSlice = createSlice({
  name: 'materia',
  initialState: estadoMateriaInicial,
  reducers: {
    crearMaterias: crearDatoInicial,
    crearBusquedaMateria: crearBusqueda<MateriaProp>(cantidadBusquedas),
    resetBusquedaMateria: resetBusqueda<MateriaProp>(cantidadBusquedas),
    seleccionarMateria: seleccionarDato,
    resetSeleccionarMateria: resetSeleccionDato,
    agregarMateriasBusquedaActual: agregarDatosBusquedaActual<MateriaProp>,
    cambiarOrdenMateria: cambiarOrden<MateriaProp>
  }
});

export const { 
  crearMaterias, 
  crearBusquedaMateria, 
  resetBusquedaMateria, 
  resetSeleccionarMateria, 
  seleccionarMateria, 
  agregarMateriasBusquedaActual,
  cambiarOrdenMateria
} = materiaSlice.actions;

export default materiaSlice.reducer;