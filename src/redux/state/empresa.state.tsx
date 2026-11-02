import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
import { ConfiguracionProp } from '../../modelo/Entidades/configuracion/configuracion.interface';

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
    crearEmpresas: crearDatoInicial<EmpresaProp>,
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
    setConfiguracionEmpresa: (state, action: PayloadAction<ConfiguracionProp>) => {
      if (state.miEmpresa.empresa) state.miEmpresa.empresa.configuracion = action.payload;
    },
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
  setConfiguracionEmpresa,
} = empresaSlice.actions;

export default empresaSlice.reducer;
