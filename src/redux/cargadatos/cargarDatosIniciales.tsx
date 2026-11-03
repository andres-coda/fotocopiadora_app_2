import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appStore } from '../store';
import { AppProp } from '../modelo/cargarDatos.interface';
import { crearElementosContexto } from '../utils/crearElementosContexto';
import { EspecificacionProp } from '../../modelo/Entidades/especificacion/especificacion.interface';
import useEspecificacionesApi from '../../servicio/especificacion/useEspecificacionesApi';
import usePreciosApi from '../../servicio/precio/usePreciosApi';
import useSedesApi from '../../servicio/sede/useSedesApi';
import { PrecioProp } from '../../modelo/Entidades/precio/precio.interface';
import { SedeProp } from '../../modelo/Entidades/sede/sede.interface';
import { MensajeProp } from '../../modelo/Entidades/mensaje/mensaje.interface';
import useMensajesApi from '../../servicio/mensaje/useMensajesApi';
import useSockets from '../../hooks/sockets/useSockets';
import { useSesion } from '../../hooks/sesion/useSesion';
import useEmpresaApi from '../../servicio/empresa/useEmpresaApi';

import { useAutenticacion } from '../../hooks/autenticacion/useAutenticacion';
import { cargandoEmpresa, empresaActual, errorEmpresa, solicitadaEmpresa } from '../state/empresa.state';

const CargarDatosIniciales = ({ children }: AppProp) => {
  const {token} = useAutenticacion();
  const { obtenerEspecificaciones, responseEspecificaciones } = useEspecificacionesApi();
  const { obtenerPrecios, responsePrecios } = usePreciosApi();
  const { obtenerSedes, responseSedes } = useSedesApi();
  const { obtenerMensajes, responseMensajes } = useMensajesApi();

  const dispatch = useDispatch();

  // Unica fuente de verdad del perfil: useSesion sincroniza GET /auth/profile
  // en el slice `sesion`. Header y perfil solo leen de Redux.
  useSesion();

  const { obtenerEmpresaMia, responseEmpresa, loadingEmpresa, errorFetchEmpresa } = useEmpresaApi();

  const miEmpresa = useSelector((store: appStore) => store.empresa.miEmpresa);
 
  // Evita repetir la peticion cuando el back responde 404 (sin empresa).
  const empresaSolicitada = useRef<boolean>(false);

  const especificacionItems: EspecificacionProp[] = useSelector(
    (store: appStore) => store.especificacion.datosIniciales.datosQuery
  );
  const precioItems: PrecioProp[] = useSelector(
    (store: appStore) => store.precio.datosIniciales.datosQuery
  );
  const sedeItems: SedeProp[] = useSelector(
    (store: appStore) => store.sede.datosIniciales.datosQuery
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
    crearElementosContexto({
      especificaciones: responseEspecificaciones || undefined,
      precios: responsePrecios || undefined,
      sedes: responseSedes || undefined,
      mensajes: responseMensajes || undefined,

      dispatch,
    });
  }, [
    responseEspecificaciones,
    responsePrecios,
    responseSedes,
    responseMensajes,
  ]);

  useEffect(() => {
    if(!token) return
    if (especificacionItems.length === 0) obtenerEspecificaciones();
    if (precioItems.length === 0) obtenerPrecios();
    if (sedeItems.length === 0) obtenerSedes();
    if (mensajeItems.length === 0) obtenerMensajes();
  }, [token]);

  return <>{children}</>;
};

export default CargarDatosIniciales;
