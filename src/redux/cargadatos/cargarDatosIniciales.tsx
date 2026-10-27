import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appStore } from '../store';
import { AppProp } from '../modelo/cargarDatos.interface';
import { crearElementosContexto } from '../utils/crearElementosContexto';
import { LibroProp } from '../../modelo/Entidades/libro/libro.interface';
import useLibrosApi from '../../servicio/libro/useLibrosApi';
import useClientesApi from '../../servicio/cliente/useClientesApi';
import { ClienteProp } from '../../modelo/Entidades/cliente/cliente.interface';
import { EspecificacionProp } from '../../modelo/Entidades/especificacion/especificacion.interface';
import useEspecificacionesApi from '../../servicio/especificacion/useEspecificacionesApi';
import { MateriaProp } from '../../modelo/Entidades/libro/materia.interface';
import useMateriasApi from '../../servicio/materia/useMateriasApi';
import usePedidosApi from '../../servicio/pedido/usePedidosApi';
import { PedidoProp } from '../../modelo/Entidades/pedido/pedido.interface';
import usePedidoLibrosApi from '../../servicio/pedido_libro/usePedidoLibrosApi';
import { PedidoLibroProp } from '../../modelo/Entidades/pedido_libro/pedidoLibro.interface';
import usePreciosApi from '../../servicio/precio/usePreciosApi';
import useSedesApi from '../../servicio/sede/useSedesApi';
import { PrecioProp } from '../../modelo/Entidades/precio/precio.interface';
import { SedeProp } from '../../modelo/Entidades/sede/sede.interface';
import { MensajeProp } from '../../modelo/Entidades/mensaje/mensaje.interface';
import useMensajesApi from '../../servicio/mensaje/useMensajesApi';
import useSockets from '../../hooks/sockets/useSockets';
import { PropuestaProp } from '../../modelo/Entidades/propuesta/propuesta.interface';
import usePropuestasApi from '../../servicio/propuesta/usePropuestasApi';
import { useSesion } from '../../hooks/sesion/useSesion';
import useEmpresaApi from '../../servicio/empresa/useEmpresaApi';
import {
  setCargandoEmpresa,
  setEmpresa,
  setErrorEmpresa,
  setSolicitadaEmpresa,
} from '../state/empresa.state';
import { useAutenticacion } from '../../hooks/autenticacion/useAutenticacion';

const CargarDatosIniciales = ({ children }: AppProp) => {
  const {token} = useAutenticacion();
  const { obtenerLibros, responseLibros } = useLibrosApi();
  const { obtenerClientes, responseClientes } = useClientesApi();
  const { obtenerEspecificaciones, responseEspecificaciones } = useEspecificacionesApi();
  const { obtenerMaterias, responseMaterias } = useMateriasApi();
  const { obtenerPedidos, responsePedidos } = usePedidosApi();
  const { obtenerPedidoLibross, responsePedidoLibross } = usePedidoLibrosApi();
  const { obtenerPrecios, responsePrecios } = usePreciosApi();
  const { obtenerSedes, responseSedes } = useSedesApi();
  const { obtenerMensajes, responseMensajes } = useMensajesApi();
  const { obtenerPropuestas, responsePropuestas } = usePropuestasApi();

  const dispatch = useDispatch();

  // Unica fuente de verdad del perfil: useSesion sincroniza GET /auth/profile
  // en el slice `sesion`. Header y perfil solo leen de Redux.
  useSesion();

  const { obtenerEmpresaMia, responseEmpresa, loadingEmpresa, errorFetchEmpresa } = useEmpresaApi();

  const empresaActual = useSelector((store: appStore) => store.empresa.empresa);
  const errorEmpresa = useSelector((store: appStore) => store.empresa.error);

  // Evita repetir la peticion cuando el back responde 404 (sin empresa).
  const empresaSolicitada = useRef<boolean>(false);

  const librosIniciales: LibroProp[] = useSelector(
    (store: appStore) => store.libro.datosIniciales.datosQuery
  );
  const clienteItems: ClienteProp[] = useSelector(
    (store: appStore) => store.cliente.datosIniciales.datosQuery
  );
  const especificacionItems: EspecificacionProp[] = useSelector(
    (store: appStore) => store.especificacion.datosIniciales.datosQuery
  );
  const materiaItems: MateriaProp[] = useSelector(
    (store: appStore) => store.materia.datosIniciales.datosQuery
  );
  const pedidoItems: PedidoProp[] = useSelector(
    (store: appStore) => store.pedido.datosIniciales.datosQuery
  );
  const pedidoLibroItems: PedidoLibroProp[] = useSelector(
    (store: appStore) => store.pedidoLibro.datosIniciales.datosQuery
  );
  const precioItems: PrecioProp[] = useSelector(
    (store: appStore) => store.precio.datosIniciales.datosQuery
  );
  const sedeItems: SedeProp[] = useSelector(
    (store: appStore) => store.sede.datosIniciales.datosQuery
  );
  const propuestasItems: PropuestaProp[] = useSelector(
    (store: appStore) => store.propuesta.datosIniciales.datosQuery
  );
  const mensajeItems: MensajeProp[] = useSelector(
    (store: appStore) => store.mensaje.datosIniciales.datosQuery
  );

  const {} = useSockets({});

  useEffect(() => {
    dispatch(setCargandoEmpresa(loadingEmpresa));
  }, [loadingEmpresa]);

  useEffect(() => {
    if (responseEmpresa) dispatch(setEmpresa(responseEmpresa));
  }, [responseEmpresa]);

  useEffect(() => {
    if (!errorFetchEmpresa) return;

    // GET /empresa/mia responde 404 cuando el usuario no tiene empresa.
    // Ese caso no es un fallo: se refleja como "sin empresa".
    if (errorFetchEmpresa.includes('404')) {
      dispatch(setEmpresa(null));
      dispatch(setErrorEmpresa(null));
      return;
    }

    dispatch(setErrorEmpresa(errorFetchEmpresa));
  }, [errorFetchEmpresa]);

  useEffect(() => {
    if (empresaSolicitada.current) return;
    if (empresaActual !== null || errorEmpresa) return;

    empresaSolicitada.current = true;
    dispatch(setSolicitadaEmpresa(true));
    obtenerEmpresaMia();
  }, [empresaActual, errorEmpresa]);

  useEffect(() => {
    console.log('response pedido: ', responsePedidos);
    crearElementosContexto({
      libros: responseLibros || undefined,
      clientes: responseClientes || undefined,
      especificaciones: responseEspecificaciones || undefined,
      materias: responseMaterias?.datos || undefined,
      pedidos: responsePedidos || undefined,
      pedidoLibros: responsePedidoLibross || undefined,
      precios: responsePrecios || undefined,
      sedes: responseSedes || undefined,
      mensajes: responseMensajes || undefined,
      propuestas: responsePropuestas || undefined,

      dispatch,
    });
  }, [
    responseLibros,
    responseClientes,
    responseEspecificaciones,
    responseMaterias,
    responsePedidos,
    responsePedidoLibross,
    responsePrecios,
    responseSedes,
    responseMensajes,
    responsePropuestas,
  ]);

  useEffect(() => {
    if(!token) return
    if (pedidoItems.length === 0) obtenerPedidos();
    if (librosIniciales.length === 0) obtenerLibros();
    if (clienteItems.length === 0) obtenerClientes();
    if (especificacionItems.length === 0) obtenerEspecificaciones();
    if (materiaItems.length === 0) obtenerMaterias();
    if (pedidoLibroItems.length === 0) obtenerPedidoLibross();
    if (precioItems.length === 0) obtenerPrecios();
    if (sedeItems.length === 0) obtenerSedes();
    if (mensajeItems.length === 0) obtenerMensajes();
    if (propuestasItems.length === 0) obtenerPropuestas();
  }, [token]);

  return <>{children}</>;
};

export default CargarDatosIniciales;
