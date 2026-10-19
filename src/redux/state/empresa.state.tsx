import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfiguracionProp } from "../../modelo/Entidades/configuracion/configuracion.interface";
import { EmpresaProp } from "../../modelo/Entidades/empresa/empresa.interface";

// La empresa se guarda completa, con su configuracion embebida, tal como la
// devuelve GET /empresa/mia. El id de empresa no vive en el front: el back lo
// deriva de la sesion.
export interface EmpresaStateProp {
  empresa: EmpresaProp | null;
  cargando: boolean;
  error: string | null;
  // Indica si ya se disparo la peticion inicial, para no mostrar "sin empresa"
  // durante el primer render.
  solicitada: boolean;
}

export const empresaInicial: EmpresaStateProp = {
  empresa: null,
  cargando: false,
  error: null,
  solicitada: false,
}

export const empresaSlice = createSlice({
  name: 'empresa',
  initialState: empresaInicial,
  reducers: {
    setEmpresa: (state, action: PayloadAction<EmpresaProp | null>) => {
      state.empresa = action.payload;
    },
    setConfiguracionEmpresa: (state, action: PayloadAction<ConfiguracionProp>) => {
      if (state.empresa) state.empresa.configuracion = action.payload;
    },
    setCargandoEmpresa: (state, action: PayloadAction<boolean>) => {
      state.cargando = action.payload;
    },
    setErrorEmpresa: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSolicitadaEmpresa: (state, action: PayloadAction<boolean>) => {
      state.solicitada = action.payload;
    },
    resetEmpresa: (state) => {
      state.empresa = null;
      state.cargando = false;
      state.error = null;
      state.solicitada = false;
    },
  }
});

export const { setEmpresa, setConfiguracionEmpresa, setCargandoEmpresa, setErrorEmpresa, setSolicitadaEmpresa, resetEmpresa } = empresaSlice.actions;

export default empresaSlice.reducer;
