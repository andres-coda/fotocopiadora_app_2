import { PayloadAction } from "@reduxjs/toolkit";
import { EmpresaStateProp } from "../state/empresa.state";
import { EmpresaProp } from "../../modelo/Entidades/empresa/empresa.interface";
import { resetRedux } from "./funcionesGenericasEmpresa";


export const setEmpresaActual = (state: EmpresaStateProp, action: PayloadAction<EmpresaProp | null>) => {
  state.miEmpresa.empresa = action.payload;
};

export const setCargandoEmpresa = (state: EmpresaStateProp, action: PayloadAction<boolean>) => {
  state.miEmpresa.cargando = action.payload;
};

export const setErrorEmpresa = (state: EmpresaStateProp, action: PayloadAction<string | null>) => {
  state.miEmpresa.error = action.payload;
};

export const setSolicitadaEmpresa = (state: EmpresaStateProp, action: PayloadAction<boolean>) => {
  state.miEmpresa.solicitada = action.payload;
};

export const resetMiEmpresa = (state: EmpresaStateProp) => {
  state.miEmpresa.empresa = null;
  state.miEmpresa.cargando = false;
  state.miEmpresa.error = null;
  state.miEmpresa.solicitada = false;
}

export const resetEmpresaRedux = (state: EmpresaStateProp) => {
  resetMiEmpresa(state);
  resetRedux<EmpresaProp>(state);
}