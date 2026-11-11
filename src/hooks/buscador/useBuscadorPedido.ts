import { useDispatch, useSelector } from 'react-redux';
import { UltimaBusquedaProp } from '../../redux/modelo/reduxContext.interface';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '../../contexto/contextoModal';
import { PedidoLibroProp } from '../../modelo/Entidades/pedido_libro/pedidoLibro.interface';
import {
  agregarItemsPedidoSeleccionadoRedux,
  resetSeleccionarPedido,
  seleccionarPedido,
} from '../../redux/state/pedido.state';
import useBuscadorQuery from './useBuscadorQuery';
import { agregarPedidoLibrosBusquedaActual, crearBusquedaPedidoLibro, PedidoLibroStateProp, resetBusquedaPedidoLibro } from '../../redux/state/pedido_libro.state';
import { appStore } from '../../redux/store';
import usePedidoLibrosApi from '../../servicio/pedido_libro/usePedidoLibrosApi';
import { rutaBase, RutasPrivadas } from '../../privado/rutas/rutasPrivadas';
import useFinPagina from '../finPagina/useFinPagina';
import { busquedaQueryParams } from '../../utils/busquedaQueryParams';

interface UseBuscadorPaginadoProp {
  valor: string;
}

const limiteLetrasBusqueda = 3;

const useBuscadorPedido = ({
  valor,
}: UseBuscadorPaginadoProp) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setModal, modal } = useModalContext();

  const items: PedidoLibroStateProp = useSelector((store: appStore) => store.pedidoLibro);

  const {
    obtenerItemsBusqueda,
    obtenerPedidoLibrosByPedidoId,
    responsePedidoLibross,
    loadingPedidoLibross,
    errorFetchPedidoLibross,
  } = usePedidoLibrosApi();

  const { query } = useBuscadorQuery({ valor, obtenerBusqueda:obtenerItemsBusqueda, limiteLetrasBusqueda, paginado: true });

  const filtros = items.filtrosPedidoLibro;
  const orden = items.ordenPedidoLibro;
  const hayFiltros =
    filtros.estado.length > 0 ||
    filtros.especificaciones.length > 0 ||
    !!filtros.entrega ||
    !!filtros.tomado;
  const ordenNoEsDefault = !(
    orden.length === 1 &&
    orden[0].campo === 'fechaEntrega' &&
    orden[0].direccion === 'asc'
  );

  const claveBusqueda =
      hayFiltros || ordenNoEsDefault ? busquedaQueryParams(filtros, orden) : undefined;
  
  useEffect(()=>{
    if(!items.cargaInicial){
      obtenerItemsBusqueda({query:''});
    }
  },[items.cargaInicial])


  useEffect(() => {
    if (query.length < limiteLetrasBusqueda && !claveBusqueda) {
      dispatch(resetBusquedaPedidoLibro());
    } else {
      const busqueda = items.ultimasBusqueda.find(
        d => d.query?.toLowerCase() === query.toLowerCase() && d.clave === claveBusqueda
      );
      if (busqueda) {
        dispatch(crearBusquedaPedidoLibro(busqueda));
      } else {
        obtenerItemsBusqueda({ query });
      }
    }
  }, [query, claveBusqueda]);

  useEffect(() => {
    if (!responsePedidoLibross) return;

    if (modal) {
      dispatch(agregarItemsPedidoSeleccionadoRedux(responsePedidoLibross.datos));
      return;
    }

    const queryActual = items.busquedaActual.query ?? '';
    const mismaQuery = queryActual === query;
    const mismaClave = items.busquedaActual.clave === claveBusqueda;
    // Solo la página 2 o posterior de la MISMA búsqueda se acumula. Cualquier
    // página 1, o una respuesta de otra búsqueda, reemplaza la lista: así un
    // filtro nuevo pisa lo anterior en lugar de sumarse a lo que había.
    const acumular = responsePedidoLibross.pagina > 1 && mismaQuery && mismaClave;

    const busqueda: UltimaBusquedaProp<PedidoLibroProp> = {
      query,
      datosQuery: responsePedidoLibross.datos,
      total: responsePedidoLibross.total,
      pagina: responsePedidoLibross.pagina,
      limite: responsePedidoLibross.limite,
      sortBy: 'id' as keyof PedidoLibroProp,
      sortOrder: 'asc',
      clave: claveBusqueda,
    };

    dispatch(acumular ? agregarPedidoLibrosBusquedaActual(busqueda) : crearBusquedaPedidoLibro(busqueda));
  }, [responsePedidoLibross]);

  useEffect(() => {
    if (!modal) dispatch(resetSeleccionarPedido());
  }, [modal]);

  const nuevoElemento = () => {
    navigate(`/${rutaBase.PRIVADO}/${RutasPrivadas.PEDIDO_CARGAR}`)
  };

  const handleSeleccionarItem = (item: PedidoLibroProp) => {
    obtenerPedidoLibrosByPedidoId(item.idPedido);
    setModal(true);
    dispatch(seleccionarPedido(item.pedido));
  };

  const {contenedorRef, finListaRef} = useFinPagina<PedidoLibroProp>({
    query, 
    loading:loadingPedidoLibross,
    datos: items.busquedaActual,
    obtenerBusqueda: obtenerItemsBusqueda,
    claves: items.busquedaActual.clave !== claveBusqueda
  })

  return { contenedorRef, nuevoElemento, finListaRef, handleSeleccionarItem, error: errorFetchPedidoLibross, items, loading:loadingPedidoLibross };
};

export default useBuscadorPedido;
