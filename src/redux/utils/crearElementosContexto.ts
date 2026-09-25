import { PaginadoProp } from "../../adaptadores/entrada/paginado.adapter";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { EspecificacionProp } from "../../modelo/Entidades/especificacion/especificacion.interface";
import { MateriaProp } from "../../modelo/Entidades/libro/materia.interface";
import { PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { crearContextProp } from "../modelo/cargarDatos.interface";
import { UltimaBusquedaProp, orden } from "../modelo/reduxContext.interface";
import { crearClientes } from "../state/cliente.state";
import { crearEspecificaciones } from "../state/especificacion.state";
import { crearLibros } from "../state/libro.state";
import { crearMaterias } from "../state/materia.state";
import { crearPedidos } from "../state/pedido.state";
import { crearPedidoLibros } from "../state/pedido_libro.state";
import { crearPrecios } from "../state/precio.state";
import { crearPropuestas } from "../state/propuesta.state";
import { crearSedes } from "../state/sede.state";

const convertirDatoPlaydon = <T>(dato: PaginadoProp<T>, sortBy: keyof T, sortOrder: orden): UltimaBusquedaProp<T> => {
  return {
    datosQuery: dato.datos,
    sortBy,
    sortOrder,
    pagina: dato.pagina,
    limite: dato.limite,
    total: dato.total
  }
}

const convertirArrayAUltimaBusqueda = <T>(datos: T[], sortBy: keyof T, sortOrder: orden): UltimaBusquedaProp<T> => {
  return {
    datosQuery: datos,
    sortBy,
    sortOrder,
    pagina: 1,
    limite: datos.length,
    total: datos.length
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
  propuestas = undefined,
  dispatch,
}: crearContextProp) => {


  if (libros) {
    const lb: UltimaBusquedaProp<LibroProp> = convertirDatoPlaydon<LibroProp>(libros, 'nombre' as keyof LibroProp, 'asc');
    dispatch(crearLibros(lb as any))};
  if (clientes) {
    const cl: UltimaBusquedaProp<ClienteProp> = convertirDatoPlaydon<ClienteProp>(clientes, 'ultAct' as keyof ClienteProp, 'asc');
    dispatch(crearClientes(cl as any));
  }
  if (especificaciones) {
    const esp: UltimaBusquedaProp<EspecificacionProp> = convertirArrayAUltimaBusqueda<EspecificacionProp>(especificaciones, 'ultAct' as keyof EspecificacionProp, 'asc');
    dispatch(crearEspecificaciones(esp as any));
  }
  if (materias) {
    const mat: UltimaBusquedaProp<MateriaProp> = convertirArrayAUltimaBusqueda<MateriaProp>(materias, 'ultAct' as keyof MateriaProp, 'asc');
    dispatch(crearMaterias(mat as any));
  }
  if (pedidos) {
    const pd: UltimaBusquedaProp<PedidoProp> = convertirDatoPlaydon<PedidoProp>(pedidos, 'ultAct' as keyof PedidoProp, 'asc');
    dispatch(crearPedidos(pd as any));
  }
  if (pedidoLibros) {
    const pl: UltimaBusquedaProp<PedidoLibroProp> = convertirDatoPlaydon<PedidoLibroProp>(pedidoLibros, 'ultAct' as keyof PedidoLibroProp, 'asc');
    dispatch(crearPedidoLibros(pl as any));
  }
  if (precios) {
    const pr: UltimaBusquedaProp<PrecioProp> = convertirDatoPlaydon<PrecioProp>(precios, 'ultAct' as keyof PrecioProp, 'asc');
    dispatch(crearPrecios(pr as any));
  }
  if (sedes) {
    const sd: UltimaBusquedaProp<SedeProp> = convertirDatoPlaydon<SedeProp>(sedes, 'ultAct' as keyof SedeProp, 'asc');
    dispatch(crearSedes(sd as any));
  }
  if (propuestas) {
    const pp: UltimaBusquedaProp<PropuestaProp> = convertirDatoPlaydon<PropuestaProp>(propuestas, 'ultAct' as keyof PropuestaProp, 'asc');
    dispatch(crearPropuestas(pp as any));
  }


}