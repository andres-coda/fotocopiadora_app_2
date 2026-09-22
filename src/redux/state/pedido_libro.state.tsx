import { createSlice } from "@reduxjs/toolkit";
import { addFiltroGenerico, agregarElementoItems, cambiarOrdenGenerico, createElmentoItems, resetElementosItems, resetFiltroGenerico, resetSelectElemento, selectElemento, setOrdenGenerico, substractElementoItems, substractFiltroGenerico, verificarElemento } from "../utils/funcionesGenericas";
import { filterContext, FiltersState, ReduxProp, UltimaBusquedaProp } from "../modelo/reduxContext.interface";
import { PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { filtrosInicialesPedidoLibro } from "../../filtro/pedido_libro.filtro";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { Estado } from "../../modelo/Entidades/pedido_libro/estado.enum";
import { EstadoPedido } from "../../modelo/Entidades/pedido/estadoPedido.enum";
import { limiteDefecto } from "../../utils/constantes";


const cantidadBusquedas: number = 1;

export interface ReduxPedidoProp extends ReduxProp<PedidoLibroProp>{
  estado: Estado;
}

export const busquedaPedidoInicial: UltimaBusquedaProp<PedidoLibroProp> = {
  query: undefined,
  datosQuery: [],
  pagina: 1,
  limite: limiteDefecto,
  total: 0,
  orden: 'asc'
}

const estadoPedidoInicial: ReduxPedidoProp = {
  datosIniciales: busquedaPedidoInicial,
  busquedaActual: busquedaPedidoInicial,
  ultimasBusqueda: [],
  datoSeleccionado: undefined,
  estado: Estado.PENDIENTE
}

const filterDefault: FiltersState<PedidoLibroProp> = {
  filtros: filtrosInicialesPedidoLibro,
  sortBy: 'ultAct',
  sortOrder: 'asc'
}

const initialState: filterContext<PedidoLibroProp> = {
  items: [],
  selected: null,
  filter: filterDefault
};

export const pedidoLibroSlice = createSlice({
  name: 'pedidoLibro',
  initialState: initialState,
  reducers: {
    createPedidoLibros: createElmentoItems<PedidoLibroProp>,
    addPedidoLibros: agregarElementoItems<PedidoLibroProp>,
    substractPedidoLibros: substractElementoItems<PedidoLibroProp>,
    resetPedidoLibros: resetElementosItems<PedidoLibroProp>,
    selectPedidoLibro: selectElemento<PedidoLibroProp>,
    resetSelectPedidoLibro: resetSelectElemento<PedidoLibroProp>,
    verificarPedidoLibro: verificarElemento<PedidoLibroProp>,
    addFiltroPedidoLibro: addFiltroGenerico<PedidoLibroProp>,
    substractFiltroPedidoLibro: substractFiltroGenerico<PedidoLibroProp>,
    resetFiltrosPedidoLibro: resetFiltroGenerico<PedidoLibroProp>,
    setOrdenamientoPedidoLibros: setOrdenGenerico<PedidoLibroProp>,
    cambiarOrdenPedidoLibro: cambiarOrdenGenerico<PedidoLibroProp>
  }
});

export const { 
  createPedidoLibros, addPedidoLibros, substractPedidoLibros, resetPedidoLibros,
  selectPedidoLibro, resetSelectPedidoLibro, verificarPedidoLibro, 
  addFiltroPedidoLibro, substractFiltroPedidoLibro, resetFiltrosPedidoLibro, setOrdenamientoPedidoLibros,
  cambiarOrdenPedidoLibro,
} = pedidoLibroSlice.actions;

export default pedidoLibroSlice.reducer;