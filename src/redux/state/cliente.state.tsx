import { createSlice } from '@reduxjs/toolkit';
import { ReduxProp } from '../modelo/reduxContext.interface';
import { ClienteProp } from '../../modelo/Entidades/cliente/cliente.interface';
import {
  crearDatoInicial,
  crearBusqueda,
  resetBusqueda,
  seleccionarDato,
  resetSeleccionDato,
  agregarDatosBusquedaActual,
  cambiarOrden,
  eliminarElemento,
  modificarElementoRedux,
  agregarElementoInicio,
  resetRedux,
} from '../utils/funcionesGenericasEmpresa';
import { modificarResumenClienteRedux as modificarResumenClienteFn, agregarClienteSocket } from '../utils/funcionesCliente';
import { estadoInicialRedux } from '../utils/reduxInicial';

const cantidadBusquedas: number = 1;

const estadoClienteInicial: ReduxProp<ClienteProp> = estadoInicialRedux<ClienteProp>('ultAct',10);

export const clienteSlice = createSlice({
  name: 'cliente',
  initialState: estadoClienteInicial,
  reducers: {
    crearClientes: crearDatoInicial<ClienteProp>,
    crearBusquedaCliente: crearBusqueda<ClienteProp>(cantidadBusquedas),
    resetBusquedaCliente: resetBusqueda<ClienteProp>(cantidadBusquedas),
    seleccionarCliente: seleccionarDato,
    resetSeleccionarCliente: resetSeleccionDato,
    agregarClientesBusquedaActual: agregarDatosBusquedaActual<ClienteProp>,
    actualizarResumenClienteRedux: modificarResumenClienteFn,
    cambiarOrdenCliente: cambiarOrden<ClienteProp>,
    eliminarClienteRedux: eliminarElemento<ClienteProp>,
    actualizarClienteRedux: modificarElementoRedux<ClienteProp>,
    agregarClienteInicioRedux: agregarElementoInicio<ClienteProp>,
    agregarClienteSocketRedux: agregarClienteSocket,
    resetReduxCliente: resetRedux<ClienteProp>,
  },
});

export const {
  crearClientes,
  crearBusquedaCliente,
  resetBusquedaCliente,
  resetSeleccionarCliente,
  seleccionarCliente,
  agregarClientesBusquedaActual,
  cambiarOrdenCliente,
  actualizarResumenClienteRedux,
  eliminarClienteRedux,
  actualizarClienteRedux,
  agregarClienteInicioRedux,
  agregarClienteSocketRedux,
  resetReduxCliente,
} = clienteSlice.actions;

export default clienteSlice.reducer;
