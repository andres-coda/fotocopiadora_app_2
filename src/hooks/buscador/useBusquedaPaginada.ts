import { useDispatch } from 'react-redux';
import { ReduxProp, UltimaBusquedaProp } from '../../redux/modelo/reduxContext.interface';
import { useEffect } from 'react';
import { ActionCreatorWithPayload, UnknownAction } from '@reduxjs/toolkit';
import { BusquedaApiProp } from '../../modelo/HTTP/peticiones.interface';
import { PaginadoProp } from '../../adaptadores/entrada/paginado.adapter';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '../../contexto/contextoModal';
import useFinPaginaRedux from '../finPagina/useFinPaginaRedux';
import useBuscadorQuery from './useBuscadorQuery';

interface UseBuscadorPaginadoProp<T> {
  valor: string;
  datosRedux: ReduxProp<T>;
  resetBusqueda: () => UnknownAction;
  crearBusqueda: ActionCreatorWithPayload<UltimaBusquedaProp<T>>;
  crearBusquedaInicial?: ActionCreatorWithPayload<UltimaBusquedaProp<T>>;
  obtenerBusqueda: ({ query, limite, pagina }: BusquedaApiProp) => void;
  agregarBusqueda: ActionCreatorWithPayload<UltimaBusquedaProp<T>>;
  response: PaginadoProp<T> | null;
  loading: boolean;
  limiteLetrasBusqueda?: number;
}

const useBusquedaPaginada = <T>({
  valor,
  datosRedux,
  resetBusqueda,
  crearBusqueda,
  obtenerBusqueda,
  agregarBusqueda,
  crearBusquedaInicial = undefined,
  response,
  limiteLetrasBusqueda = 3,
  loading = false,
}: UseBuscadorPaginadoProp<T>) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setModal } = useModalContext();

  const { query } = useBuscadorQuery({ valor, obtenerBusqueda, limiteLetrasBusqueda, paginado: true });

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
        obtenerBusqueda({ query });
      }
    }
  }, [query]);

  const nuevoElemento = (ruta?: string) => {
    if (ruta) {
      navigate(ruta);
    } else {
      setModal(true);
    }
  };

  const { finListaRef, contenedorRef } = useFinPaginaRedux({
    datos: datosRedux.busquedaActual,
    query,
    loading,
    limiteLetrasBusqueda,
    response,
    crearBusquedaRedux: crearBusqueda,
    crearBusquedaInicial,
    obtenerBusqueda,
    actualizarBusquedaRedux: agregarBusqueda,
    cargaInicial: !datosRedux.cargaInicial
  })

  return { contenedorRef, nuevoElemento, finListaRef };
};

export default useBusquedaPaginada;
