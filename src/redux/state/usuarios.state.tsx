import { createSlice } from '@reduxjs/toolkit';
import { ReduxProp, UltimaBusquedaProp, orden } from '../modelo/reduxContext.interface';
import { usuarioProps } from '../../modelo/usuario/Usuario.interface';
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
} from '../utils/funcionesGenericasEmpresa';

const cantidadBusquedas: number = 1;

export const busquedaUsuarioInicial: UltimaBusquedaProp<usuarioProps> = {
  query: undefined,
  datosQuery: [],
  // usuarioProps no tiene fecha de actualizacion: se ordena por nombre.
  sortBy: 'nombre' as keyof usuarioProps,
  sortOrder: 'asc' as orden,
  pagina: 1,
  limite: 20,
  total: 0,
};

const estadoUsuarioInicial: ReduxProp<usuarioProps> = {
  datosIniciales: busquedaUsuarioInicial,
  busquedaActual: busquedaUsuarioInicial,
  ultimasBusqueda: [],
  datoSeleccionado: undefined,
};

export const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState: estadoUsuarioInicial,
  reducers: {
    crearUsuarios: crearDatoInicial<usuarioProps>,
    crearBusquedaUsuario: crearBusqueda<usuarioProps>(cantidadBusquedas),
    resetBusquedaUsuario: resetBusqueda<usuarioProps>(cantidadBusquedas),
    seleccionarUsuario: seleccionarDato<usuarioProps>,
    resetSeleccionarUsuario: resetSeleccionDato<usuarioProps>,
    agregarUsuariosBusquedaActual: agregarDatosBusquedaActual<usuarioProps>,
    cambiarOrdenUsuario: cambiarOrden<usuarioProps>,
    eliminarUsuarioRedux: eliminarElemento<usuarioProps>,
    actualizarUsuarioRedux: modificarElementoRedux<usuarioProps>,
    agregarUsuarioInicioRedux: agregarElementoInicio<usuarioProps>,
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
} = usuariosSlice.actions;

export default usuariosSlice.reducer;
