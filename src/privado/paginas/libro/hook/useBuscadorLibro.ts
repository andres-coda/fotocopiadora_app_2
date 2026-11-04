import { useDispatch, useSelector } from 'react-redux';
import { LibroProp } from '../../../../modelo/Entidades/libro/libro.interface';
import { ReduxProp } from '../../../../redux/modelo/reduxContext.interface';
import { appStore } from '../../../../redux/store';
import useLibrosApi from '../../../../servicio/libro/useLibrosApi';
import { RefObject, useEffect, useRef } from 'react';
import {
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
import { nombreLibroXstring } from '../../../../utils/formatoDatos';
import useGestionResponse from '../../../../hooks/respuesta/useGestionRespuesta';
import useGestionPeticion from '../../../../hooks/respuesta/useGestionPeticion';

interface BuscadorLibroProp {
  opcionesActivas: string[];
  valor: string;
}

type PropuestaLibro = 'propuesta' | 'libro';

interface DatosArrayProp {
  dato: LibroProp | PropuestaProp;
  tipo: PropuestaLibro;
}

// Se arma una sola vez: localeCompare con locale construye un collator en cada
// llamada y esto corre en cada render.
const collator = new Intl.Collator('es', { sensitivity: 'base' });

// Los libros muestran nombre + nivel + componentes, las propuestas solo nombre.
const nombreOrden = (item: DatosArrayProp): string =>
  item.tipo === 'libro'
    ? nombreLibroXstring(item.dato as LibroProp)
    : (item.dato as PropuestaProp).nombre;

// Un solo orden alfabetico sobre el nombre visible, sin importar el tipo.
// Se deduplica por `tipo + id`: si una pagina se pidio dos veces, el mismo
// libro queda repetido en `datosQuery` y dos children con la misma key dejan
// nodos viejos montados en el DOM.
const unirPropuestaLibros = (libros: LibroProp[], propuestas: PropuestaProp[]): DatosArrayProp[] => {
  const porClave = new Map<string, DatosArrayProp>();

  libros.forEach((libro) => porClave.set(`libro-${libro.id}`, { dato: libro, tipo: 'libro' }));
  propuestas.forEach((propuesta) =>
    porClave.set(`propuesta-${propuesta.id}`, { dato: propuesta, tipo: 'propuesta' })
  );

  return [...porClave.values()].sort((a, b) => collator.compare(nombreOrden(a), nombreOrden(b)));
};

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

  // Que entidades entran en la lista segun el toggle.
  const librosHabilitados = !opcionesActivas.includes(listaLibroPropuestaSeleccionable[1].nombre);
  const propuestasHabilitadas = !opcionesActivas.includes(
    listaLibroPropuestaSeleccionable[2].nombre
  );

  // `datos` es solo de render: se deriva de Redux en cada render, sin estado
  // propio, asi nunca queda un render atrasado respecto de busquedaActual.
  const libros: LibroProp[] = librosHabilitados
    ? librosDatos.busquedaActual.datosQuery ?? []
    : [];
  const propuestas: PropuestaProp[] = propuestasHabilitadas
    ? propuestaDatos.busquedaActual.datosQuery ?? []
    : [];
  const datos = unirPropuestaLibros(libros, propuestas);

  const { obtenerLibrosBusqueda, responseLibros, loadingLibros, errorFetchLibros } = useLibrosApi();
  const { obtenerPropuestaBusqueda, responsePropuestas, loadingPropuestas, errorFetchPropuestas } =
    usePropuestasApi();

  // Ref de la query VIGENTE (la que escribe el usuario). El hook de respuesta
  // compara response.query (echo del back) contra este para descartar stale.
  const queryActualLibrosRef = useRef<string>('');
  const queryActualPropuestaRef = useRef<string>('');

  const { queryRef: queryLibrosRef } = useGestionPeticion<LibroProp>({
    datos: librosDatos,
    obtenerBusqueda: obtenerLibrosBusqueda,
    query: queryActualLibrosRef.current,
    limiteLetrasBusqueda,
    resetearBusqueda: resetBusquedaLibro,
    crearBusqueda: crearBusquedaLibro,
    condicion: !librosHabilitados
  });

  const { queryRef: queryPropuestaRef } = useGestionPeticion<PropuestaProp>({
    datos: propuestaDatos,
    obtenerBusqueda: obtenerPropuestaBusqueda,
    query: queryActualLibrosRef.current,
    limiteLetrasBusqueda,
    resetearBusqueda: resetBusquedaPropuesta,
    crearBusqueda: crearBusquedaPropuesta,
    condicion: !propuestasHabilitadas
  });

  const obtenerBusqueda = ({ query }: BusquedaApiProp) => {
    // Nada cargado todavia: la primera pagina la piden los efectos de abajo.
    if (!librosDatos.cargaInicial && !propuestaDatos.cargaInicial) return;

    if (
      librosHabilitados &&
      librosDatos.cargaInicial &&
      queryLibrosRef.current === query &&
      librosDatos.busquedaActual.pagina * librosDatos.busquedaActual.limite < librosDatos.busquedaActual.total
    ) {
      obtenerLibrosBusqueda({ query, pagina: librosDatos.busquedaActual.pagina + 1, limite: librosDatos.busquedaActual.limite });
    }

    if (
      propuestasHabilitadas &&
      propuestaDatos.cargaInicial &&
      queryPropuestaRef.current === query &&
      propuestaDatos.busquedaActual.pagina * propuestaDatos.busquedaActual.limite < propuestaDatos.busquedaActual.total
    ) {
      obtenerPropuestaBusqueda({
        query,
        pagina: propuestaDatos.busquedaActual.pagina + 1,
        limite: propuestaDatos.busquedaActual.limite,
      });
    }
  };

  const { query } = useBuscadorQuery({
    valor,
    limiteLetrasBusqueda,
    paginado: true,
    obtenerBusqueda,
  });

  // La query vigente se guarda en un ref para que el hook de respuesta pueda
  // compararla contra el echo del back sin depender de un ref de request.
  queryActualLibrosRef.current = query;
  queryActualPropuestaRef.current = query;

  useEffect(() => {
    if (!modal) {
      dispatch(resetSeleccionarPropuesta());
      dispatch(resetSeleccionarLibro());
    }
  }, [modal]);

  useGestionResponse<LibroProp>({
    datos: librosDatos,
    response: responseLibros,
    query,
    crearDatos: crearLibros,
    crearBusqueda: crearBusquedaLibro,
    agregarBusqueda: agregarLibrosBusquedaActual
  });

  useGestionResponse<PropuestaProp>({
    datos: propuestaDatos,
    response: responsePropuestas,
    query,
    crearDatos: crearPropuestas,
    crearBusqueda: crearBusquedaPropuesta,
    agregarBusqueda: agregarPropuestasBusquedaActual
  });

  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const finListaRef = useRef<HTMLDivElement>(null);

  const loadingRefLibro = useRef(loadingLibros);
  const loadingRefPropuesta = useRef(loadingPropuestas);
  loadingRefLibro.current = loadingLibros;
  loadingRefPropuesta.current = loadingPropuestas;

  // El observer solo dispara `obtenerBusqueda`, que ya decide si hay pagina
  // siguiente y si corresponde a la query actual. Se guarda en un ref para que
  // el observer use siempre la ultima version: si dependiera de los flags del
  // toggle, cada cambio de opcion lo recrearia y el callback inicial pediria
  // una pagina de mas.
  const obtenerBusquedaRef = useRef(obtenerBusqueda);
  obtenerBusquedaRef.current = obtenerBusqueda;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (loadingRefLibro.current || loadingRefPropuesta.current) return;

        obtenerBusquedaRef.current({ query });
      },
      {
        root: contenedorRef.current,
        threshold: 0.2,
      }
    );

    if (finListaRef.current) {
      observer.observe(finListaRef.current);
    }

    return () => observer.disconnect();
  }, [
    query,
    librosDatos.cargaInicial,
    propuestaDatos.cargaInicial,
    librosDatos.busquedaActual.pagina,
    propuestaDatos.busquedaActual.pagina,
    librosDatos.busquedaActual.total,
    propuestaDatos.busquedaActual.total,
  ]);

  const handleNuevoElemento = () => {
    if (opcionesActivas.includes(listaLibroPropuestaSeleccionable[1].nombre)) {
      navigate(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PROPUESTA_CARGAR}`);
    } else {
      setModal(true);
    }
  };

  const esVacio = (): string | undefined => {
    if (
      librosDatos.cargaInicial &&
      propuestaDatos.cargaInicial &&
      libros.length === 0 &&
      propuestas.length === 0 &&
      opcionesActivas.includes(listaLibroPropuestaSeleccionable[0].nombre)
    )
      return 'libros y propuestas';

    if (
      librosDatos.cargaInicial &&
      libros.length === 0 &&
      opcionesActivas.includes(listaLibroPropuestaSeleccionable[2].nombre)
    )
      return 'libros';

    if (
      propuestaDatos.cargaInicial &&
      propuestas.length === 0 &&
      opcionesActivas.includes(listaLibroPropuestaSeleccionable[1].nombre)
    )
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
    datos,
    finListaRef,
    propuesta: propuestaDatos.datoSeleccionado,
    esVacio,
    errorFetchLibros,
    errorFetchPropuestas,
    selectLibro,
    loadingLibros,
    loadingPropuestas,
  };
};

export default useBuscadorLibro;
