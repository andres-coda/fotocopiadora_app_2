import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EspecificacionProp } from '../../modelo/Entidades/especificacion/especificacion.interface';
import { ReduxSimple } from '../modelo/reduxContext.interface';
import { estadoInicialSimple } from '../utils/reduxInicial';

export type EspecificacionState = ReduxSimple<EspecificacionProp>;

const initialState: EspecificacionState = estadoInicialSimple<EspecificacionProp>();

export const especificacionSlice = createSlice({
  name: 'especificacion',
  initialState,
  reducers: {
    setEspecificaciones: (state, action: PayloadAction<EspecificacionProp[]>) => {
      state.datos = action.payload;
      state.cargaInicial = true;
    },
    setCargaInicial: (state, action: PayloadAction<boolean>) => {
      state.cargaInicial = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetEspecificaciones: () => estadoInicialSimple<EspecificacionProp>(),
  },
});

export const {
  setEspecificaciones,
  setCargaInicial,
  setError,
  setLoading,
  resetEspecificaciones,
} = especificacionSlice.actions;

export default especificacionSlice.reducer;