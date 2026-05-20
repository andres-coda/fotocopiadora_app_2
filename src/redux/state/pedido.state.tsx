import { createSlice } from "@reduxjs/toolkit";
import { addFiltroGenerico, agregarElementoItems, cambiarOrdenGenerico, createElmentoItems, resetElementosItems, resetFiltroGenerico, resetSelectElemento, selectElemento, setOrdenGenerico, substractElementoItems, substractFiltroGenerico, verificarElemento } from "../utils/funcionesGenericas";
import { filterContext, FiltersState } from "../modelo/reduxContext.interface";
import { PedidoClienteProp, PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { filtrosInicialesPedido } from "../../filtro/pedido.filtro";

const filterDefault: FiltersState<PedidoProp | PedidoClienteProp> = {
  filtros: filtrosInicialesPedido,
  sortBy: 'ultAct',
  sortOrder: 'asc'
}

const initialState: filterContext<PedidoProp | PedidoClienteProp> = {
  items: [],
  selected: null,
  filter: filterDefault
};

export const pedidoSlice = createSlice({
  name: 'pedido',
  initialState: initialState,
  reducers: {
    createPedidos: createElmentoItems<PedidoProp | PedidoClienteProp>,
    addPedidos: agregarElementoItems<PedidoProp | PedidoClienteProp>,
    substractPedidos: substractElementoItems<PedidoProp | PedidoClienteProp>,
    resetPedidos: resetElementosItems<PedidoProp | PedidoClienteProp>,
    selectPedido: selectElemento<PedidoProp | PedidoClienteProp>,
    resetSelectPedido: resetSelectElemento<PedidoProp | PedidoClienteProp>,
    verificarPedido: verificarElemento<PedidoProp | PedidoClienteProp>,
    addFiltroPedido: addFiltroGenerico<PedidoProp | PedidoClienteProp>,
    substractFiltroPedido: substractFiltroGenerico<PedidoProp | PedidoClienteProp>,
    resetFiltrosPedido: resetFiltroGenerico<PedidoProp | PedidoClienteProp>,
    setOrdenamientoPedidos: setOrdenGenerico<PedidoProp | PedidoClienteProp>,
    cambiarOrdenPedido: cambiarOrdenGenerico<PedidoProp | PedidoClienteProp>
  }
});

export const { 
  createPedidos, addPedidos, substractPedidos, resetPedidos,
  selectPedido, resetSelectPedido, verificarPedido, 
  addFiltroPedido, substractFiltroPedido, resetFiltrosPedido, setOrdenamientoPedidos,
  cambiarOrdenPedido,
} = pedidoSlice.actions;

export default pedidoSlice.reducer;