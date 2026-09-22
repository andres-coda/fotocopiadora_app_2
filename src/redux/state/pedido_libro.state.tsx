import { createSlice } from "@reduxjs/toolkit";
import { PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { ReduxProp, UltimaBusquedaProp, orden } from "../modelo/reduxContext.interface";
import {crearDatoInicial, crearBusqueda, resetBusqueda, seleccionarDato, resetSeleccionDato, agregarDatosBusquedaActual, cambiarOrden} from "../utils/funcionesGenericasEmpresa";
import { limiteDefecto } from "../../utils/constantes";

const cantidadBusquedas: number = 1;

export const busquedaPedidoLibroInicial: UltimaBusquedaProp<PedidoLibroProp> = {
  query: undefined,
  datosQuery: [],
  sortBy: 'ultAct' as keyof PedidoLibroProp,
  sortOrder: 'asc' as orden,
  pagina: 1,
  limite: limiteDefecto,
  total: 0
}

const estadoPedidoLibroInicial: ReduxProp<PedidoLibroProp> = {
  datosIniciales: busquedaPedidoLibroInicial,
  busquedaActual: busquedaPedidoLibroInicial,
  ultimasBusqueda: [],
  datoSeleccionado: undefined
}

export const pedidoLibroSlice = createSlice({
  name: 'pedidoLibro',
  initialState: estadoPedidoLibroInicial,
  reducers: {
    crearPedidoLibros: crearDatoInicial,
    crearBusquedaPedidoLibro: crearBusqueda<PedidoLibroProp>(cantidadBusquedas),
    resetBusquedaPedidoLibro: resetBusqueda<PedidoLibroProp>(cantidadBusquedas),
    seleccionarPedidoLibro: seleccionarDato,
    resetSeleccionarPedidoLibro: resetSeleccionDato,
    agregarPedidoLibrosBusquedaActual: agregarDatosBusquedaActual<PedidoLibroProp>,
    cambiarOrdenPedidoLibro: cambiarOrden<PedidoLibroProp>
  }
});

export const { 
  crearPedidoLibros, 
  crearBusquedaPedidoLibro, 
  resetBusquedaPedidoLibro, 
  resetSeleccionarPedidoLibro, 
  seleccionarPedidoLibro, 
  agregarPedidoLibrosBusquedaActual,
  cambiarOrdenPedidoLibro
} = pedidoLibroSlice.actions;

export default pedidoLibroSlice.reducer;