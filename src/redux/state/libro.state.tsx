import { createSlice } from '@reduxjs/toolkit';
import { LibroProp } from '../../modelo/Entidades/libro/libro.interface';
import { ReduxProp } from '../modelo/reduxContext.interface';
import {
  crearDatoInicial,
  crearBusqueda,
  resetBusqueda,
  seleccionarDato,
  resetSeleccionDato,
  agregarDatosBusquedaActual,
  cambiarOrden,
  eliminarElemento,
  resetRedux,
  modificarElementoRedux,
} from '../utils/funcionesGenericasEmpresa';
import {
  actualizarMuchosStockFn,
  actualizarStockFn,
  actualizarStockLocalFn,
  agregarLibroSocket,
} from '../utils/funcionesLibro';
import { estadoInicialRedux } from '../utils/reduxInicial';

const cantidadBusquedas: number = 15;

const estadoLibroInicial: ReduxProp<LibroProp> = estadoInicialRedux<LibroProp>('nombre', 10);
export const libroSlice = createSlice({
  name: 'libro',
  initialState: estadoLibroInicial,
  reducers: {
    crearLibros: crearDatoInicial<LibroProp>,
    crearBusquedaLibro: crearBusqueda<LibroProp>(cantidadBusquedas),
    resetBusquedaLibro: resetBusqueda<LibroProp>(cantidadBusquedas),
    seleccionarLibro: seleccionarDato,
    resetSeleccionarLibro: resetSeleccionDato,
    agregarLibrosBusquedaActual: agregarDatosBusquedaActual<LibroProp>,
    actualizarStockRedux: actualizarStockFn,
    actualizarMuchosStockRedux: actualizarMuchosStockFn,
    cambiarOrdenLibro: cambiarOrden<LibroProp>,
    actualizarStockLocal: actualizarStockLocalFn,
    eliminarLibroRedux: eliminarElemento<LibroProp>,
    agregarLibroSocketRedux: agregarLibroSocket,
    actualizarLibroSocketRedux: modificarElementoRedux<LibroProp>,
    resetReduxLibro: resetRedux<LibroProp>,
  },
});

export const {
  crearLibros,
  crearBusquedaLibro,
  resetBusquedaLibro,
  resetSeleccionarLibro,
  seleccionarLibro,
  agregarLibrosBusquedaActual,
  actualizarStockRedux,
  actualizarMuchosStockRedux,
  cambiarOrdenLibro,
  actualizarStockLocal,
  eliminarLibroRedux,
  agregarLibroSocketRedux,
  actualizarLibroSocketRedux,
  resetReduxLibro,
} = libroSlice.actions;

export default libroSlice.reducer;
