import { useDispatch } from "react-redux";
import { ReduxProp, UltimaBusquedaProp, orden } from "../../redux/modelo/reduxContext.interface";
import { RefObject, useEffect, useRef, useState } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { PaginadoProp } from "../../adaptadores/entrada/paginado.adapter";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "../../contexto/contextoModal";
import { PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { agregarItemsPedidoSeleccionadoRedux, resetSeleccionarPedido, seleccionarPedido } from "../../redux/state/pedido.state";

interface UseBuscadorPaginadoProp {
  valor: string;
  datosRedux: ReduxProp<PedidoLibroProp>;
  resetBusqueda: () => UnknownAction;
  crearBusqueda: (busqueda: UltimaBusquedaProp<PedidoLibroProp>) => UnknownAction;
  obtenerBusqueda: ({ query, limite, pagina }: BusquedaApiProp) => void;
  agregarBusqueda: (busqueda: UltimaBusquedaProp<PedidoLibroProp>) => UnknownAction;
  obtenerPedidoLibrosByPedidoId: (pedidoId: string) => Promise<void>;
  response: PaginadoProp<PedidoLibroProp> | null;
  loading: boolean;
  sortBy?: keyof PedidoLibroProp;
  sortOrder?: orden;
  limiteLetrasBusqueda?: number;
  // Clave opcional de filtros/orden. Si se define, la búsqueda se dispara aunque
  // no haya texto y se separa la cache por clave.
  claveBusqueda?: string;
}

const useBuscadorPedido = ({
  valor,
  datosRedux,
  resetBusqueda,
  crearBusqueda,
  obtenerBusqueda,
  agregarBusqueda,
  obtenerPedidoLibrosByPedidoId,
  response,
  sortBy = 'id' as keyof PedidoLibroProp,
  sortOrder = 'asc' as orden,
  limiteLetrasBusqueda = 3,
  claveBusqueda,
  loading = false,
}: UseBuscadorPaginadoProp) => {

  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const finListaRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setModal, modal } = useModalContext();

  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(valor);
    }, 500);

    return () => clearTimeout(timer);
  }, [valor]);

  useEffect(() => {
    const sinTexto = query.length < limiteLetrasBusqueda;
    if (sinTexto && !claveBusqueda) {
      dispatch(resetBusqueda());
    } else {
      const busqueda = datosRedux.ultimasBusqueda.find(
        d => d.query?.toLowerCase() === query.toLowerCase() && d.clave === claveBusqueda
      );
      if (busqueda) {
        dispatch(crearBusqueda(busqueda));
      } else {
        obtenerBusqueda({ query })
      }
    }
  }, [query, claveBusqueda])

  useEffect(() => {
    if (response && modal) {
      dispatch(agregarItemsPedidoSeleccionadoRedux(response.datos));
    }
    if (response && !modal) {
      console.log("ACTUALIZO REDUX", response.pagina);
      const claveCambio = claveBusqueda !== datosRedux.busquedaActual.clave;
      if ((query.length >= limiteLetrasBusqueda && query != datosRedux.busquedaActual.query) || claveCambio) {
        dispatch(crearBusqueda({
          query: query,
          datosQuery: response.datos,
          total: response.total,
          pagina: response.pagina,
          limite: response.limite,
          sortBy,
          sortOrder,
          clave: claveBusqueda
        }));
      } else {
        dispatch(agregarBusqueda({
          query: query,
          datosQuery: response.datos,
          total: response.total,
          pagina: response.pagina,
          limite: response.limite,
          sortBy,
          sortOrder,
          clave: claveBusqueda
        }));
      }
    }
  }, [response]);

  useEffect(() => {
    if(!modal)
    dispatch(resetSeleccionarPedido());
  }, [modal])

  const nuevoElemento = (ruta?: string) => {
    if (ruta) {
      navigate(ruta);
    } else {
      setModal(true);
    }
  }

  const handleSeleccionarItem = (item: PedidoLibroProp) => {
    obtenerPedidoLibrosByPedidoId(item.idPedido);
    setModal(true);
    dispatch(seleccionarPedido(item.pedido));
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('observer detecta:', entry.isIntersecting);

        if (!entry.isIntersecting) {
          return
        };
        if (query.length > limiteLetrasBusqueda && datosRedux.busquedaActual.query != query) {
          console.log('Corta porque no es la query actual: ', query)
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
        console.log("PIDO", {
          paginaRedux: datosRedux.busquedaActual.pagina,
          loading,
        });

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

  }, [datosRedux.busquedaActual.query, datosRedux.busquedaActual.pagina, claveBusqueda]);

  return { contenedorRef, nuevoElemento, finListaRef, handleSeleccionarItem }

}

export default useBuscadorPedido;