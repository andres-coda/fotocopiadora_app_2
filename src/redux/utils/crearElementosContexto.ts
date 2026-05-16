import { crearContextProp } from "../modelo/cargarDatos.interface";
import { createClientes } from "../state/cliente.state";
import { createComponentes } from "../state/componente.state";
import { createEspecificaciones } from "../state/especificacion.state";
import { createLibros } from "../state/libro.state";
import { createMaterias } from "../state/materia.state";
import { createPedidos } from "../state/pedido.state";
import { createPedidoLibros } from "../state/pedido_libro.state";
import { createPrecios } from "../state/precio.state";
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
  dispatch,
}: crearContextProp) => {


  if (libros) dispatch(createLibros(libros));
  if (clientes) dispatch(createClientes(clientes));
  if (especificaciones) dispatch(createEspecificaciones(especificaciones));
  if (materias) dispatch(createMaterias(materias));
  if (pedidos) dispatch(createPedidos(pedidos));
  if (pedidoLibros) dispatch(createPedidoLibros(pedidoLibros));
  if (precios) dispatch(createPrecios(precios));
  if (sedes) dispatch(createSedes(sedes));
  if (componentes) dispatch(createComponentes(componentes));


}
