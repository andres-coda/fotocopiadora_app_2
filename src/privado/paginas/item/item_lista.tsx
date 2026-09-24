import { useDispatch, useSelector } from "react-redux";
import { PedidoLibroProp } from "../../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { ReduxProp } from "../../../redux/modelo/reduxContext.interface";
import { appStore } from "../../../redux/store";
import usePedidoLibrosApi from "../../../servicio/pedido_libro/usePedidoLibrosApi";
import { useState } from "react";
import useBusquedaPaginada from "../../../hooks/buscador/useBusquedaPaginada";
import { agregarPedidoLibrosBusquedaActual, crearBusquedaPedidoLibro, resetBusquedaPedidoLibro } from "../../../redux/state/pedido_libro.state";
import { useModalContext } from "../../../contexto/contextoModal";
import BuscadorPaginadoCompleto from "../../../componente/buscador/buscadorPaginadoCompleto";
import { rutaPrivadaBase, RutasPrivadas } from "../../rutas/rutasPrivadas";
import Centro from "../../../componente-estilo/centro/centro";
import TextoVacio from "../../../componente/Textos/textoVacio";
import PedidoLibroXPedidoCard from "../pedido/componente/pedidoLibroXPedidoCard";

const ItemsLista = () => {
  const items: ReduxProp<PedidoLibroProp> = useSelector((store: appStore) => store.pedidoLibro);
  const { obtenerPedidoLibross, responsePedidoLibross, loadingPedidoLibross } = usePedidoLibrosApi()
  const [valor, setValor] = useState<string>('');
  const dispatch = useDispatch();

  const { contenedorRef, finListaRef, nuevoElemento } = useBusquedaPaginada<PedidoLibroProp>({
    valor,
    datosRedux: items,
    resetBusqueda: resetBusquedaPedidoLibro,
    crearBusqueda: crearBusquedaPedidoLibro,
    obtenerBusqueda: obtenerPedidoLibross,
    agregarBusqueda: agregarPedidoLibrosBusquedaActual,
    response: responsePedidoLibross,
    loading: loadingPedidoLibross,
    limiteLetrasBusqueda: 3,
  });

  const { setModal, modal } = useModalContext();

  /* const { obtenerPedidoLibrosByPedidoId, responsePedidoLibross, loadingPedidoLibross, errorFetchPedidoLibross } = usePedidoLibrosApi();

  useEffect(() => {
    if (responsePedidoLibross) {
      dispatch(agregarItemsPedidoSeleccionado(responsePedidoLibross.datos))
    }
  }, [responsePedidoLibross]);

  useEffect(() => {
    if (!modal) {
      dispatch(resetSeleccionarPedido());
    }
  }, [modal]);

  const handlePedido = (pedido: PedidoProp) => {
      obtenerPedidoLibrosByPedidoId(pedido.id);
      dispatch(seleccionarPedido(pedido));
      setModal(true);
    }
 */
  return (
    <>
      <BuscadorPaginadoCompleto
        ref={contenedorRef}
        texto='Buscar pedido'
        handleMas={() => nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PEDIDO_CARGAR}`)}
        valor={valor}
        setValor={setValor}
        titulo='Lista de pedidos'
        etiquetaArriba='Al comienzo de la lista'
        etiquetaMas={'Nuevo pedido'}
      />
      <Centro ref={contenedorRef}>
        {
          !items.busquedaActual || items.busquedaActual.datosQuery.length === 0
            ? (<TextoVacio entidad='clientes' />)
            : items?.busquedaActual?.datosQuery?.map(d => <PedidoLibroXPedidoCard pL={d} key={d.id} idPedido={d.idPedido}/>)
        }
        <div ref={finListaRef}>
          <p>Fin de lista</p>
        </div>
        {/* <Modal texto={`Pedido de ${items?.datoSeleccionado?.cliente.telefono ? formatoTelefonoMostrar(items?.datoSeleccionado?.cliente.telefono) : items?.datoSeleccionado?.cliente.email ?? ''}`}>
          {items.datoSeleccionado ?
            <PedidoCard
              pedido={items.datoSeleccionado}
              activo
            />
            : <TextoVacio entidad="pedido" />}
          {loadingPedidoLibross && <Cargando />}
          {errorFetchPedidoLibross && <Texto texto={errorFetchPedidoLibross} error chica />}
        </Modal> */}
      </Centro>
    </>
  )
}

export default ItemsLista;
