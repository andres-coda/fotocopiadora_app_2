import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PrecioProp } from '../../modelo/Entidades/precio/precio.interface';
import {
  PrecioFiltrosProp,
  filtrosPrecioInicial,
} from '../../modelo/Entidades/precio/precioFiltro.interface';
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
import { agregarPrecioSocket } from '../utils/funcionesPrecio';

const cantidadBusquedas: number = 1;

/**
 * Los filtros viven en la raiz del slice para que sobrevivan a cada respuesta:
 * `busquedaActual` se reemplaza entero en cada fetch.
 */
export type PrecioStateProp = ReduxProp<PrecioProp> & {
  filtrosPrecio: PrecioFiltrosProp;
};

const estadoPrecioInicial: PrecioStateProp = {
  ...estadoInicialRedux<PrecioProp>('ultAct', 20),
  filtrosPrecio: filtrosPrecioInicial,
};

export const precioSlice = createSlice({
  name: 'precio_empresa',
  initialState: estadoPrecioInicial,
  reducers: {
    crearPrecios: crearDatoInicial<PrecioProp>,
    crearBusquedaPrecio: crearBusqueda<PrecioProp>(cantidadBusquedas),
    resetBusquedaPrecio: resetBusqueda<PrecioProp>(cantidadBusquedas),
    seleccionarPrecio: seleccionarDato,
    resetSeleccionarPrecio: resetSeleccionDato,
    eliminarPrecioRedux: eliminarElemento<PrecioProp>,
    agregarPreciosBusquedaActual: agregarDatosBusquedaActual<PrecioProp>,
    cambiarOrdenPrecio: cambiarOrden<PrecioProp>,
    actualizarPrecioRedux: modificarElementoRedux<PrecioProp>,
    agregarPrecioInicioRedux: agregarElementoInicio<PrecioProp>,
    agregarPrecioSocketRedux: agregarPrecioSocket,
    cambiarFiltrosPrecio: (state, action: PayloadAction<PrecioFiltrosProp>) => {
      state.filtrosPrecio = action.payload;
    },
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
  agregarPrecioSocketRedux,
  cambiarFiltrosPrecio,
  resetReduxPrecio,
} = precioSlice.actions;

export default precioSlice.reducer;
