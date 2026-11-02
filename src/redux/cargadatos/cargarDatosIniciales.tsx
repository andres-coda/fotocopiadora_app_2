import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appStore } from '../store';
import { AppProp } from '../modelo/cargarDatos.interface';
import { crearElementosContexto } from '../utils/crearElementosContexto';
import { LibroProp } from '../../modelo/Entidades/libro/libro.interface';
import useLibrosApi from '../../servicio/libro/useLibrosApi';
import { EspecificacionProp } from '../../modelo/Entidades/especificacion/especificacion.interface';
import useEspecificacionesApi from '../../servicio/especificacion/useEspecificacionesApi';
import usePedidosApi from '../../servicio/pedido/usePedidosApi';
import { PedidoProp } from '../../modelo/Entidades/pedido/pedido.interface';
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

import { useAutenticacion } from '../../hooks/autenticacion/useAutenticacion';
import { cargandoEmpresa, empresaActual, errorEmpresa, solicitadaEmpresa } from '../state/empresa.state';

const CargarDatosIniciales = ({ children }: AppProp) => {
  const {token} = useAutenticacion();
  const { obtenerLibros, responseLibros } = useLibrosApi();
  const { obtenerEspecificaciones, responseEspecificaciones } = useEspecificacionesApi();
  const { obtenerPedidos, responsePedidos } = usePedidosApi();
  const { obtenerPrecios, responsePrecios } = usePreciosApi();
  const { obtenerSedes, responseSedes } = useSedesApi();
  const { obtenerMensajes, responseMensajes } = useMensajesApi();
  const { obtenerPropuestas, responsePropuestas } = usePropuestasApi();

  const dispatch = useDispatch();

  // Unica fuente de verdad del perfil: useSesion sincroniza GET /auth/profile
  // en el slice `sesion`. Header y perfil solo leen de Redux.
  useSesion();

  const { obtenerEmpresaMia, responseEmpresa, loadingEmpresa, errorFetchEmpresa } = useEmpresaApi();

  const miEmpresa = useSelector((store: appStore) => store.empresa.miEmpresa);
 
  // Evita repetir la peticion cuando el back responde 404 (sin empresa).
  const empresaSolicitada = useRef<boolean>(false);

  const librosIniciales: LibroProp[] = useSelector(
    (store: appStore) => store.libro.datosIniciales.datosQuery
  );
  const especificacionItems: EspecificacionProp[] = useSelector(
    (store: appStore) => store.especificacion.datosIniciales.datosQuery
  );
  const pedidoItems: PedidoProp[] = useSelector(
    (store: appStore) => store.pedido.datosIniciales.datosQuery
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
    dispatch(cargandoEmpresa(loadingEmpresa));
  }, [loadingEmpresa]);

  useEffect(() => {
    if (responseEmpresa) dispatch(empresaActual(responseEmpresa));
  }, [responseEmpresa]);

  useEffect(() => {
    if (!errorFetchEmpresa) return;

    // GET /empresa/mia responde 404 cuando el usuario no tiene empresa.
    // Ese caso no es un fallo: se refleja como "sin empresa".
    if (errorFetchEmpresa.includes('404')) {
      dispatch(empresaActual(null));
      dispatch(errorEmpresa(null));
      return;
    }

    dispatch(errorEmpresa(errorFetchEmpresa));
  }, [errorFetchEmpresa]);

  useEffect(() => {
    if (empresaSolicitada.current) return;
    if (miEmpresa.empresa !== null || miEmpresa.error) return;

    empresaSolicitada.current = true;
    dispatch(solicitadaEmpresa(true));
    obtenerEmpresaMia();
  }, [miEmpresa, errorEmpresa]);

  useEffect(() => {
    console.log('response pedido: ', responsePedidos);
    crearElementosContexto({
      libros: responseLibros || undefined,
      especificaciones: responseEspecificaciones || undefined,
      pedidos: responsePedidos || undefined,
      precios: responsePrecios || undefined,
      sedes: responseSedes || undefined,
      mensajes: responseMensajes || undefined,
      propuestas: responsePropuestas || undefined,

      dispatch,
    });
  }, [
    responseLibros,
    responseEspecificaciones,
    responsePedidos,
    responsePrecios,
    responseSedes,
    responseMensajes,
    responsePropuestas,
  ]);

  useEffect(() => {
    if(!token) return
    if (pedidoItems.length === 0) obtenerPedidos();
    if (librosIniciales.length === 0) obtenerLibros();
    if (especificacionItems.length === 0) obtenerEspecificaciones();
    if (precioItems.length === 0) obtenerPrecios();
    if (sedeItems.length === 0) obtenerSedes();
    if (mensajeItems.length === 0) obtenerMensajes();
    if (propuestasItems.length === 0) obtenerPropuestas();
  }, [token]);

  return <>{children}</>;
};

export default CargarDatosIniciales;
