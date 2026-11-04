import { useDispatch, useSelector } from 'react-redux';
import { LibroProp } from '../../../../modelo/Entidades/libro/libro.interface';
import { ReduxProp, UltimaBusquedaProp } from '../../../../redux/modelo/reduxContext.interface';
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

  // La respuesta paginada no trae la query con la que se pidio, asi que se
  // guarda al disparar. El observer la usa para no pedir la pagina siguiente
  // de una busqueda vieja.
  const queryLibrosRef = useRef<string>('');
  const queryPropuestaRef = useRef<string>('');

  const pedirLibros = ({ query, limite, pagina }: BusquedaApiProp) => {
    queryLibrosRef.current = query;
    obtenerLibrosBusqueda({ query, limite, pagina });
  };

  const pedirPropuestas = ({ query, limite, pagina }: BusquedaApiProp) => {
    queryPropuestaRef.current = query;
    obtenerPropuestaBusqueda({ query, limite, pagina });
  };

  const obtenerBusqueda = ({ query }: BusquedaApiProp) => {
    // Nada cargado todavia: la primera pagina la piden los efectos de abajo.
    if (!librosDatos.cargaInicial && !propuestaDatos.cargaInicial) return;

    const librosActual = librosDatos.busquedaActual;
    if (
      librosHabilitados &&
      librosDatos.cargaInicial &&
      queryLibrosRef.current === query &&
      librosActual.pagina * librosActual.limite < librosActual.total
    ) {
      pedirLibros({ query, pagina: librosActual.pagina + 1, limite: librosActual.limite });
    }

    const propuestaActual = propuestaDatos.busquedaActual;
    if (
      propuestasHabilitadas &&
      propuestaDatos.cargaInicial &&
      queryPropuestaRef.current === query &&
      propuestaActual.pagina * propuestaActual.limite < propuestaActual.total
    ) {
      pedirPropuestas({
        query,
        pagina: propuestaActual.pagina + 1,
        limite: propuestaActual.limite,
      });
    }
  };

  const { query } = useBuscadorQuery({
    valor,
    limiteLetrasBusqueda,
    paginado: true,
    obtenerBusqueda,
  });

  useEffect(() => {
    if (!modal) {
      dispatch(resetSeleccionarPropuesta());
    }
  }, [modal]);

  // Carga inicial: una sola vez por montaje y por toggle. `cargaInicial` y
  // `query` no van en las deps a proposito: si estuvieran, cada respuesta (o
  // cada tecla) volveria a disparar el pedido y quedarian requests duplicados.
  useEffect(() => {
    if (librosHabilitados && !librosDatos.cargaInicial) {
      pedirLibros({ query });
    }
    if (propuestasHabilitadas && !propuestaDatos.cargaInicial) {
      pedirPropuestas({ query });
    }
  }, [opcionesActivas]);

  // El reset depende solo de `query`: con `opcionesActivas` en las deps,
  // cambiar el toggle con la query corta reseteaba las dos entidades, incluida
  // la que no se toco, y se perdian la pagina acumulada y el scroll de la otra
  // lista.
  useEffect(() => {
    if (query.length >= limiteLetrasBusqueda) return;

    queryLibrosRef.current = '';
    queryPropuestaRef.current = '';
    dispatch(resetBusquedaLibro());
    dispatch(resetBusquedaPropuesta());
  }, [query]);

  // Si se escribe antes de que responda la carga inicial, la busqueda dispara
  // igual y su respuesta llega con `cargaInicial` en false: los effects de
  // respuesta caen en la rama `crearLibros` y pisan `datosIniciales` con un
  // resultado de query. El guard por entidad junto con `cargaInicial` en las
  // deps hace que la busqueda pendiente corra justo despues de la carga
  // inicial en vez de competir con ella.
  useEffect(() => {
    if (query.length < limiteLetrasBusqueda) return;

    // Si esta entidad ya se pidio con esta misma query (o se siguio paginando
    // con ella), el cambio de toggle no debe volver a disparar la busqueda.
    if (librosHabilitados && librosDatos.cargaInicial && queryLibrosRef.current !== query) {
      const busqueda = librosDatos.ultimasBusqueda.find(
        (d) => d.query?.toLowerCase() === query.toLowerCase()
      );
      if (busqueda) {
        queryLibrosRef.current = query;
        dispatch(crearBusquedaLibro(busqueda));
      } else {
        pedirLibros({ query });
      }
    }

    if (
      propuestasHabilitadas &&
      propuestaDatos.cargaInicial &&
      queryPropuestaRef.current !== query
    ) {
      const busquedaPropuesta = propuestaDatos.ultimasBusqueda.find(
        (d) => d.query?.toLowerCase() === query.toLowerCase()
      );
      if (busquedaPropuesta) {
        queryPropuestaRef.current = query;
        dispatch(crearBusquedaPropuesta(busquedaPropuesta));
      } else {
        pedirPropuestas({ query });
      }
    }
  }, [query, opcionesActivas, librosDatos.cargaInicial, propuestaDatos.cargaInicial]);

  useEffect(() => {
    if (!responseLibros) return;
    const respuestaDtoLibro: UltimaBusquedaProp<LibroProp> = {
      ...librosDatos.busquedaActual,
      ...responseLibros,
      datosQuery: responseLibros.datos,
    };

    if (!librosDatos.cargaInicial) {
      dispatch(crearLibros(respuestaDtoLibro));
      return;
    }
    if (responseLibros.pagina === 1) {
      dispatch(crearBusquedaLibro(respuestaDtoLibro));
    } else {
      dispatch(agregarLibrosBusquedaActual(respuestaDtoLibro));
    }
  }, [responseLibros]);

  useEffect(() => {
    if (!responsePropuestas) return;
    const respuestaDtoPropuestas: UltimaBusquedaProp<PropuestaProp> = {
      ...propuestaDatos.busquedaActual,
      ...responsePropuestas,
      datosQuery: responsePropuestas.datos,
    };

    if (!propuestaDatos.cargaInicial) {
      dispatch(crearPropuestas(respuestaDtoPropuestas));
      return;
    }
    if (responsePropuestas.pagina === 1) {
      dispatch(crearBusquedaPropuesta(respuestaDtoPropuestas));
    } else {
      dispatch(agregarPropuestasBusquedaActual(respuestaDtoPropuestas));
    }
  }, [responsePropuestas]);

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
