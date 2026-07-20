import { createSlice } from "@reduxjs/toolkit";
import { ReduxProp, UltimaBusquedaProp } from "../modelo/reduxContext.interface";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import {crearDatoInicial, crearBusqueda, resetBusqueda, seleccionarDato, resetSeleccionDato} from "../utils/funcionesGenericasEmpresa";

/* const filterDefault: FiltersState<ClienteProp> = {
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
    cambiarEstadoLibroPedidoCliente:cambiarEstadoLibroPedidoClienteFuncion,
    //cambiarEstadoPedidoCliente:cambiarEstadoPedidoClienteFuncion
  }
});

export const { 
  createClientes, addClientes, substractClientes, resetClientes,
  selectCliente, resetSelectCliente, verificarCliente, 
  addFiltroCliente, substractFiltroCliente, resetFiltrosCliente, setOrdenamientoClientes,
  cambiarOrdenCliente, cambiarEstadoLibroPedidoCliente,
  // cambiarEstadoPedidoCliente
} = clienteSlice.actions;

export default clienteSlice.reducer;
 */


const cantidadBusquedas: number = 1;

export const busquedaClienteInicial: UltimaBusquedaProp<ClienteProp> = {
  query: undefined,
  datosQuery: [],
  pagina: 1,
  limite: 20,
  total: 0,
  orden: 'asc'
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
    resetSeleccionarCliente: resetSeleccionDato
  }
});

export const { crearClientes, crearBusquedaCliente, resetBusquedaCliente, resetSeleccionarCliente, seleccionarCliente } = clienteSlice.actions;

export default clienteSlice.reducer;

