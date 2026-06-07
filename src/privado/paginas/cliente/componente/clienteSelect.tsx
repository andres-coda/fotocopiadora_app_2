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
import PedidoLibroXPedidoCard from "../../pedido/componente/pedidoLibroXPedidoCard";
import TextoVacio from "../../../../componente/Textos/textoVacio";
import { formatoTelefonoMostrar } from "../../../../utils/formatoDatos";

const ClienteSelect = () => {
  const cliente: ClienteProp | null = useSelector((store: appStore) => store.cliente.selected);
  const { responseCliente, loadingCliente, errorFetchCliente } = useClienteApi(cliente?.id ?? undefined);
  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);


  const { modal, setModal } = useModalContext();
  const [pedido, setPedido] = useState<PedidoProp | undefined>(undefined)

  const dispatch = useDispatch();

  useEffect(() => {
    if (responseCliente) {
      dispatch(selectCliente(responseCliente))
    }
  }, [responseCliente])

  if (!cliente) return <Texto texto={'No se encontro el cliente seleccionado'} />

  if (loadingCliente) return <Cargando />

  if (errorFetchCliente) return <Texto texto={`Fallo la carga del cliente: ${errorFetchCliente}`} error />

  return (
    <Centro
      ref={contenedorRef} texto="Datos del cliente"
      nuevoEstilo={'cliente-select'}>
      <div className="cliente-vertical">
        <ClienteDatos cliente={cliente} />
        <ul>
          <li className='pendiente' title='Pedidos pendientes'>Pendiente: {cliente.resumen.pendiente}</li>
          <li className='terminado' title='Pedidos listos para entregar'>Para retirar: {cliente.resumen.listo}</li>
          <li className='retirado' title='Pedidos retirados'>Retirados: {cliente.resumen.retirado}</li>
          <li className='cancelado' title='Pedidos cancelados'>Retirados: {cliente.resumen.cancelado}</li>
        </ul>

      </div>
      <Texto texto={'Lista de pedidos'} mediana negrita centrado />
      <div className="cliente-pedido">
        {cliente.pedidos.map(pedido => (
          <PedidoCard pedido={pedido} key={pedido.id} onClick={(pedido) => { setPedido(pedido), setModal(true) }} />
        ))}
      </div>
      <Modal texto={`Pedido de ${cliente.telefono ? formatoTelefonoMostrar(cliente.telefono): cliente.email ?? ''}`}>
        {pedido ?
          <PedidoCard pedido={pedido} activo />
          : <TextoVacio entidad="pedido" />
        }
      </Modal>
    </Centro>
  )
}

export default ClienteSelect