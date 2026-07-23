import { PaginadoProp } from "../../adaptadores/entrada/paginado.adapter";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { crearContextProp } from "../modelo/cargarDatos.interface";
import { UltimaBusquedaProp } from "../modelo/reduxContext.interface";
import { crearClientes } from "../state/cliente.state";
import { createComponentes } from "../state/componente.state";
import { createEspecificaciones } from "../state/especificacion.state";
import { crearLibros } from "../state/libro_empresa.state";
import { createMaterias } from "../state/materia.state";
import { createPedidos } from "../state/pedido.state";
import { createPedidoLibros } from "../state/pedido_libro.state";
import { crearPrecios } from "../state/precio.state";
import { crearPropuestas } from "../state/propuesta.state";
import { crearSedes } from "../state/sede.state";

const converitirDatoPlaydon =<T>(dato: PaginadoProp<T>):UltimaBusquedaProp<T> => {
  return {
    datosQuery: dato.datos,
    orden: 'asc',
    pagina: dato.pagina,
    limite: dato.limite,
    total: dato.total
  }
}

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
    dispatch(crearLibros(converitirDatoPlaydon<LibroProp>(libros)))};
  if (clientes) dispatch(crearClientes(converitirDatoPlaydon<ClienteProp>(clientes)));
  if (especificaciones) dispatch(createEspecificaciones(especificaciones));
  if (materias) dispatch(createMaterias(materias));
  if (pedidos) dispatch(createPedidos(pedidos));
  if (pedidoLibros) dispatch(createPedidoLibros(pedidoLibros));
  if (precios) dispatch(crearPrecios(converitirDatoPlaydon<PrecioProp>(precios)));
  if (sedes) dispatch(crearSedes(converitirDatoPlaydon<SedeProp>(sedes)));
  if (componentes) dispatch(createComponentes(componentes));
  if (propuestas) dispatch(crearPropuestas(converitirDatoPlaydon<PropuestaProp>(propuestas)));


}
