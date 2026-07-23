import { createSlice } from "@reduxjs/toolkit";
import { ReduxProp, UltimaBusquedaProp } from "../modelo/reduxContext.interface";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import {crearDatoInicial, crearBusqueda, resetBusqueda, seleccionarDato, resetSeleccionDato, agregarDatosBusquedaActual} from "../utils/funcionesGenericasEmpresa";

const cantidadBusquedas: number = 1;

export const busquedaClienteInicial: UltimaBusquedaProp<ClienteProp> = {
  query: undefined,
  datosQuery: [],
  pagina: 0,
  limite: 3,
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
    resetSeleccionarCliente: resetSeleccionDato,
    agregarClientesBusquedaActual: agregarDatosBusquedaActual<ClienteProp>
  }
});

export const { crearClientes, crearBusquedaCliente, resetBusquedaCliente, resetSeleccionarCliente, seleccionarCliente, agregarClientesBusquedaActual } = clienteSlice.actions;

export default clienteSlice.reducer;

