import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SedeProp } from '../../modelo/Entidades/sede/sede.interface';
import { ReduxSimple } from '../modelo/reduxContext.interface';
import { estadoInicialSimple } from '../utils/reduxInicial';

const initialState: ReduxSimple<SedeProp> = estadoInicialSimple<SedeProp>();

export const sedeSlice = createSlice({
  name: 'sede',
  initialState,
  reducers: {
    setSedes: (state, action: PayloadAction<SedeProp[]>) => {
      state.datos = action.payload;
      state.cargaInicial = true;
    },
    setCargaInicialSedes: (state, action: PayloadAction<boolean>) => {
      state.cargaInicial = action.payload;
    },
    setErrorSedes: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoadingSedes: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetSedes: () => estadoInicialSimple<SedeProp>(),
  },
});

export const {
  setSedes,
  setCargaInicialSedes,
  setErrorSedes,
  setLoadingSedes,
  resetSedes,
} = sedeSlice.actions;

export default sedeSlice.reducer;