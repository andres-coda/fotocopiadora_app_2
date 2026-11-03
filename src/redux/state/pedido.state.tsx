import { createSlice } from '@reduxjs/toolkit';
import { ReduxProp } from '../modelo/reduxContext.interface';
import { PedidoProp } from '../../modelo/Entidades/pedido/pedido.interface';
import {
  agregarDatosBusquedaActual,
  crearBusqueda,
  crearDatoInicial,
  resetBusqueda,
  resetSeleccionDato,
  seleccionarDato,
  cambiarOrden,
  resetRedux,
} from '../utils/funcionesGenericasEmpresa';
import {
  agregarItemsPedidoSeleccionadoRedux as agregarItemsPedidoSeleccionadoFn,
  modificarEstadoPedidoRedux as modificarEstadoPedidoFn,
} from '../utils/funcionesPedido';
import { estadoInicialRedux } from '../utils/reduxInicial';

const cantidadBusquedas: number = 1;

const estadoPedidoInicial: ReduxProp<PedidoProp> = estadoInicialRedux<PedidoProp>('ultAct');

export const pedidoSlice = createSlice({
  name: 'pedido',
  initialState: estadoPedidoInicial,
  reducers: {
    crearPedidos: crearDatoInicial<PedidoProp>,
    crearBusquedaPedido: crearBusqueda<PedidoProp>(cantidadBusquedas),
    resetBusquedaPedido: resetBusqueda<PedidoProp>(cantidadBusquedas),
    seleccionarPedido: seleccionarDato,
    resetSeleccionarPedido: resetSeleccionDato,
    agregarPedidosBusquedaActual: agregarDatosBusquedaActual<PedidoProp>,
    agregarItemsPedidoSeleccionadoRedux: agregarItemsPedidoSeleccionadoFn,
    cambiarEstadoPedidoRedux: modificarEstadoPedidoFn,
    cambiarOrdenPedido: cambiarOrden<PedidoProp>,
    resetReduxPedido: resetRedux<PedidoProp>,
  },
});

export const {
  crearPedidos,
  crearBusquedaPedido,
  resetBusquedaPedido,
  resetSeleccionarPedido,
  seleccionarPedido,
  agregarPedidosBusquedaActual,
  cambiarOrdenPedido,
  cambiarEstadoPedidoRedux,
  agregarItemsPedidoSeleccionadoRedux,
  resetReduxPedido,
} = pedidoSlice.actions;

export default pedidoSlice.reducer;
