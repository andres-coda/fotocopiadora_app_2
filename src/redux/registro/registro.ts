import { clienteSlice } from "../state/cliente.state";
import { especificacionSlice } from "../state/especificacion.state";
import { materiaSlice } from "../state/materia.state";
import { pedidoSlice } from "../state/pedido.state";
import { pedidoLibroSlice } from "../state/pedido_libro.state";
import { precioSlice } from "../state/precio.state";
import { sedeSlice } from "../state/sede.state";
import { propuestaSlice } from "../state/propuesta.state";
import { libroSlice } from "../state/libro.state";

export const reducerRegistro = {
  cliente: clienteSlice.reducer,
  especificacion: especificacionSlice.reducer,
  materia: materiaSlice.reducer,
  pedido: pedidoSlice.reducer,
  pedidoLibro: pedidoLibroSlice.reducer,
  precio: precioSlice.reducer,
  sede: sedeSlice.reducer,
  propuesta: propuestaSlice.reducer,
  libro: libroSlice.reducer,
};

export const selectores = {
  cliente: {
    busquedaActual: (state: any) => state.cliente.busquedaActual.datosQuery,
    datoSeleccionado: (state: any) => state.cliente.datoSeleccionado,
    busquedas: (state: any) => state.cliente.ultimasBusqueda,
  },
  especificacion: {
    busquedaActual: (state: any) => state.especificacion.busquedaActual.datosQuery,
    datoSeleccionado: (state: any) => state.especificacion.datoSeleccionado,
    busquedas: (state: any) => state.especificacion.ultimasBusqueda,
  },
  materia: {
    busquedaActual: (state: any) => state.materia.busquedaActual.datosQuery,
    datoSeleccionado: (state: any) => state.materia.datoSeleccionado,
    busquedas: (state: any) => state.materia.ultimasBusqueda,
  },
  pedido: {
    busquedaActual: (state: any) => state.pedido.busquedaActual.datosQuery,
    datoSeleccionado: (state: any) => state.pedido.datoSeleccionado,
    busquedas: (state: any) => state.pedido.ultimasBusqueda,
  },
  pedidoLibro: {
    busquedaActual: (state: any) => state.pedidoLibro.busquedaActual.datosQuery,
    datoSeleccionado: (state: any) => state.pedidoLibro.datoSeleccionado,
    busquedas: (state: any) => state.pedidoLibro.ultimasBusqueda,
  },
  precio: {
    busquedaActual: (state: any) => state.precio.busquedaActual.datosQuery,
    datoSeleccionado: (state: any) => state.precio.datoSeleccionado,
    busquedas: (state: any) => state.precio.ultimasBusqueda,
  },
  sede: {
    busquedaActual: (state: any) => state.sede.busquedaActual.datosQuery,
    datoSeleccionado: (state: any) => state.sede.datoSeleccionado,
    busquedas: (state: any) => state.sede.ultimasBusqueda,
  },
  propuesta: {
    busquedaActual: (state: any) => state.propuesta.busquedaActual.datosQuery,
    datoSeleccionado: (state: any) => state.propuesta.datoSeleccionado,
    busquedas: (state: any) => state.propuesta.ultimasBusqueda,
  },
  libro: {
    busquedaActual: (state: any) => state.libro.busquedaActual.datosQuery,
    datoSeleccionado: (state: any) => state.libro.datoSeleccionado,
    busquedas: (state: any) => state.libro.ultimasBusqueda,
  },
};