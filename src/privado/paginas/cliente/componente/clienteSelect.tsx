import { useDispatch, useSelector } from "react-redux";
import { ClienteProp } from "../../../../modelo/Entidades/cliente/cliente.interface";
import { appStore } from "../../../../redux/store";
import { RefObject, useEffect, useRef, useState } from "react";
import Centro from "../../../../componente-estilo/centro/centro";
import ClienteDatos from "./clienteDatos";
import './cliente-select.css'
import Texto from "../../../../componente-estilo/texto/texto";
import PedidoCard from "../../pedido/componente/pedidoCard";
import useClienteApi from "../../../../servicio/cliente/useClienteApi";
import Cargando from "../../../../componente/cargando/cargando";
import { useModalContext } from "../../../../contexto/contextoModal";
import Modal from "../../../../componente/modal/modal";
import { PedidoProp } from "../../../../modelo/Entidades/pedido/pedido.interface";
import TextoVacio from "../../../../componente/Textos/textoVacio";
import { estadoPedidoXstring, formatoTelefonoMostrar } from "../../../../utils/formatoDatos";
import { EstadoPedido } from "../../../../modelo/Entidades/pedido/estadoPedido.enum";
import useBuscadorCompleto from "../../../../hooks/buscador/useBuscadorCompleto";
import { filtroLlamada, ReduxProp, UltimaBusquedaProp } from "../../../../redux/modelo/reduxContext.interface";
import { filtrosInicialesPedido, filtrosPedidoFuntion } from "../../../../filtro/pedido.filtro";
import PedidoCardCliente from "../../pedido/componente/pedidoCardCliente";
import { seleccionarCliente } from "../../../../redux/state/cliente.state";
import usePedidosApi from "../../../../servicio/pedido/usePedidosApi";
import { agregarPedidosBusquedaActual, crearBusquedaPedido, resetBusquedaPedido } from "../../../../redux/state/pedido.state";
import { PaginadoProp } from "../../../../adaptadores/entrada/paginado.adapter";
import useBusquedaPaginada from "../../../../hooks/buscador/useBusquedaPaginada";
import { BusquedaApiProp } from "../../../../modelo/HTTP/peticiones.interface";

const ClienteSelect = () => {
  const clienteContexto: ReduxProp<ClienteProp> = useSelector((store: appStore) => store.cliente);
  const pedidosCliente: ReduxProp<PedidoProp> = useSelector((store: appStore) => store.pedido);
  const { responsePedidos, loadingPedidos, errorFetchPedidos, obtenerPedidosByCienteId } = usePedidosApi();
  const [estadoSelec, setEstadoSelect] = useState<EstadoPedido | undefined>(undefined);
  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const finListaRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if(clienteContexto.datoSeleccionado?.id)
    obtenerPedidosByCienteId({
      pagina: 1,
      limite: pedidosCliente.busquedaActual.limite,
      idCliente: clienteContexto.datoSeleccionado?.id,
      orden: pedidosCliente.busquedaActual.sortBy,
      estado: estadoSelec
    });
  }, [clienteContexto.datoSeleccionado?.id, estadoSelec])


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!clienteContexto.datoSeleccionado?.id) {
          return
        }

        if (!entry.isIntersecting) {
          return
        };
        if (pedidosCliente.busquedaActual.query != `${clienteContexto.datoSeleccionado?.id}+${estadoSelec}`) {
          return
        }
        if (loadingPedidos) {
          return;
        }
        if (
          pedidosCliente.busquedaActual.pagina *
          pedidosCliente.busquedaActual.limite >=
          pedidosCliente.busquedaActual.total
        ) {
          return;
        }

        obtenerPedidosByCienteId({
          pagina: pedidosCliente.busquedaActual.pagina + 1,
          limite: pedidosCliente.busquedaActual.limite,
          idCliente: clienteContexto.datoSeleccionado?.id,
          orden: pedidosCliente.busquedaActual.sortBy,
          estado: estadoSelec ?? undefined
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

  }, [pedidosCliente.busquedaActual.query, pedidosCliente.busquedaActual.pagina, estadoSelec]);

  const { setModal } = useModalContext();
  const [pedido, setPedido] = useState<PedidoProp | undefined>(undefined)

  const dispatch = useDispatch();

  useEffect(() => {
    if (responsePedidos) {
      const pedidoPaginado: UltimaBusquedaProp<PedidoProp> = {
        ...responsePedidos,
        query: `${clienteContexto.datoSeleccionado?.id}+${estadoSelec}`,
        sortBy: pedidosCliente.busquedaActual.sortBy ?? 'estado',
        sortOrder: 'asc',
        datosQuery: responsePedidos.datos
      }
      if(
        responsePedidos.pagina != pedidosCliente.busquedaActual.pagina 
        && pedidosCliente.busquedaActual.query === pedidoPaginado.query
      ){
      dispatch(agregarPedidosBusquedaActual(pedidoPaginado))

      } else {
        dispatch(crearBusquedaPedido(pedidoPaginado))
      }
    }
  }, [responsePedidos]);

  const handleFiltro = (estado: EstadoPedido) => {
    if(estado != estadoSelec) {
      setEstadoSelect(estado);
    }
  }

  if (!clienteContexto.datoSeleccionado) return <Texto texto={'No se encontro el cliente seleccionado'} />

  return (
    <Centro
      ref={contenedorRef} texto="Datos del cliente"
      nuevoEstilo={'cliente-select'}>
      <div className="cliente-vertical">
        <ClienteDatos cliente={clienteContexto.datoSeleccionado} />
        <ul>
          <li className='pendiente' title='Pedidos pendientes' onClick={() => handleFiltro(EstadoPedido.PENDIENTE)}><Texto texto='Pendiente: ' chica /> <Texto texto={`${clienteContexto.datoSeleccionado.resumen.pendiente}`} derecha chica /></li>
          <li className='terminado' title='Pedidos listos para entregar' onClick={() => handleFiltro(EstadoPedido.LISTO)}><Texto texto='Para retirar: ' chica /> <Texto texto={`${clienteContexto.datoSeleccionado.resumen.listo}`} derecha chica /></li>
          <li className='retirado' title='Pedidos retirados' onClick={() => handleFiltro(EstadoPedido.RETIRADO)}><Texto texto='Retirados: ' chica /> <Texto texto={`${clienteContexto.datoSeleccionado.resumen.retirado}`} derecha chica /></li>
          <li className='cancelado' title='Pedidos cancelados' onClick={() => handleFiltro(EstadoPedido.CANCELADO)}><Texto texto='Cancelado: ' chica /> <Texto texto={`${clienteContexto.datoSeleccionado.resumen.cancelado}`} derecha chica /></li>
        </ul>

      </div>
      <Texto texto={`Lista de pedidos ${estadoSelec ? `- ${estadoPedidoXstring(estadoSelec)}`: ''}`} mediana negrita centrado />
      <div className="cliente-pedido">
        {loadingPedidos && <Cargando />}
        {errorFetchPedidos && <Texto texto={errorFetchPedidos} />}
        {
          pedidosCliente.busquedaActual.datosQuery.length === 0 ? <TextoVacio entidad="pedidos" />
            : pedidosCliente.busquedaActual.datosQuery.map(pedido => (
              <PedidoCardCliente pedido={pedido} key={pedido.id} onClick={(pedido) => { setPedido(pedido), setModal(true) }} />
            ))}
        <div ref={finListaRef}>
          <p>Fin de lista</p>
        </div>
      </div>
      <Modal texto={`Pedido de ${clienteContexto.datoSeleccionado.telefono ? formatoTelefonoMostrar(clienteContexto.datoSeleccionado.telefono) : clienteContexto.datoSeleccionado.email ?? ''}`}>
        {pedido ?
          <PedidoCard pedido={pedido} activo />
          : <TextoVacio entidad="pedido" />
        }
      </Modal>
    </Centro>
  )
}

export default ClienteSelect