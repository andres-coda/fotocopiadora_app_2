import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { appStore } from "../store";
import { AppProp } from "../modelo/cargarDatos.interface";
import { crearElementosContexto } from "../utils/crearElementosContexto";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import useLibrosApi from "../../servicio/libro/useLibrosApi";
import useClientesApi from "../../servicio/cliente/useClientesApi";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { EspecificacionProp } from "../../modelo/Entidades/especificacion/especificacion.interface";
import useEspecificacionesApi from "../../servicio/especificacion/useEspecificacionesApi";
import { MateriaProp } from "../../modelo/Entidades/libro/materia.interface";
import useMateriasApi from "../../servicio/materia/useMateriasApi";
import usePedidosApi from "../../servicio/pedido/usePedidosApi";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import usePedidoLibrosApi from "../../servicio/pedido_libro/usePedidoLibrosApi";
import { PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import usePreciosApi from "../../servicio/precio/usePreciosApi";
import useSedesApi from "../../servicio/sede/useSedesApi";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import useSockets from "../../hooks/sockets/useSockets";
import { PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";
import usePropuestasApi from "../../servicio/propuesta/usePropuestasApi";

const CargarDatosIniciales = ({ children }: AppProp) => {

  const { obtenerLibros, responseLibros } = useLibrosApi();
  const { obtenerClientes, responseClientes } = useClientesApi();
  const { obtenerEspecificaciones, responseEspecificaciones } = useEspecificacionesApi();
  const { obtenerMaterias, responseMaterias } = useMateriasApi();
  const { obtenerPedidos, responsePedidos } = usePedidosApi();
  const { obtenerPedidoLibross, responsePedidoLibross } = usePedidoLibrosApi();
  const { obtenerPrecios, responsePrecios } = usePreciosApi();
  const { obtenerSedes, responseSedes } = useSedesApi();
  const { obtenerPropuestas, responsePropuestas } = usePropuestasApi();

  const dispatch = useDispatch();

  const librosIniciales:LibroProp[] = useSelector((store:appStore) => store.libro_empresa.datosIniciales.datosQuery)
  const clienteItems: ClienteProp[] = useSelector((store: appStore) => store.cliente.datosIniciales.datosQuery);
  const especificacionItems: EspecificacionProp[] = useSelector((store: appStore) => store.especificacion.items);
  const materiaItems: MateriaProp[] = useSelector((store: appStore) => store.materia.items);
  const pedidoItems: PedidoProp[] = useSelector((store: appStore) => store.pedido.busquedaActual.datosQuery);
  const pedidoLibroItems: PedidoLibroProp[] = useSelector((store: appStore) => store.pedidoLibro.items);
  const precioItems: PrecioProp[] = useSelector((store: appStore) => store.precio.datosIniciales.datosQuery);
  const sedeItems: SedeProp[] = useSelector((store: appStore) => store.sede.datosIniciales.datosQuery);
  const propuestasItems: PropuestaProp[] = useSelector((store: appStore) => store.propuesta.datosIniciales.datosQuery);

  const {
  } = useSockets({
  })

  useEffect(() => {
    console.log('response pedido: ', responsePedidos)
    crearElementosContexto({
      libros: responseLibros || undefined,
      clientes: responseClientes || undefined,
      especificaciones: responseEspecificaciones || undefined,
      materias: responseMaterias?.datos || undefined,
      pedidos: responsePedidos || undefined,
      pedidoLibros: responsePedidoLibross || undefined,
      precios: responsePrecios || undefined,
      sedes: responseSedes || undefined,
      propuestas: responsePropuestas || undefined,

      dispatch,
    })
  }, [
    responseLibros,
    responseClientes,
    responseEspecificaciones,
    responseMaterias,
    responsePedidos,
    responsePedidoLibross,
    responsePrecios,
    responseSedes,
    responsePropuestas,
  ]);

  useEffect(() => {
    if (pedidoItems.length === 0) obtenerPedidos();
    if (librosIniciales.length === 0) obtenerLibros();
    if (clienteItems.length === 0) obtenerClientes();
    if (especificacionItems.length === 0) obtenerEspecificaciones();
    if (materiaItems.length === 0) obtenerMaterias();
    if (pedidoLibroItems.length === 0) obtenerPedidoLibross();
    if (precioItems.length === 0) obtenerPrecios();
    if (sedeItems.length === 0) obtenerSedes();
    if (propuestasItems.length === 0) obtenerPropuestas();
  }, [])

  return (<>{children}</>)
}


export default CargarDatosIniciales;