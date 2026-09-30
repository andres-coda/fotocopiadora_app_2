import { useDispatch, useSelector } from "react-redux";
import { ClienteProp } from "../../../../modelo/Entidades/cliente/cliente.interface";
import { appStore } from "../../../../redux/store";
import { RefObject, useEffect, useRef, useState } from "react";
import Centro from "../../../../componente-estilo/centro/centro";
import ClienteDatos from "./clienteDatos";
import './cliente-select.css'
import Texto from "../../../../componente-estilo/texto/texto";
import PedidoCard from "../../pedido/componente/pedidoCard";
import Cargando from "../../../../componente/cargando/cargando";
import { useModalContext } from "../../../../contexto/contextoModal";
import Modal from "../../../../componente/modal/modal";
import { PedidoProp } from "../../../../modelo/Entidades/pedido/pedido.interface";
import TextoVacio from "../../../../componente/Textos/textoVacio";
import { estadoPedidoXstring, formatoTelefonoMostrar } from "../../../../utils/formatoDatos";
import { ReduxProp, UltimaBusquedaProp } from "../../../../redux/modelo/reduxContext.interface";
import usePedidosApi from "../../../../servicio/pedido/usePedidosApi";
import { agregarItemsPedidoSeleccionadoRedux, agregarPedidosBusquedaActual, crearBusquedaPedido, resetSeleccionarPedido, seleccionarPedido } from "../../../../redux/state/pedido.state";
import usePedidoLibrosApi from "../../../../servicio/pedido_libro/usePedidoLibrosApi";
import { Estado } from "../../../../modelo/Entidades/pedido_libro/estado.enum";
import EstadoPedidos from "../../../../componente/pedido/estadoPedidos";

const ClienteSelect = () => {
  const clienteContexto: ReduxProp<ClienteProp> = useSelector((store: appStore) => store.cliente);
  const pedidosCliente: ReduxProp<PedidoProp> = useSelector((store: appStore) => store.pedido);
  const { responsePedidos, loadingPedidos, errorFetchPedidos, obtenerPedidosByCienteId } = usePedidosApi();
   const finListaRef = useRef<HTMLDivElement>(null);
  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [estadoSelec, setEstadoSelect] = useState<Estado | undefined>(undefined);

  const { setModal, modal } = useModalContext();
  const { obtenerPedidoLibrosByPedidoId, responsePedidoLibross, loadingPedidoLibross, errorFetchPedidoLibross } = usePedidoLibrosApi();

  const dispatch = useDispatch();

  useEffect(() => {
    if (responsePedidoLibross) {
      dispatch(agregarItemsPedidoSeleccionadoRedux(responsePedidoLibross.datos))
    }
  }, [responsePedidoLibross]);

  useEffect(()=>{
    if(!modal){
      dispatch(resetSeleccionarPedido());
    }
  },[modal])

  useEffect(() => {
    if (responsePedidos) {
      const pedidoPaginado: UltimaBusquedaProp<PedidoProp> = {
        pagina: responsePedidos.pagina,
        limite: responsePedidos.limite,
        total: responsePedidos.total,
        query: `${clienteContexto.datoSeleccionado?.id}+${estadoSelec}`,
        sortBy: pedidosCliente.busquedaActual.sortBy ?? 'estado',
        sortOrder: 'asc',
        datosQuery: responsePedidos.datos
      }
      if (
        responsePedidos.pagina != pedidosCliente.busquedaActual.pagina
        && pedidosCliente.busquedaActual.query === pedidoPaginado.query
      ) {
        dispatch(agregarPedidosBusquedaActual(pedidoPaginado))

      } else {
        dispatch(crearBusquedaPedido(pedidoPaginado))
      }
    }
  }, [responsePedidos]);

  const handlePedido = (pedido: PedidoProp) => {
    obtenerPedidoLibrosByPedidoId(pedido.id);
    dispatch(seleccionarPedido(pedido));
    setModal(true);
  }

  if (!clienteContexto.datoSeleccionado) return <Texto texto={'No se encontro el cliente seleccionado'} />

  return (
    <Centro
      ref={contenedorRef} texto="Datos del cliente"
      nuevoEstilo={'cliente-select'}>
      <div className="cliente-vertical">
        <ClienteDatos cliente={clienteContexto.datoSeleccionado} />
        <EstadoPedidos
        stock={clienteContexto.datoSeleccionado.resumen}
        finListaRef={finListaRef}
        contenedorRef={contenedorRef}
        obtenerPedidosElementoById={obtenerPedidosByCienteId}
        loading={loadingPedidos}
        busquedaRedux={pedidosCliente.busquedaActual}
        estadoSelec={estadoSelec}
        setEstadoSelect={setEstadoSelect}
        />

      </div>
      <Texto texto={`Lista de pedidos ${estadoSelec ? `- ${estadoPedidoXstring(estadoSelec)}` : ''}`} mediana negrita centrado />
      <div className="cliente-pedido">
        {loadingPedidos && <Cargando />}
        {errorFetchPedidos && <Texto texto={errorFetchPedidos} />}
        {
          pedidosCliente.busquedaActual.datosQuery.length === 0 ? <TextoVacio entidad="pedidos" />
            : pedidosCliente.busquedaActual.datosQuery.map(pedidoItem => (
              <PedidoCard pedido={pedidoItem} key={pedidoItem.id} onClick={handlePedido} nuevoEstilo="pedido-cliente-card" cliente/>
            ))}
        <div ref={finListaRef}>
        </div>
      </div>
      <Modal texto={`Pedido de ${clienteContexto.datoSeleccionado.telefono ? formatoTelefonoMostrar(clienteContexto.datoSeleccionado.telefono) : clienteContexto.datoSeleccionado.email ?? ''}`}>
        {pedidosCliente.datoSeleccionado ?
          <PedidoCard
            pedido={pedidosCliente.datoSeleccionado}
            activo
          />
          : <TextoVacio entidad="pedido" />}
        {loadingPedidoLibross && <Cargando />}
        {errorFetchPedidoLibross && <Texto texto={errorFetchPedidoLibross} error chica />}
      </Modal>
    </Centro>
  )
}

export default ClienteSelect