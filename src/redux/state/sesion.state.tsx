import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { usuarioProps } from "../../modelo/usuario/Usuario.interface";

export interface SesionStateProp {
  usuario: usuarioProps | null;
  cargando: boolean;
  error: string | null;
}

export const sesionInicial: SesionStateProp = {
  usuario: null,
  cargando: false,
  error: null,
}

export const sesionSlice = createSlice({
  name: 'sesion',
  initialState: sesionInicial,
  reducers: {
    setUsuario: (state, action: PayloadAction<usuarioProps | null>) => {
      state.usuario = action.payload;
    },
    setCargandoSesion: (state, action: PayloadAction<boolean>) => {
      state.cargando = action.payload;
    },
    setErrorSesion: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetSesion: (state) => {
      state.usuario = null;
      state.cargando = false;
      state.error = null;
    },
  }
});

export const { setUsuario, setCargandoSesion, setErrorSesion, resetSesion } = sesionSlice.actions;

export default sesionSlice.reducer;
