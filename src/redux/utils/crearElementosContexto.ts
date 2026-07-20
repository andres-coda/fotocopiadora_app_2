import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { crearContextProp } from "../modelo/cargarDatos.interface";
import { UltimaBusquedaProp } from "../modelo/reduxContext.interface";
import { busquedaClienteInicial, crearClientes } from "../state/cliente.state";
import { createComponentes } from "../state/componente.state";
import { createEspecificaciones } from "../state/especificacion.state";
import { createLibros } from "../state/libro.state";
import { busquedaLibroInicial, crearLibros } from "../state/libro_empresa.state";
import { createMaterias } from "../state/materia.state";
import { createPedidos } from "../state/pedido.state";
import { createPedidoLibros } from "../state/pedido_libro.state";
import { createPrecios } from "../state/precio.state";
import { createPropuestas } from "../state/propuesta.state";
import { createSedes } from "../state/sede.state";

export const crearElementosContexto = ({
  libros = undefined,
  clientes = undefined,
  especificaciones = undefined,
  materias = undefined,
  pedidos = undefined,
  pedidoLibros = undefined,
  precios = undefined,
  sedes = undefined,
  componentes = undefined,
  propuestas = undefined,
  dispatch,
}: crearContextProp) => {


  if (libros) {
    dispatch(createLibros(libros));
    const playdon:UltimaBusquedaProp<LibroProp> = {
      ...busquedaLibroInicial, datosQuery: libros
    } 
    dispatch(crearLibros(playdon))};
  if (clientes) dispatch(crearClientes({...busquedaClienteInicial, datosQuery:clientes}));
  if (especificaciones) dispatch(createEspecificaciones(especificaciones));
  if (materias) dispatch(createMaterias(materias));
  if (pedidos) dispatch(createPedidos(pedidos));
  if (pedidoLibros) dispatch(createPedidoLibros(pedidoLibros));
  if (precios) dispatch(createPrecios(precios));
  if (sedes) dispatch(createSedes(sedes));
  if (componentes) dispatch(createComponentes(componentes));
  if (propuestas) dispatch(createPropuestas(propuestas));


}
