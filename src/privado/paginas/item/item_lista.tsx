import { useSelector } from 'react-redux';
import { appStore } from '../../../redux/store';
import { useEffect, useState } from 'react';
import BuscadorPaginadoCompleto from '../../../componente/buscador/buscadorPaginadoCompleto';
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
import FiltroItem from './componente/filtroItem';
import FiltrosActivos from './componente/filtrosActivos';
import OrdenItem from './componente/ordenItem';

const ItemsLista = () => {
 
  const [valor, setValor] = useState<string>('');
  const [filtro, setFiltro] = useState<boolean>(false);
  const [ordenar, setOrdenar] = useState<boolean>(false);
  const pedido: PedidoProp | undefined = useSelector(
    (store: appStore) => store.pedido.datoSeleccionado
  );
  const { setModal, modal } = useModalContext();


  const { nuevoElemento, finListaRef, contenedorRef, handleSeleccionarItem, error, loading, items } = useBuscadorPedido({
    valor,
    
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
        valor={valor}
        setValor={setValor}
        titulo="Lista de pedidos"
        etiquetaArriba="Al comienzo de la lista"
        etiquetaMas={'Nuevo pedido'}
        handleMas={() =>
          nuevoElemento()
        }
        handleFiltro={handleFiltro}
        handleOrden={handleOrden}
      />
      <FiltrosActivos />
      <Centro
        ref={contenedorRef}
        finListaRef={finListaRef}
        vacio={!items.busquedaActual || items.busquedaActual.datosQuery.length === 0}
        entidad="items"
        query={valor}
        loading={loading}
        error={error}
      >
        {items?.busquedaActual?.datosQuery?.map(d => (
          <ItemCardCompleto
            item={d}
            key={d.id}
            idPedido={d.idPedido}
            onClick={handleSeleccionarItem}
          />
        ))}
      </Centro>
      <Modal texto={textoModal}>
        {filtro ? (
          <FiltroItem />
        ) : ordenar ? (
          <OrdenItem />
        ) : (
          <>
            {pedido ? <PedidoCard pedido={pedido} activo /> : <TextoVacio entidad="pedido" />}
            {loading && <Cargando />}
            {error && <Texto texto={error} error chica />}
          </>
        )}
      </Modal>
    </>
  );
};

export default ItemsLista;
