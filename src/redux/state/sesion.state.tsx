import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { usuarioProps } from '../../modelo/usuario/Usuario.interface';
import { ReduxSimpleElemento } from '../modelo/reduxContext.interface';
import { estadoInicialSimpleElemento } from '../utils/reduxInicial';


export const sesionInicial: ReduxSimpleElemento<usuarioProps> = estadoInicialSimpleElemento<usuarioProps>();

export const sesionSlice = createSlice({
  name: 'sesion',
  initialState: sesionInicial,
  reducers: {
    setUsuario: (state, action: PayloadAction<usuarioProps | null>) => {
      state.dato = action.payload;
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
    resetSesion: () => estadoInicialSimpleElemento<usuarioProps>(),
  },
});

export const { 
  setUsuario, 
  setCargaInicial: setCargaInicialSesion, 
  setError: setErrorSesion, 
  setLoading: setLoadingSesion,
  resetSesion 
} = sesionSlice.actions;

export default sesionSlice.reducer;
