import { useSelector } from 'react-redux';
import { appStore } from '../../../redux/store';
import usePedidoLibrosApi from '../../../servicio/pedido_libro/usePedidoLibrosApi';
import { useEffect, useState } from 'react';
import {
  agregarPedidoLibrosBusquedaActual,
  crearBusquedaPedidoLibro,
  resetBusquedaPedidoLibro,
  PedidoLibroStateProp,
} from '../../../redux/state/pedido_libro.state';
import BuscadorPaginadoCompleto from '../../../componente/buscador/buscadorPaginadoCompleto';
import { rutaPrivadaBase, RutasPrivadas } from '../../rutas/rutasPrivadas';
import Centro from '../../../componente-estilo/centro/centro';
import TextoVacio from '../../../componente/Textos/textoVacio';
import ItemCardCompleto from './componente/itemCardCompleto';
import { PedidoProp } from '../../../modelo/Entidades/pedido/pedido.interface';
import Modal from '../../../componente/modal/modal';
import { formatoTelefonoMostrar } from '../../../utils/formatoDatos';
import PedidoCard from '../pedido/componente/pedidoCard';
import Cargando from '../../../componente/cargando/cargando';
import Texto from '../../../componente-estilo/texto/texto';
import useBuscadorPedido from '../../../hooks/buscador/useBuscadorPedido';
import { useModalContext } from '../../../contexto/contextoModal';
import { busquedaQueryParams } from '../../../utils/busquedaQueryParams';
import FiltroItem from './componente/filtroItem';
import OrdenItem from './componente/ordenItem';

const ItemsLista = () => {
  const items: PedidoLibroStateProp = useSelector((store: appStore) => store.pedidoLibro);
  const {
    obtenerItemsBusqueda,
    obtenerPedidoLibrosByPedidoId,
    responsePedidoLibross,
    loadingPedidoLibross,
    errorFetchPedidoLibross,
  } = usePedidoLibrosApi();
  const [valor, setValor] = useState<string>('');
  const [filtro, setFiltro] = useState<boolean>(false);
  const [ordenar, setOrdenar] = useState<boolean>(false);
  const pedido: PedidoProp | undefined = useSelector(
    (store: appStore) => store.pedido.datoSeleccionado
  );
  const { setModal, modal } = useModalContext();

  // La clave solo se define cuando el usuario cambió filtros u orden, para que el
  // comportamiento por defecto de la página no cambie.
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

  const { nuevoElemento, finListaRef, contenedorRef, handleSeleccionarItem } = useBuscadorPedido({
    valor,
    datosRedux: items,
    resetBusqueda: resetBusquedaPedidoLibro,
    crearBusqueda: crearBusquedaPedidoLibro,
    obtenerBusqueda: obtenerItemsBusqueda,
    obtenerPedidoLibrosByPedidoId,
    agregarBusqueda: agregarPedidoLibrosBusquedaActual,
    response: responsePedidoLibross,
    loading: loadingPedidoLibross,
    limiteLetrasBusqueda: 3,
    claveBusqueda,
  });

  useEffect(() => {
    if (!modal) {
      setFiltro(false);
      setOrdenar(false);
    }
  }, [modal]);

  const handleFiltro = () => {
    setFiltro(true);
    setOrdenar(false);
    setModal(true);
  };

  const handleOrden = () => {
    setOrdenar(true);
    setFiltro(false);
    setModal(true);
  };

  const textoModal = filtro
    ? 'Filtros'
    : ordenar
      ? 'Ordenar items'
      : `Pedido de ${pedido?.cliente.telefono ? formatoTelefonoMostrar(pedido?.cliente.telefono) : (pedido?.cliente.email ?? '')}`;

  return (
    <>
      <BuscadorPaginadoCompleto
        ref={contenedorRef}
        texto="Buscar pedido"
        handleMas={() =>
          nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PEDIDO_CARGAR}`)
        }
        handleFiltro={handleFiltro}
        handleOrden={handleOrden}
        valor={valor}
        setValor={setValor}
        titulo="Lista de pedidos"
        etiquetaArriba="Al comienzo de la lista"
        etiquetaMas={'Nuevo pedido'}
      />
      <Centro ref={contenedorRef}>
        {!items.busquedaActual || items.busquedaActual.datosQuery.length === 0 ? (
          <TextoVacio entidad="clientes" />
        ) : (
          items?.busquedaActual?.datosQuery?.map(d => (
            <ItemCardCompleto
              item={d}
              key={d.id}
              idPedido={d.idPedido}
              onClick={handleSeleccionarItem}
            />
          ))
        )}
        <div ref={finListaRef}></div>
        <Modal texto={textoModal}>
          {filtro ? (
            <FiltroItem />
          ) : ordenar ? (
            <OrdenItem />
          ) : (
            <>
              {pedido ? <PedidoCard pedido={pedido} activo /> : <TextoVacio entidad="pedido" />}
              {loadingPedidoLibross && <Cargando />}
              {errorFetchPedidoLibross && <Texto texto={errorFetchPedidoLibross} error chica />}
            </>
          )}
        </Modal>
      </Centro>
    </>
  );
};

export default ItemsLista;
