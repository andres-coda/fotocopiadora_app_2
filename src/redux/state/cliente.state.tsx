import { createSlice } from "@reduxjs/toolkit";
import { addFiltroGenerico, agregarElementoItems, cambiarOrdenGenerico, createElmentoItems, resetElementosItems, resetFiltroGenerico, resetSelectElemento, selectElemento, setOrdenGenerico, substractElementoItems, substractFiltroGenerico, verificarElemento } from "../utils/funcionesGenericas";
import { filterContext, FiltersState } from "../modelo/reduxContext.interface";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { filtrosInicialesCliente } from "../../filtro/cliente.filtro";
import { cambiarEstadoLibroPedidoClienteFuncion } from "../utils/funcionesCliente";

const filterDefault: FiltersState<ClienteProp> = {
  filtros: filtrosInicialesCliente,
  sortBy: 'ultAct',
  sortOrder: 'asc'
}

const initialState: filterContext<ClienteProp> = {
  items: [],
  selected: null,
  filter: filterDefault
};

export const clienteSlice = createSlice({
  name: 'cliente',
  initialState: initialState,
  reducers: {
    createClientes: createElmentoItems<ClienteProp>,
    addClientes: agregarElementoItems<ClienteProp>,
    substractClientes: substractElementoItems<ClienteProp>,
    resetClientes: resetElementosItems<ClienteProp>,
    selectCliente: selectElemento<ClienteProp>,
    resetSelectCliente: resetSelectElemento<ClienteProp>,
    verificarCliente: verificarElemento<ClienteProp>,
    addFiltroCliente: addFiltroGenerico<ClienteProp>,
    substractFiltroCliente: substractFiltroGenerico<ClienteProp>,
    resetFiltrosCliente: resetFiltroGenerico<ClienteProp>,
    setOrdenamientoClientes: setOrdenGenerico<ClienteProp>,
    cambiarOrdenCliente: cambiarOrdenGenerico<ClienteProp>,
    cambiarEstadoLibroPedidoCliente:cambiarEstadoLibroPedidoClienteFuncion
  }
});

export const { 
  createClientes, addClientes, substractClientes, resetClientes,
  selectCliente, resetSelectCliente, verificarCliente, 
  addFiltroCliente, substractFiltroCliente, resetFiltrosCliente, setOrdenamientoClientes,
  cambiarOrdenCliente, cambiarEstadoLibroPedidoCliente,
} = clienteSlice.actions;

export default clienteSlice.reducer;