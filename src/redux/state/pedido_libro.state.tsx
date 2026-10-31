import { createSlice, PayloadAction, WritableDraft } from '@reduxjs/toolkit';
import { PedidoLibroProp } from '../../modelo/Entidades/pedido_libro/pedidoLibro.interface';
import {
  PedidoLibroFiltrosProp,
  PedidoLibroOrdenProp,
  filtrosPedidoLibroInicial,
  ordenPedidoLibroInicial,
} from '../../modelo/Entidades/pedido_libro/pedidoLibroFiltro.interface';
import { CambiarEstadoPedidoCompletoProp } from '../../modelo/Entidades/pedido_libro/cambioEstado.interface';
import { ActionProp, ReduxProp } from '../modelo/reduxContext.interface';
import {
  crearDatoInicial,
  crearBusqueda,
  resetBusqueda,
  seleccionarDato,
  resetSeleccionDato,
  agregarDatosBusquedaActual,
  cambiarOrden,
  resetRedux,
} from '../utils/funcionesGenericasEmpresa';
import {
  cambiarSedePedidoLibroRedux as cambiarSedePedidoLibroFn,
  modificarEstadoPedidoLibroFn,
} from '../utils/funcionesPedido';
import { estadoInicialRedux } from '../utils/reduxInicial';

const cantidadBusquedas: number = 5;

// Estado del slice: los filtros y el orden viven en la raíz para que sobrevivan
// a cada respuesta (busquedaActual se reemplaza en cada fetch).
export type PedidoLibroStateProp = ReduxProp<PedidoLibroProp> & {
  filtrosPedidoLibro: PedidoLibroFiltrosProp;
  ordenPedidoLibro: PedidoLibroOrdenProp[];
};

const estadoPedidoLibroInicial: PedidoLibroStateProp = {
  ...estadoInicialRedux<PedidoLibroProp>('ultAct'),
  filtrosPedidoLibro: filtrosPedidoLibroInicial,
  ordenPedidoLibro: ordenPedidoLibroInicial,
};

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
    // Se reescribe el resultado como mutación del draft para que el reducer
    // conserve el tipo completo del slice (incluye filtrosPedidoLibro y ordenPedidoLibro).
    cambiarSedePedidoLibroRedux: (
      state: WritableDraft<PedidoLibroStateProp>,
      action: ActionProp<PedidoLibroProp>
    ) => {
      state.datoSeleccionado = cambiarSedePedidoLibroFn(state, action).datoSeleccionado;
    },
    cambiarEstadoPedidoLibroRedux: (
      state: WritableDraft<PedidoLibroStateProp>,
      action: ActionProp<CambiarEstadoPedidoCompletoProp>
    ) => {
      const actualizado = modificarEstadoPedidoLibroFn(state, action);
      state.datosIniciales = actualizado.datosIniciales;
      state.busquedaActual = actualizado.busquedaActual;
      state.ultimasBusqueda = actualizado.ultimasBusqueda;
      state.datoSeleccionado = actualizado.datoSeleccionado;
    },
    cambiarOrdenPedidoLibro: cambiarOrden<PedidoLibroProp>,
    cambiarFiltrosPedidoLibro: (state, action: PayloadAction<PedidoLibroFiltrosProp>) => {
      state.filtrosPedidoLibro = action.payload;
    },
    cambiarOrdenPedidoLibroArreglo: (state, action: PayloadAction<PedidoLibroOrdenProp[]>) => {
      state.ordenPedidoLibro = action.payload;
    },
    resetReduxItem: resetRedux<PedidoLibroProp>,
  },
});

export const {
  crearPedidoLibros,
  crearBusquedaPedidoLibro,
  resetBusquedaPedidoLibro,
  resetSeleccionarPedidoLibro,
  seleccionarPedidoLibro,
  agregarPedidoLibrosBusquedaActual,
  cambiarOrdenPedidoLibro,
  cambiarSedePedidoLibroRedux,
  cambiarEstadoPedidoLibroRedux,
  cambiarFiltrosPedidoLibro,
  cambiarOrdenPedidoLibroArreglo,
  resetReduxItem,
} = pedidoLibroSlice.actions;

export default pedidoLibroSlice.reducer;
