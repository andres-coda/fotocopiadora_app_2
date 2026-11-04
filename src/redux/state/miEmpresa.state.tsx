import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmpresaProp } from '../../modelo/Entidades/empresa/empresa.interface';
import { ReduxSimpleElemento } from '../modelo/reduxContext.interface';
import { estadoInicialSimpleElemento } from '../utils/reduxInicial';
import { ConfiguracionProp } from '../../modelo/Entidades/configuracion/configuracion.interface';

export type MiEmpresaState = ReduxSimpleElemento<EmpresaProp>;

const initialState: MiEmpresaState = estadoInicialSimpleElemento<EmpresaProp>();

export const miEmpresaSlice = createSlice({
  name: 'miEmpresa',
  initialState,
  reducers: {
    setMiEmpresa: (state, action: PayloadAction<EmpresaProp | null>) => {
      state.dato = action.payload;
      state.cargaInicial = true;
    },
    setCargaInicialMiEmpresa: (state, action: PayloadAction<boolean>) => {
      state.cargaInicial = action.payload;
    },
    setErrorMiEmpresa: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoadingMiEmpresa: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setConfiguracionMiEmpresa: (state, action: PayloadAction<ConfiguracionProp>) => {
      if (state.dato) state.dato.configuracion = action.payload;
    },
    resetMiEmpresa: () => estadoInicialSimpleElemento<EmpresaProp>(),
  },
});

export const {
  setMiEmpresa,
  setCargaInicialMiEmpresa,
  setErrorMiEmpresa,
  setLoadingMiEmpresa,
  setConfiguracionMiEmpresa,
  resetMiEmpresa,
} = miEmpresaSlice.actions;

export default miEmpresaSlice.reducer;