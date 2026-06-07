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
import { selectCliente } from "../../../../redux/state/cliente.state";
import Cargando from "../../../../componente/cargando/cargando";
import { useModalContext } from "../../../../contexto/contextoModal";
import Modal from "../../../../componente/modal/modal";
import { PedidoProp } from "../../../../modelo/Entidades/pedido/pedido.interface";
import TextoVacio from "../../../../componente/Textos/textoVacio";
import { estadoPedidoXstring, formatoTelefonoMostrar } from "../../../../utils/formatoDatos";
import { EstadoPedido } from "../../../../modelo/Entidades/pedido/estadoPedido.enum";
import useBuscadorCompleto from "../../../../hooks/buscador/useBuscadorCompleto";
import { filterContext, filtroLlamada } from "../../../../redux/modelo/reduxContext.interface";
import { filtrosInicialesPedido, filtrosPedidoFuntion } from "../../../../filtro/pedido.filtro";

const ClienteSelect = () => {
  const clienteContexto: filterContext<ClienteProp> = useSelector((store: appStore) => store.cliente);
  const { responseCliente, loadingCliente, errorFetchCliente } = useClienteApi(clienteContexto.selected?.id ?? undefined);
  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [newFiltros, setNewFiltros] = useState<filtroLlamada[]>(filtrosInicialesPedido)
  const [estadoSelec, setEstadoSelect] = useState('');

  const { elementosFiltrados } = useBuscadorCompleto({
    estadoFiltros: newFiltros,
    filtros: [...filtrosPedidoFuntion],
    elementos: clienteContexto.selected?.pedidos,
    sortBy: 'estado',
    sortOrder: clienteContexto.filter.sortOrder,
  })



  const { modal, setModal } = useModalContext();
  const [pedido, setPedido] = useState<PedidoProp | undefined>(undefined)

  const dispatch = useDispatch();

  useEffect(() => {
    if (responseCliente) {
      dispatch(selectCliente(responseCliente))
    }
  }, [responseCliente]);

  const handleFiltro = (estado: EstadoPedido) => {
    setEstadoSelect(` - ${estadoPedidoXstring(estado)}`);
    setNewFiltros(prev => {
      return prev.map(p => p.id === estado.toString() ? { ...p, estado: true } : { ...p, estado: false })
    })
  }

  if (!clienteContexto.selected) return <Texto texto={'No se encontro el cliente seleccionado'} />

  if (loadingCliente) return <Cargando />

  if (errorFetchCliente) return <Texto texto={`Fallo la carga del cliente: ${errorFetchCliente}`} error />

  return (
    <Centro
      ref={contenedorRef} texto="Datos del cliente"
      nuevoEstilo={'cliente-select'}>
      <div className="cliente-vertical">
        <ClienteDatos cliente={clienteContexto.selected} />
        <ul>
          <li className='pendiente' title='Pedidos pendientes' onClick={() => handleFiltro(EstadoPedido.PENDIENTE)}><Texto texto='Pendiente: ' chica /> <Texto texto={`${clienteContexto.selected.resumen.pendiente}`} derecha chica/></li>
          <li className='terminado' title='Pedidos listos para entregar' onClick={() => handleFiltro(EstadoPedido.LISTO)}><Texto texto='Para retirar: ' chica /> <Texto texto={`${clienteContexto.selected.resumen.listo}`} derecha chica/></li>
          <li className='retirado' title='Pedidos retirados' onClick={() => handleFiltro(EstadoPedido.RETIRADO)}><Texto texto='Retirados: ' chica /> <Texto texto={`${clienteContexto.selected.resumen.retirado}`} derecha chica/></li>
          <li className='cancelado' title='Pedidos cancelados' onClick={() => handleFiltro(EstadoPedido.CANCELADO)}><Texto texto='Cancelado: ' chica /> <Texto texto={`${clienteContexto.selected.resumen.cancelado}`} derecha chica/></li>
        </ul>

      </div>
      <Texto texto={`Lista de pedidos ${estadoSelec}`} mediana negrita centrado />
      <div className="cliente-pedido">
        {
          elementosFiltrados.length === 0 ? <TextoVacio entidad="pedidos" />
            : elementosFiltrados.map(pedido => (
              <PedidoCard pedido={pedido} key={pedido.id} onClick={(pedido) => { setPedido(pedido), setModal(true) }} />
            ))}
      </div>
      <Modal texto={`Pedido de ${clienteContexto.selected.telefono ? formatoTelefonoMostrar(clienteContexto.selected.telefono) : clienteContexto.selected.email ?? ''}`}>
        {pedido ?
          <PedidoCard pedido={pedido} activo />
          : <TextoVacio entidad="pedido" />
        }
      </Modal>
    </Centro>
  )
}

export default ClienteSelect