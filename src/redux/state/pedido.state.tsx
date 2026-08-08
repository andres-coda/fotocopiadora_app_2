import { createSlice } from "@reduxjs/toolkit";
import { addFiltroGenerico, agregarElementoItems, cambiarOrdenGenerico, createElmentoItems, resetElementosItems, resetFiltroGenerico, resetSelectElemento, selectElemento, setOrdenGenerico, substractElementoItems, substractFiltroGenerico, verificarElemento } from "../utils/funcionesGenericas";
import { filterContext, FiltersState, ReduxProp, UltimaBusquedaProp } from "../modelo/reduxContext.interface";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { filtrosInicialesPedido } from "../../filtro/pedido.filtro";
import { agregarDatosBusquedaActual, crearBusqueda, crearDatoInicial, resetBusqueda, resetSeleccionDato, seleccionarDato } from "../utils/funcionesGenericasEmpresa";


const cantidadBusquedas: number = 1;

export const busquedaPedidoInicial: UltimaBusquedaProp<PedidoProp> = {
  query: undefined,
  datosQuery: [],
  pagina: 1,
  limite: 20,
  total: 0,
  orden: 'asc'
}

const estadoPedidoInicial: ReduxProp<PedidoProp> = {
  datosIniciales: busquedaPedidoInicial,
  busquedaActual: busquedaPedidoInicial,
  ultimasBusqueda: [],
  datoSeleccionado: undefined
}

export const pedidoSlice = createSlice({
  name: 'libro_empresa',
  initialState: estadoPedidoInicial,
  reducers: {
    crearPedidos: crearDatoInicial,
    crearBusquedaPedido: crearBusqueda<PedidoProp>(cantidadBusquedas),
    resetBusquedaPedido: resetBusqueda<PedidoProp>(cantidadBusquedas),
    seleccionarPedido: seleccionarDato,
    resetSeleccionarPedido: resetSeleccionDato,
    agregarPedidosBusquedaActual: agregarDatosBusquedaActual<PedidoProp>
  }
});

export const { crearPedidos, crearBusquedaPedido, resetBusquedaPedido, resetSeleccionarPedido, seleccionarPedido, agregarPedidosBusquedaActual } = pedidoSlice.actions;

export default pedidoSlice.reducer;


/* 
const filterDefault: FiltersState<PedidoProp> = {
  filtros: filtrosInicialesPedido,
  sortBy: 'ultAct',
  sortOrder: 'asc'
}

const initialState: filterContext<PedidoProp> = {
  items: [],
  selected: null,
  filter: filterDefault
};

export const pedidoSlice = createSlice({
  name: 'pedido',
  initialState: initialState,
  reducers: {
    createPedidos: createElmentoItems<PedidoProp>,
    addPedidos: agregarElementoItems<PedidoProp>,
    substractPedidos: substractElementoItems<PedidoProp>,
    resetPedidos: resetElementosItems<PedidoProp>,
    selectPedido: selectElemento<PedidoProp>,
    resetSelectPedido: resetSelectElemento<PedidoProp>,
    verificarPedido: verificarElemento<PedidoProp>,
    addFiltroPedido: addFiltroGenerico<PedidoProp>,
    substractFiltroPedido: substractFiltroGenerico<PedidoProp>,
    resetFiltrosPedido: resetFiltroGenerico<PedidoProp>,
    setOrdenamientoPedidos: setOrdenGenerico<PedidoProp>,
    cambiarOrdenPedido: cambiarOrdenGenerico<PedidoProp>
  }
});

export const { 
  createPedidos, addPedidos, substractPedidos, resetPedidos,
  selectPedido, resetSelectPedido, verificarPedido, 
  addFiltroPedido, substractFiltroPedido, resetFiltrosPedido, setOrdenamientoPedidos,
  cambiarOrdenPedido,
} = pedidoSlice.actions;

export default pedidoSlice.reducer; 

*/