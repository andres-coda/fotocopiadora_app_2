import { useDispatch, useSelector } from "react-redux";
import { ReduxProp } from "../../../redux/modelo/reduxContext.interface";
import { PedidoProp } from "../../../modelo/Entidades/pedido/pedido.interface";
import { appStore } from "../../../redux/store";
import { rutaPrivadaBase, RutasPrivadas } from "../../rutas/rutasPrivadas";
import Centro from "../../../componente-estilo/centro/centro";
import TextoVacio from "../../../componente/Textos/textoVacio";
import PedidoCard from "./componente/pedidoCard";
import usePedidosApi from "../../../servicio/pedido/usePedidosApi";
import { useEffect, useState } from "react";
import { agregarItemsPedidoSeleccionado, agregarPedidosBusquedaActual, crearBusquedaPedido, resetBusquedaPedido, resetSeleccionarPedido, seleccionarPedido } from "../../../redux/state/pedido.state";
import useBusquedaPaginada from "../../../hooks/buscador/useBusquedaPaginada";
import BuscadorPaginadoCompleto from "../../../componente/buscador/buscadorPaginadoCompleto";
import { formatoTelefonoMostrar } from "../../../utils/formatoDatos";
import Modal from "../../../componente/modal/modal";
import Cargando from "../../../componente/cargando/cargando";
import Texto from "../../../componente-estilo/texto/texto";
import { useModalContext } from "../../../contexto/contextoModal";
import usePedidoLibrosApi from "../../../servicio/pedido_libro/usePedidoLibrosApi";

const Pedidos = () => {
  const pedidoDatos: ReduxProp<PedidoProp> = useSelector((store: appStore) => store.pedido);
  const { obtenerPedidosBusqueda, responsePedidos, loadingPedidos } = usePedidosApi()
  const [valor, setValor] = useState<string>('');
  const dispatch = useDispatch();

  const { contenedorRef, finListaRef, nuevoElemento } = useBusquedaPaginada<PedidoProp>({
    valor,
    datosRedux: pedidoDatos,
    resetBusqueda: resetBusquedaPedido,
    crearBusqueda: crearBusquedaPedido,
    obtenerBusqueda: obtenerPedidosBusqueda,
    agregarBusqueda: agregarPedidosBusquedaActual,
    response: responsePedidos,
    loading: loadingPedidos,
    limiteLetrasBusqueda: 3,
  });

  const { setModal, modal } = useModalContext();

  const { obtenerPedidoLibrosByPedidoId, responsePedidoLibross, loadingPedidoLibross, errorFetchPedidoLibross } = usePedidoLibrosApi();

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
          !pedidoDatos.busquedaActual || pedidoDatos.busquedaActual.datosQuery.length === 0
            ? (<TextoVacio entidad='clientes' />)
            : pedidoDatos.busquedaActual.datosQuery.map(d => <PedidoCard pedido={d} key={d.id} onClick={handlePedido}/>)
        }
        <div ref={finListaRef}>
          <p>Fin de lista</p>
        </div>
        <Modal texto={`Pedido de ${pedidoDatos?.datoSeleccionado?.cliente.telefono ? formatoTelefonoMostrar(pedidoDatos?.datoSeleccionado?.cliente.telefono) : pedidoDatos?.datoSeleccionado?.cliente.email ?? ''}`}>
          {pedidoDatos.datoSeleccionado ?
            <PedidoCard
              pedido={pedidoDatos.datoSeleccionado}
              activo
            />
            : <TextoVacio entidad="pedido" />}
          {loadingPedidoLibross && <Cargando />}
          {errorFetchPedidoLibross && <Texto texto={errorFetchPedidoLibross} error chica />}
        </Modal>
      </Centro>
    </>
  )
}

export default Pedidos
