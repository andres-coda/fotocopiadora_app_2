import { createSlice } from '@reduxjs/toolkit';
import { ReduxProp } from '../modelo/reduxContext.interface';
import { SedeProp } from '../../modelo/Entidades/sede/sede.interface';
import {
  crearDatoInicial,
  crearBusqueda,
  resetBusqueda,
  seleccionarDato,
  resetSeleccionDato,
  agregarDatosBusquedaActual,
  cambiarOrden,
  eliminarElemento,
  modificarElementoRedux,
  agregarElementoInicio,
  resetRedux,
} from '../utils/funcionesGenericasEmpresa';
import { estadoInicialRedux } from '../utils/reduxInicial';

const cantidadBusquedas: number = 1;

const estadoSedeInicial: ReduxProp<SedeProp> = estadoInicialRedux<SedeProp>('ultAct', 20);

export const sedeSlice = createSlice({
  name: 'sede',
  initialState: estadoSedeInicial,
  reducers: {
    crearSedes: crearDatoInicial,
    crearBusquedaSede: crearBusqueda<SedeProp>(cantidadBusquedas),
    resetBusquedaSede: resetBusqueda<SedeProp>(cantidadBusquedas),
    seleccionarSede: seleccionarDato,
    resetSeleccionarSede: resetSeleccionDato,
    agregarSedesBusquedaActual: agregarDatosBusquedaActual<SedeProp>,
    cambiarOrdenSede: cambiarOrden<SedeProp>,
    eliminarSedeRedux: eliminarElemento<SedeProp>,
    actualizarSedeRedux: modificarElementoRedux<SedeProp>,
    agregarSedeInicioRedux: agregarElementoInicio<SedeProp>,
    resetReduxSede: resetRedux<SedeProp>,
  },
});

export const {
  crearSedes,
  crearBusquedaSede,
  resetBusquedaSede,
  resetSeleccionarSede,
  seleccionarSede,
  agregarSedesBusquedaActual,
  cambiarOrdenSede,
  eliminarSedeRedux,
  actualizarSedeRedux,
  agregarSedeInicioRedux,
  resetReduxSede,
} = sedeSlice.actions;

export default sedeSlice.reducer;
