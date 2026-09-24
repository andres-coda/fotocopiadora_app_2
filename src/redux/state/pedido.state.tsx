import { createSlice } from "@reduxjs/toolkit";
import { ReduxProp, UltimaBusquedaProp, orden } from "../modelo/reduxContext.interface";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { agregarDatosBusquedaActual, crearBusqueda, crearDatoInicial, resetBusqueda, resetSeleccionDato, seleccionarDato, cambiarOrden } from "../utils/funcionesGenericasEmpresa";
import { agregarItemsPedidoSeleccionadoFincion, modificarEstadoPedidoFuncion } from "../utils/funcionesPedido";

const cantidadBusquedas: number = 1;

export const busquedaPedidoInicial: UltimaBusquedaProp<PedidoProp> = {
  query: undefined,
  datosQuery: [],
  sortBy: 'ultAct' as keyof PedidoProp,
  sortOrder: 'asc' as orden,
  pagina: 1,
  limite: 20,
  total: 0
}

const estadoPedidoInicial: ReduxProp<PedidoProp> = {
  datosIniciales: busquedaPedidoInicial,
  busquedaActual: busquedaPedidoInicial,
  ultimasBusqueda: [],
  datoSeleccionado: undefined
}

export const pedidoSlice = createSlice({
  name: 'pedido',
  initialState: estadoPedidoInicial,
  reducers: {
    crearPedidos: crearDatoInicial,
    crearBusquedaPedido: crearBusqueda<PedidoProp>(cantidadBusquedas),
    resetBusquedaPedido: resetBusqueda<PedidoProp>(cantidadBusquedas),
    seleccionarPedido: seleccionarDato,
    resetSeleccionarPedido: resetSeleccionDato,
    agregarPedidosBusquedaActual: agregarDatosBusquedaActual<PedidoProp>,
    agregarItemsPedidoSeleccionado: agregarItemsPedidoSeleccionadoFincion,
    cambiarEstadoPedido: modificarEstadoPedidoFuncion,
    cambiarOrdenPedido: cambiarOrden<PedidoProp>
  }
});

export const { crearPedidos, crearBusquedaPedido, resetBusquedaPedido, resetSeleccionarPedido, seleccionarPedido, agregarPedidosBusquedaActual, cambiarOrdenPedido, cambiarEstadoPedido, agregarItemsPedidoSeleccionado } = pedidoSlice.actions;

export default pedidoSlice.reducer;