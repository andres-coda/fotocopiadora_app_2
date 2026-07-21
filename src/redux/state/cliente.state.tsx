import { createSlice } from "@reduxjs/toolkit";
import { ReduxProp, UltimaBusquedaProp } from "../modelo/reduxContext.interface";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import {crearDatoInicial, crearBusqueda, resetBusqueda, seleccionarDato, resetSeleccionDato} from "../utils/funcionesGenericasEmpresa";

const cantidadBusquedas: number = 1;

export const busquedaClienteInicial: UltimaBusquedaProp<ClienteProp> = {
  query: undefined,
  datosQuery: [],
  pagina: 1,
  limite: 20,
  total: 0,
  orden: 'asc'
}

const estadoClienteInicial: ReduxProp<ClienteProp> = {
  datosIniciales: busquedaClienteInicial,
  busquedaActual: busquedaClienteInicial,
  ultimasBusqueda: [],
  datoSeleccionado: undefined
}

export const clienteSlice = createSlice({
  name: 'cliente',
  initialState: estadoClienteInicial,
  reducers: {
    crearClientes: crearDatoInicial,
    crearBusquedaCliente: crearBusqueda<ClienteProp>(cantidadBusquedas),
    resetBusquedaCliente: resetBusqueda<ClienteProp>(cantidadBusquedas),
    seleccionarCliente: seleccionarDato,
    resetSeleccionarCliente: resetSeleccionDato
  }
});

export const { crearClientes, crearBusquedaCliente, resetBusquedaCliente, resetSeleccionarCliente, seleccionarCliente } = clienteSlice.actions;

export default clienteSlice.reducer;

