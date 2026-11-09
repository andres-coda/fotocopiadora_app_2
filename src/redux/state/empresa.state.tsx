import { createSlice } from '@reduxjs/toolkit';
import { EmpresaProp } from '../../modelo/Entidades/empresa/empresa.interface';
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
  eliminarElemento,
} from '../utils/funcionesGenericasEmpresa';
import { estadoInicialRedux } from '../utils/reduxInicial';

const cantidadBusquedas: number = 1;

const estadoEmpresaInicial: ReduxProp<EmpresaProp> = estadoInicialRedux<EmpresaProp>('nombre', 20);

export const empresaSlice = createSlice({
  name: 'empresa',
  initialState: estadoEmpresaInicial,
  reducers: {
    crearEmpresas: crearDatoInicial<EmpresaProp>,
    crearBusquedaEmpresa: crearBusqueda<EmpresaProp>(cantidadBusquedas),
    resetBusquedaEmpresa: resetBusqueda<EmpresaProp>(cantidadBusquedas),
    seleccionarEmpresa: seleccionarDato<EmpresaProp>,
    resetSeleccionarEmpresa: resetSeleccionDato,
    agregarEmpresasBusquedaActual: agregarDatosBusquedaActual<EmpresaProp>,
    cambiarOrdenEmpresa: cambiarOrden<EmpresaProp>,
    eliminarEmpresaRedux: eliminarElemento<EmpresaProp>,
    resetReduxEmpresa: resetRedux<EmpresaProp>,
  },
});

export const {
  crearEmpresas,
  crearBusquedaEmpresa,
  resetBusquedaEmpresa,
  resetSeleccionarEmpresa,
  seleccionarEmpresa,
  agregarEmpresasBusquedaActual,
  cambiarOrdenEmpresa,
  resetReduxEmpresa,
  eliminarEmpresaRedux,
} = empresaSlice.actions;

export default empresaSlice.reducer;
