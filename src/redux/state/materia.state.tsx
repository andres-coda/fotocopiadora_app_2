import { createSlice } from '@reduxjs/toolkit';
import { MateriaProp } from '../../modelo/Entidades/libro/materia.interface';
import { ReduxProp } from '../modelo/reduxContext.interface';
import {
  crearDatoInicial,
  crearBusqueda,
  resetBusqueda,
  seleccionarDato,
  resetSeleccionDato,
  agregarDatosBusquedaActual,
  cambiarOrden,
  resetRedux,
} from '../utils/funcionesGenericasEmpresa';
import { estadoInicialRedux } from '../utils/reduxInicial';

const cantidadBusquedas: number = 1;

const estadoMateriaInicial: ReduxProp<MateriaProp> = estadoInicialRedux<MateriaProp>('nombre');

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
    cambiarOrdenMateria: cambiarOrden<MateriaProp>,
    resetReduxMateria: resetRedux<MateriaProp>,
  },
});

export const {
  crearMaterias,
  crearBusquedaMateria,
  resetBusquedaMateria,
  resetSeleccionarMateria,
  seleccionarMateria,
  agregarMateriasBusquedaActual,
  cambiarOrdenMateria,
  resetReduxMateria,
} = materiaSlice.actions;

export default materiaSlice.reducer;
