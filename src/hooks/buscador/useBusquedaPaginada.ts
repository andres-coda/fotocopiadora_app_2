import { useDispatch } from "react-redux";
import { orden, ReduxProp, UltimaBusquedaProp } from "../../redux/modelo/reduxContext.interface";
import { RefObject, useEffect, useRef, useState } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { PaginadoProp } from "../../adaptadores/entrada/paginado.adapter";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "../../contexto/contextoModal";

interface UseBuscadorPaginadoProp<T> {
  valor: string;
  datosRedux: ReduxProp<T>;
  resetBusqueda: () => UnknownAction;
  crearBusqueda: (busqueda: UltimaBusquedaProp<T>) => UnknownAction;
  obtenerBusqueda: ({ query, limite, pagina }: BusquedaApiProp) => void;
  agregarBusqueda: (busqueda: UltimaBusquedaProp<T>) => UnknownAction;
  response: PaginadoProp<T> | null;
  loading: boolean;
  orden?: orden;
  limiteLetrasBusqueda?: number;
}

const useBusquedaPaginada = <T>({
  valor,
  datosRedux,
  resetBusqueda,
  crearBusqueda,
  obtenerBusqueda,
  agregarBusqueda,
  response,
  orden = 'asc',
  limiteLetrasBusqueda = 3,
  loading = false,
}: UseBuscadorPaginadoProp<T>) => {

  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const finListaRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { setModal } = useModalContext();
  const [finLista, setFinLista] = useState<boolean>(false)

  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(valor);
    }, 500);

    return () => clearTimeout(timer);
  }, [valor]);

  useEffect(() => {
    if (query.length < limiteLetrasBusqueda) {
      dispatch(resetBusqueda());
    } else {
      const busqueda = datosRedux.ultimasBusqueda.find(
        d => d.query?.toLowerCase() === query.toLowerCase()
      );
      if (busqueda) {
        dispatch(crearBusqueda(busqueda));
      } else {
        obtenerBusqueda({ query })
      }
    }
  }, [query])

  useEffect(() => {
    if (response) {
      console.log('fin lista: ', finLista)
      if (!finLista) {
        dispatch(crearBusqueda({
          query: query,
          datosQuery: response.datos,
          total: response.total,
          pagina: response.pagina,
          limite: response.limite,
          orden
        }));
      } else {
        dispatch(agregarBusqueda({
          query: query,
          datosQuery: response.datos,
          total: response.total,
          pagina: response.pagina,
          limite: response.limite,
          orden
        }));
      }
    }
  }, [response]);

  const nuevoElemento = (ruta?: string) => {
    if (ruta) {
      navigate(ruta);
    } else {
      setModal(true);
    }

  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('observer detecta:', entry.isIntersecting);

        if (!entry.isIntersecting) return;
        if(query.length > limiteLetrasBusqueda && datosRedux.busquedaActual.query != query) {
          console.log('Corta porque no es la query actual: ',query)
          return
        }
        if (loading) {
          console.log('CORTO POR LOADING');
          return;
        }
        if (
          datosRedux.busquedaActual.pagina *
          datosRedux.busquedaActual.limite >=
          datosRedux.busquedaActual.total
        ) {
          console.log('que datosRedux estoy pasando: ', datosRedux)
          console.log('limite: ', datosRedux.busquedaActual.limite);
          console.log('pagina: ', datosRedux.busquedaActual.pagina);
          console.log('total: ', datosRedux.busquedaActual.total);
          
          console.log('CORTO PORQUE NO HAY MAS PAGINAS');
          return;
        }
        console.log(
          'LLAMO PAGINA:',
          datosRedux.busquedaActual.pagina + 1
        );

        setFinLista(true);

        obtenerBusqueda({
          pagina: datosRedux.busquedaActual.pagina + 1,
          limite: datosRedux.busquedaActual.limite,
          query,
        });

      },
      {
        root: contenedorRef.current,
        threshold: 0.2,
      }
    );

    if (finListaRef.current) {
      observer.observe(finListaRef.current);
    } else {
      console.log('NO HAY ELEMENTO PARA OBSERVAR');
    }

    return () => observer.disconnect();

  }, [datosRedux.busquedaActual.pagina]);

  return { contenedorRef, nuevoElemento, finListaRef }

}

export default useBusquedaPaginada;