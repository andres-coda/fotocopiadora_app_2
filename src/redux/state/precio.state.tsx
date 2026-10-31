import { createSlice } from '@reduxjs/toolkit';
import { PrecioProp } from '../../modelo/Entidades/precio/precio.interface';
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
  modificarElementoRedux,
  agregarElementoInicio,
  resetRedux,
} from '../utils/funcionesGenericasEmpresa';
import { estadoInicialRedux } from '../utils/reduxInicial';

const cantidadBusquedas: number = 1;

const estadoPrecioInicial: ReduxProp<PrecioProp> = estadoInicialRedux<PrecioProp>('ultAct', 20);

export const precioSlice = createSlice({
  name: 'precio_empresa',
  initialState: estadoPrecioInicial,
  reducers: {
    crearPrecios: crearDatoInicial,
    crearBusquedaPrecio: crearBusqueda<PrecioProp>(cantidadBusquedas),
    resetBusquedaPrecio: resetBusqueda<PrecioProp>(cantidadBusquedas),
    seleccionarPrecio: seleccionarDato,
    resetSeleccionarPrecio: resetSeleccionDato,
    eliminarPrecioRedux: eliminarElemento<PrecioProp>,
    agregarPreciosBusquedaActual: agregarDatosBusquedaActual<PrecioProp>,
    cambiarOrdenPrecio: cambiarOrden<PrecioProp>,
    actualizarPrecioRedux: modificarElementoRedux<PrecioProp>,
    agregarPrecioInicioRedux: agregarElementoInicio<PrecioProp>,
    resetReduxPrecio: resetRedux<PrecioProp>,
  },
});

export const {
  crearPrecios,
  crearBusquedaPrecio,
  resetBusquedaPrecio,
  resetSeleccionarPrecio,
  seleccionarPrecio,
  agregarPreciosBusquedaActual,
  cambiarOrdenPrecio,
  eliminarPrecioRedux,
  actualizarPrecioRedux,
  agregarPrecioInicioRedux,
  resetReduxPrecio,
} = precioSlice.actions;

export default precioSlice.reducer;
