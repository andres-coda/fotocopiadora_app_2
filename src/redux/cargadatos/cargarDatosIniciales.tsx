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
import useComponentesApi from "../../servicio/componente/useComponentesApi";
import { ComponenteProp } from "../../modelo/Entidades/libro/componente.interface";
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

const CargarDatosIniciales = ({ children }: AppProp) => {

  const { obtenerLibros, responseLibros } = useLibrosApi();
  const { obtenerClientes, responseClientes } = useClientesApi();
  const { obtenerEspecificaciones, responseEspecificaciones } = useEspecificacionesApi();
  const { obtenerMaterias, responseMaterias } = useMateriasApi();
  const { obtenerPedidos, responsePedidos } = usePedidosApi();
  const { obtenerPedidoLibross, responsePedidoLibross } = usePedidoLibrosApi();
  const { obtenerPrecios, responsePrecios } = usePreciosApi();
  const { obtenerSedes, responseSedes } = useSedesApi();
  const { obtenerComponentes, responseComponentes } = useComponentesApi();

  const dispatch = useDispatch();

  const libroItems: LibroProp[] = useSelector((store: appStore) => store.libro.items);
  const clienteItems: ClienteProp[] = useSelector((store: appStore) => store.cliente.items);
  const especificacionItems: EspecificacionProp[] = useSelector((store: appStore) => store.especificacion.items);
  const materiaItems: MateriaProp[] = useSelector((store: appStore) => store.materia.items);
  const pedidoItems: PedidoProp[] = useSelector((store: appStore) => store.pedido.items);
  const pedidoLibroItems: PedidoLibroProp[] = useSelector((store: appStore) => store.pedidoLibro.items);
  const precioItems: PrecioProp[] = useSelector((store: appStore) => store.precio.items);
  const sedeItems: SedeProp[] = useSelector((store: appStore) => store.sede.items);
  const componenteItems: ComponenteProp[] = useSelector((store: appStore) => store.componente.items);

  const {
    responseObraSocial,
  } = useSockets({
    obraSocial: true,
  })

  useEffect(() => {
    crearElementosContexto({
      libros: responseLibros || undefined,
      clientes: responseClientes || undefined,
      especificaciones: responseEspecificaciones || undefined,
      materias: responseMaterias || undefined,
      pedidos: responsePedidos || undefined,
      pedidoLibros: responsePedidoLibross || undefined,
      precios: responsePrecios || undefined,
      sedes: responseSedes || undefined,
      componentes: responseComponentes || undefined,

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
    responseComponentes,
  ]);

  useEffect(() => {
    if (libroItems.length === 0) obtenerLibros();
    if (clienteItems.length === 0) obtenerClientes();
    if (especificacionItems.length === 0) obtenerEspecificaciones();
    if (materiaItems.length === 0) obtenerMaterias();
    if (pedidoItems.length === 0) obtenerPedidos();
    if (pedidoLibroItems.length === 0) obtenerPedidoLibross();
    if (precioItems.length === 0) obtenerPrecios();
    if (sedeItems.length === 0) obtenerSedes();
    if (componenteItems.length === 0) obtenerComponentes();
  }, [])

  return (<>{children}</>)
}


export default CargarDatosIniciales;