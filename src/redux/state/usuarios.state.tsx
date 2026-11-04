import { createSlice } from '@reduxjs/toolkit';
import { usuarioProps } from '../../modelo/usuario/Usuario.interface';
import { orden, ReduxProp, UltimaBusquedaProp } from '../modelo/reduxContext.interface';
import {
  crearBusqueda,
  crearDatoInicial,
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

export const busquedaUsuarioInicial: UltimaBusquedaProp<usuarioProps> = {
  query: undefined,
  datosQuery: [],
  sortBy: 'ultAct' as keyof usuarioProps,
  sortOrder: 'asc' as orden,
  pagina: 0,
  limite: 6,
  total: 0,
};

const estadoUsuarioInicial: ReduxProp<usuarioProps> = estadoInicialRedux<usuarioProps>('nombre');

export const usuarioSlice = createSlice({
  name: 'usuario',
  initialState: estadoUsuarioInicial,
  reducers: {
    crearUsuarios: crearDatoInicial<usuarioProps>,
    crearBusquedaUsuario: crearBusqueda<usuarioProps>(cantidadBusquedas),
    resetBusquedaUsuario: resetBusqueda<usuarioProps>(cantidadBusquedas),
    seleccionarUsuario: seleccionarDato,
    resetSeleccionarUsuario: resetSeleccionDato,
    agregarUsuariosBusquedaActual: agregarDatosBusquedaActual<usuarioProps>,
    cambiarOrdenUsuario: cambiarOrden<usuarioProps>,
    eliminarUsuarioRedux: eliminarElemento<usuarioProps>,
    actualizarUsuarioRedux: modificarElementoRedux<usuarioProps>,
    agregarUsuarioInicioRedux: agregarElementoInicio<usuarioProps>,
    resetReduxUsuario: resetRedux<usuarioProps>,
  },
});

export const {
  crearUsuarios,
  crearBusquedaUsuario,
  resetBusquedaUsuario,
  resetSeleccionarUsuario,
  seleccionarUsuario,
  agregarUsuariosBusquedaActual,
  cambiarOrdenUsuario,
  eliminarUsuarioRedux,
  actualizarUsuarioRedux,
  agregarUsuarioInicioRedux,
  resetReduxUsuario,
} = usuarioSlice.actions;

export default usuarioSlice.reducer;
