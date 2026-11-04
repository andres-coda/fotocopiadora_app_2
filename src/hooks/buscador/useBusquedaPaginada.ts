import { ReduxProp, UltimaBusquedaProp } from '../../redux/modelo/reduxContext.interface';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { BusquedaApiProp } from '../../modelo/HTTP/peticiones.interface';
import { PaginadoProp } from '../../adaptadores/entrada/paginado.adapter';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '../../contexto/contextoModal';
import useBuscadorQuery from './useBuscadorQuery';
import useGestionPeticion from '../respuesta/useGestionPeticion';
import { HasId } from '../../modelo/general/hasId.interface';
import useGestionResponse from '../respuesta/useGestionRespuesta';
import useFinPagina from '../finPagina/useFinPagina';

interface UseBuscadorPaginadoProp<T> {
  valor: string;
  datosRedux: ReduxProp<T>;
  resetBusqueda: ActionCreatorWithoutPayload;
  crearBusqueda: ActionCreatorWithPayload<UltimaBusquedaProp<T>>;
  crearBusquedaInicial?: ActionCreatorWithPayload<UltimaBusquedaProp<T>>;
  obtenerBusqueda: ({ query, limite, pagina }: BusquedaApiProp) => void;
  agregarBusqueda: ActionCreatorWithPayload<UltimaBusquedaProp<T>>;
  response: PaginadoProp<T> | null;
  loading: boolean;
  limiteLetrasBusqueda?: number;
}

const useBusquedaPaginada = <T extends HasId>({
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
  const navigate = useNavigate();
  const { setModal } = useModalContext();

  const { query } = useBuscadorQuery({ valor, obtenerBusqueda, limiteLetrasBusqueda, paginado: true });

  const { queryRef } = useGestionPeticion<T>({
    datos: datosRedux,
    obtenerBusqueda: obtenerBusqueda,
    query: query,
    limiteLetrasBusqueda,
    resetearBusqueda: resetBusqueda,
    crearBusqueda: crearBusqueda,
  });

  useGestionResponse<T>({
    datos:datosRedux,
    response,
    query:queryRef.current,
    crearDatos: crearBusquedaInicial,
    crearBusqueda,
    agregarBusqueda,
  })

  const nuevoElemento = (ruta?: string) => {
    if (ruta) {
      navigate(ruta);
    } else {
      setModal(true);
    }
  };

  const {finListaRef, contenedorRef} = useFinPagina({
    datos:datosRedux.busquedaActual, 
    query, 
    loading, 
    limiteLetrasBusqueda, 
    cargaInicial: !datosRedux.cargaInicial, 
    obtenerBusqueda
  })

  return { contenedorRef, nuevoElemento, finListaRef };
};

export default useBusquedaPaginada;
