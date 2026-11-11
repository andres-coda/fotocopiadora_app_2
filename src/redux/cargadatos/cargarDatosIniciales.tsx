import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appStore } from '../store';
import { AppProp } from '../modelo/cargarDatos.interface';
import { convertirDatoPlaydon } from '../utils/crearElementosContexto';
import { EspecificacionProp } from '../../modelo/Entidades/especificacion/especificacion.interface';
import useEspecificacionesApi from '../../servicio/especificacion/useEspecificacionesApi';
import useCategoriasApi from '../../servicio/precio/useCategoriasApi';
import usePreciosApi from '../../servicio/precio/usePreciosApi';
import useSedesAllApi from '../../servicio/sede/useSedesAllApi';
import { PrecioProp, CategoriaProp } from '../../modelo/Entidades/precio/precio.interface';
import { EmpresaProp } from '../../modelo/Entidades/empresa/empresa.interface';
import { SedeProp } from '../../modelo/Entidades/sede/sede.interface';
import { MensajeProp } from '../../modelo/Entidades/mensaje/mensaje.interface';
import useMensajesApi from '../../servicio/mensaje/useMensajesApi';
import useSockets from '../../hooks/sockets/useSockets';
import useEmpresaApi from '../../servicio/empresa/useEmpresaApi';

import { useAutenticacion } from '../../hooks/autenticacion/useAutenticacion';
import { setMiEmpresa, setErrorMiEmpresa, setLoadingMiEmpresa } from '../state/miEmpresa.state';
import { setSedes, setErrorSedes, setLoadingSedes } from '../state/sede.state';
import { ReduxProp, ReduxSimple, ReduxSimpleElemento } from '../modelo/reduxContext.interface';
import {
  setError as setErrorEspecificaciones,
  setEspecificaciones,
  setLoading as setLoadingEspecifcaciones,
} from '../state/especificacion.state';
import { setCategorias, setErrorCategorias, setLoadingCategorias } from '../state/categoria.state';
import useCargaDatosInicialesSimplesArray from '../../hooks/respuesta/useCargaDatosInicialesSimplesArray';
import { crearPrecios } from '../state/precio.state';
import { crearMensajes } from '../state/mensaje.state';

const CargarDatosIniciales = ({ children }: AppProp) => {
  const { token } = useAutenticacion();
  
  const {
    obtenerEspecificaciones,
    responseEspecificaciones,
    loadingEspecificaciones,
    errorFetchEspecificaciones,
  } = useEspecificacionesApi();
  const { obtenerCategorias, responseCategorias, loadingCategorias, errorFetchCategorias } =
    useCategoriasApi();
  const { obtenerPrecios, responsePrecios, loadingPrecios } = usePreciosApi();
  const {
    obtenerSedes: obtenerSedesAll,
    responseSedes: responseSedesAll,
    loadingSedes: loadingSedesAll,
    errorFetchSedes: errorFetchSedesAll,
  } = useSedesAllApi();
  const { obtenerMensajes, responseMensajes, loadingMensajes } = useMensajesApi();
  const { obtenerEmpresaMia, responseEmpresa, loadingEmpresa, errorFetchEmpresa } = useEmpresaApi();

  const dispatch = useDispatch();

 
  const miEmpresa: ReduxSimpleElemento<EmpresaProp> = useSelector(
    (store: appStore) => store.miEmpresa
  );
  useCargaDatosInicialesSimplesArray({
    error: errorFetchEmpresa,
    responseElemento: responseEmpresa,
    loading: loadingEmpresa,
    obtenerBusqueda: obtenerEmpresaMia,
    dato: miEmpresa,
    setLoading: setLoadingMiEmpresa,
    setError: setErrorMiEmpresa,
    cargaInicialElemento: setMiEmpresa,
    token,
  });

  // 404 = sin empresa: no es error, se guarda null.
  useEffect(() => {
    if (!errorFetchEmpresa) return;
    if (errorFetchEmpresa.includes('404')) {
      dispatch(setMiEmpresa(null));
      dispatch(setErrorMiEmpresa(''));
      return;
    }
    dispatch(setErrorMiEmpresa(errorFetchEmpresa));
  }, [errorFetchEmpresa]);

  const especificaciones: ReduxSimple<EspecificacionProp> = useSelector(
    (store: appStore) => store.especificacion
  );
  useCargaDatosInicialesSimplesArray({
    error: errorFetchEspecificaciones,
    response: responseEspecificaciones,
    loading: loadingEspecificaciones,
    obtenerBusqueda: obtenerEspecificaciones,
    datos: especificaciones,
    setLoading: setLoadingEspecifcaciones,
    setError: setErrorEspecificaciones,
    cargaInicial: setEspecificaciones,
    token,
  });

  const categorias: ReduxSimple<CategoriaProp> = useSelector((store: appStore) => store.categoria);

  useCargaDatosInicialesSimplesArray({
    error: errorFetchCategorias,
    response: responseCategorias,
    loading: loadingCategorias,
    obtenerBusqueda: obtenerCategorias,
    datos: categorias,
    setLoading: setLoadingCategorias,
    setError: setErrorCategorias,
    cargaInicial: setCategorias,
    token,
  });

  // Evita repetir la peticion cuando el back responde 404 (sin empresa).
  const sedes: ReduxSimple<SedeProp> = useSelector((store: appStore) => store.sede);

  useCargaDatosInicialesSimplesArray({
    error: errorFetchSedesAll,
    response: responseSedesAll,
    loading: loadingSedesAll,
    obtenerBusqueda: obtenerSedesAll,
    datos: sedes,
    setLoading: setLoadingSedes,
    setError: setErrorSedes,
    cargaInicial: setSedes,
    token,
  });

  const precioItems: ReduxProp<PrecioProp> = useSelector((store: appStore) => store.precio);
  useEffect(() => {
    if (responsePrecios)
      dispatch(
        crearPrecios(
          convertirDatoPlaydon<PrecioProp>({ ...precioItems.datosIniciales, dato: responsePrecios })
        )
      );
  }, [responsePrecios]);

  const mensajeItems: ReduxProp<MensajeProp> = useSelector((store: appStore) => store.mensaje);

  useEffect(() => {
    if (responseMensajes)
      dispatch(
        crearMensajes(
          convertirDatoPlaydon<MensajeProp>({
            ...mensajeItems.datosIniciales,
            dato: responseMensajes,
          })
        )
      );
  }, [responsePrecios]);

  const {} = useSockets({});

  useEffect(() => {
    if (!token) return;
    if (!precioItems.cargaInicial && !loadingPrecios) obtenerPrecios();
    if (!mensajeItems.cargaInicial && !loadingMensajes) obtenerMensajes();
  }, [token]);

  return <>{children}</>;
};

export default CargarDatosIniciales;
