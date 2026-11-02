import { createSlice } from '@reduxjs/toolkit';
import { ReduxProp } from '../modelo/reduxContext.interface';
import {
  crearDatoInicial,
  crearBusqueda,
  resetBusqueda,
  seleccionarDato,
  resetSeleccionDato,
  agregarDatosBusquedaActual,
  resetRedux,
} from '../utils/funcionesGenericasEmpresa';
import { empresaInicial, estadoInicialRedux } from '../utils/reduxInicial';
import { EmpresaProp } from '../../modelo/Entidades/empresa/empresa.interface';
import {
  resetMiEmpresa,
  setCargandoEmpresa,
  setEmpresaActual,
  setErrorEmpresa,
  setSolicitadaEmpresa,
} from '../utils/funcionesEmpresa';

const cantidadBusquedas: number = 1;

export interface EmpresaSesionProp {
  empresa: EmpresaProp | null;
  cargando: boolean;
  error: string | null;
  // Indica si ya se disparo la peticion inicial, para no mostrar "sin empresa"
  // durante el primer render.
  solicitada: boolean;
}

// Estado del slice: los filtros y el orden viven en la raíz para que sobrevivan
// a cada respuesta (busquedaActual se reemplaza en cada fetch).
export type EmpresaStateProp = ReduxProp<EmpresaProp> & {
  miEmpresa: EmpresaSesionProp;
};

const estadoEmpresaInicial: EmpresaStateProp = {
  ...estadoInicialRedux<EmpresaProp>('nombre'),
  miEmpresa: empresaInicial,
};

export const empresaSlice = createSlice({
  name: 'empresa',
  initialState: estadoEmpresaInicial,
  reducers: {
    crearEmpresas: crearDatoInicial,
    crearBusquedaEmpresa: crearBusqueda<EmpresaProp>(cantidadBusquedas),
    resetBusquedaEmpresa: resetBusqueda<EmpresaProp>(cantidadBusquedas),
    seleccionarEmpresa: seleccionarDato,
    resetSeleccionarEmpresa: resetSeleccionDato,
    agregarEmpresasBusquedaActual: agregarDatosBusquedaActual<EmpresaProp>,
    empresaActual: setEmpresaActual,
    resetEmpresaActual: resetMiEmpresa,
    cargandoEmpresa: setCargandoEmpresa,
    errorEmpresa: setErrorEmpresa,
    solicitadaEmpresa: setSolicitadaEmpresa,
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
  empresaActual,
  resetEmpresaActual,
  cargandoEmpresa,
  errorEmpresa,
  solicitadaEmpresa,
  resetReduxEmpresa,
} = empresaSlice.actions;

export default empresaSlice.reducer;
