import { createSlice } from "@reduxjs/toolkit";
import { usuarioInicial } from "../../modelo/usuario/Usuario.interface";

export const userSlice = createSlice({
  name: 'user',
  initialState: usuarioInicial,
  reducers: {
    createUser: (_, action) => action.payload,
    modifyUser: (state, action) => ({ ...state, ...action.payload }),
    resetUser: () => usuarioInicial,
  }
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;

export default userSlice.reducer;