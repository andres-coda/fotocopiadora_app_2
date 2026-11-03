import { useDispatch, useSelector } from 'react-redux';
import { LibroProp } from '../../../../modelo/Entidades/libro/libro.interface';
import { ReduxProp, UltimaBusquedaProp } from '../../../../redux/modelo/reduxContext.interface';
import { appStore } from '../../../../redux/store';
import useLibrosApi from '../../../../servicio/libro/useLibrosApi';
import { useEffect } from 'react'; import {
  agregarLibrosBusquedaActual,
  crearBusquedaLibro,
  crearLibros,
  resetBusquedaLibro,
  resetSeleccionarLibro,
  seleccionarLibro,
} from '../../../../redux/state/libro.state';
import { PropuestaProp } from '../../../../modelo/Entidades/propuesta/propuesta.interface';
import usePropuestasApi from '../../../../servicio/propuesta/usePropuestasApi';
import {
  agregarPropuestasBusquedaActual,
  crearBusquedaPropuesta,
  crearPropuestas,
  resetBusquedaPropuesta,
  resetSeleccionarPropuesta,
} from '../../../../redux/state/propuesta.state';
import { listaLibroPropuestaSeleccionable } from '../util/funcionesAdicionales';
import { rutaPrivadaBase, RutasPrivadas } from '../../../rutas/rutasPrivadas';
import { useModalContext } from '../../../../contexto/contextoModal';
import { useNavigate } from 'react-router-dom';
import useBuscadorQuery from '../../../../hooks/buscador/useBuscadorQuery';
import { BusquedaApiProp } from '../../../../modelo/HTTP/peticiones.interface';
import useFinPagina from '../../../../hooks/finPagina/useFinPagina';
import { busquedaReduxInicial } from '../../../../redux/utils/reduxInicial';

interface BuscadorLibroProp {
  opcionesActivas: string[];
  valor: string;
}

const limiteLetrasBusqueda = 3;

const useBuscadorLibro = ({ opcionesActivas, valor }: BuscadorLibroProp) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setModal, modal } = useModalContext();

  useEffect(() => {
    dispatch(resetSeleccionarLibro());
  }, []);

  const librosDatos: ReduxProp<LibroProp> = useSelector((store: appStore) => store.libro);
  const propuestaDatos: ReduxProp<PropuestaProp> = useSelector(
    (store: appStore) => store.propuesta
  );

  const { obtenerLibrosBusqueda, responseLibros, loadingLibros, errorFetchLibros } = useLibrosApi();
  const { obtenerPropuestaBusqueda, responsePropuestas, loadingPropuestas, errorFetchPropuestas } = usePropuestasApi();

  const obtenerBusqueda = ({ query }: BusquedaApiProp) => {
    if (
      (opcionesActivas.includes(listaLibroPropuestaSeleccionable[0].nombre) || opcionesActivas.includes(listaLibroPropuestaSeleccionable[2].nombre)) &&
      (librosDatos.busquedaActual.total !== 0 && librosDatos.busquedaActual.limite * librosDatos.busquedaActual.pagina < librosDatos.busquedaActual.total)
    ) {
      obtenerLibrosBusqueda({ query, pagina: librosDatos.busquedaActual.pagina + 1, limite: librosDatos.busquedaActual.limite })
    }
    if (
      (opcionesActivas.includes(listaLibroPropuestaSeleccionable[0].nombre) || opcionesActivas.includes(listaLibroPropuestaSeleccionable[1].nombre)) &&
      (propuestaDatos.busquedaActual.total !== 0 && propuestaDatos.busquedaActual.limite * propuestaDatos.busquedaActual.pagina < propuestaDatos.busquedaActual.total)
    ) {
      obtenerPropuestaBusqueda({ query, pagina: propuestaDatos.busquedaActual.pagina + 1, limite: propuestaDatos.busquedaActual.limite })
    }
  }
  const { query } = useBuscadorQuery({ valor, limiteLetrasBusqueda, paginado: true, obtenerBusqueda });

  useEffect(() => {
    if (!modal) {
      dispatch(resetSeleccionarPropuesta());
    }
  }, [modal]);

  useEffect(() => {
    if (!propuestaDatos.cargaInicial && !opcionesActivas.includes(listaLibroPropuestaSeleccionable[2].nombre)) {
      obtenerPropuestaBusqueda({ query });
    }
    if (!librosDatos.cargaInicial && !opcionesActivas.includes(listaLibroPropuestaSeleccionable[1].nombre)) {
      obtenerLibrosBusqueda({ query });
    }
  }, [propuestaDatos.cargaInicial, librosDatos.cargaInicial, opcionesActivas]);

  useEffect(() => {
    if (query.length < limiteLetrasBusqueda) {
      dispatch(resetBusquedaLibro());
      dispatch(resetBusquedaPropuesta());
    } else {
      const busqueda = librosDatos.ultimasBusqueda.find(
        d => d.query?.toLowerCase() === query.toLowerCase()
      );
      const busquedaPropuesta = propuestaDatos.ultimasBusqueda.find(
        d => d.query?.toLowerCase() === query.toLowerCase()
      );
      if (busqueda) {
        dispatch(crearBusquedaLibro(busqueda));
      } else {
        obtenerLibrosBusqueda({ query })
      }
      if (busquedaPropuesta) {
        dispatch(crearBusquedaPropuesta(busquedaPropuesta))
      } else {
        obtenerPropuestaBusqueda({ query })
      }

    }
  }, [query, opcionesActivas]);

  useEffect(() => {
    if (!responseLibros) return
    const respuestaDtoLibro: UltimaBusquedaProp<LibroProp> = {
      ...librosDatos.busquedaActual, ...responseLibros,
      datosQuery: responseLibros.datos,
    };

    if (!librosDatos.cargaInicial) {
      dispatch(crearLibros(respuestaDtoLibro))
      return
    }
    if (responseLibros.pagina === 1) {
      dispatch(crearBusquedaLibro(respuestaDtoLibro));
    } else {
      dispatch(agregarLibrosBusquedaActual(respuestaDtoLibro));
    }
  }, [responseLibros]);

  useEffect(() => {
    if (!responsePropuestas) return
    const respuestaDtoPropuestas: UltimaBusquedaProp<PropuestaProp> = {
      ...propuestaDatos.busquedaActual, ...responsePropuestas,
      datosQuery: responsePropuestas.datos,
    };

    if (!propuestaDatos.cargaInicial) {
      dispatch(crearPropuestas(respuestaDtoPropuestas))
      return
    }
    if (responsePropuestas.pagina === 1) {
      dispatch(crearBusquedaPropuesta(respuestaDtoPropuestas));
    } else {
      dispatch(agregarPropuestasBusquedaActual(respuestaDtoPropuestas));
    }
  }, [responsePropuestas]);

  const datos: UltimaBusquedaProp<LibroProp | PropuestaProp> = busquedaReduxInicial('nombre')

  const { contenedorRef, finListaRef } = useFinPagina<LibroProp | PropuestaProp>({
    query,
    loading: loadingLibros || loadingPropuestas,
    datos,
    obtenerBusqueda: obtenerBusqueda,
  });

  const handleNuevoElemento = () => {
    if (opcionesActivas.includes(listaLibroPropuestaSeleccionable[1].nombre)) {
      navigate(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PROPUESTA_CARGAR}`);
    } else {
      setModal(true);
    }
  };

  const libros: LibroProp[] = !opcionesActivas.includes(listaLibroPropuestaSeleccionable[1].nombre)
    ? (librosDatos?.busquedaActual?.datosQuery ?? [])
    : [];

  const propuestas: PropuestaProp[] = !opcionesActivas.includes(
    listaLibroPropuestaSeleccionable[2].nombre
  )
    ? (propuestaDatos?.busquedaActual?.datosQuery ?? [])
    : [];

  const esVacio = (): string | undefined => {
    if (
      librosDatos.cargaInicial &&
      propuestaDatos.cargaInicial &&
      (libros.length === 0 &&
        propuestas.length === 0 &&
        opcionesActivas.includes(listaLibroPropuestaSeleccionable[0].nombre))
    )
      return 'libros y propuestas';

    if (
      librosDatos.cargaInicial &&
      libros.length === 0 && opcionesActivas.includes(listaLibroPropuestaSeleccionable[2].nombre))
      return 'libros';

    if (
      propuestaDatos.cargaInicial &&
      propuestas.length === 0 && opcionesActivas.includes(listaLibroPropuestaSeleccionable[1].nombre))
      return 'propuestas';

    return undefined;
  };

  const selectLibro = (libro: LibroProp) => {
      dispatch(seleccionarLibro(libro));
      navigate(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`);
    };

  return {
    handleNuevoElemento,
    contenedorRef,
    libros,
    propuestas,
    finListaRef,
    propuesta: propuestaDatos.datoSeleccionado,
    esVacio,
    errorFetchLibros,
    errorFetchPropuestas,
    selectLibro
  };
};

export default useBuscadorLibro;
