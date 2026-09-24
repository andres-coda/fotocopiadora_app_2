import { createSlice } from "@reduxjs/toolkit";
import { ReduxProp, UltimaBusquedaProp, orden } from "../modelo/reduxContext.interface";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import {crearDatoInicial, crearBusqueda, resetBusqueda, seleccionarDato, resetSeleccionDato, agregarDatosBusquedaActual, cambiarOrden} from "../utils/funcionesGenericasEmpresa";
import { modificarResumenFuncion } from "../utils/funcionesCliente";

const cantidadBusquedas: number = 1;

export const busquedaClienteInicial: UltimaBusquedaProp<ClienteProp> = {
  query: undefined,
  datosQuery: [],
  sortBy: 'ultAct' as keyof ClienteProp,
  sortOrder: 'asc' as orden,
  pagina: 0,
  limite: 3,
  total: 0
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
    agregarClientesBusquedaActual: agregarDatosBusquedaActual<ClienteProp>,
    actualizarResumenCliente: modificarResumenFuncion,
    cambiarOrdenCliente: cambiarOrden<ClienteProp>
  }
});

export const { crearClientes, crearBusquedaCliente, resetBusquedaCliente, resetSeleccionarCliente, seleccionarCliente, agregarClientesBusquedaActual, cambiarOrdenCliente, actualizarResumenCliente } = clienteSlice.actions;

export default clienteSlice.reducer;