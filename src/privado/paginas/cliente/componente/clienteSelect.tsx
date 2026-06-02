import { useDispatch, useSelector } from "react-redux";
import { ClienteProp } from "../../../../modelo/Entidades/cliente/cliente.interface";
import { appStore } from "../../../../redux/store";
import { RefObject, useEffect, useRef } from "react";
import Centro from "../../../../componente-estilo/centro/centro";
import ClienteDatos from "./clienteDatos";
import './cliente-select.css'
import Texto from "../../../../componente-estilo/texto/texto";
import PedidoCard from "../../pedido/componente/pedidoCard";
import useClienteApi from "../../../../servicio/cliente/useClienteApi";
import { selectCliente } from "../../../../redux/state/cliente.state";
import Cargando from "../../../../componente/cargando/cargando";

const ClienteSelect = () => {
  const cliente: ClienteProp | null = useSelector((store: appStore) => store.cliente.selected);
  const { responseCliente, loadingCliente, errorFetchCliente } = useClienteApi(cliente?.id ?? undefined);
  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

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
          <li className='pendiente' title='Pedidos pendientes'>Pendiente: {cliente.pendiente}</li>
          <li className='terminado' title='Pedidos listos para entregar'>Para retirar: {cliente.listo}</li>
          <li className='retirado' title='Pedidos retirados'>Retirados: {cliente.retirado}</li>
        </ul>

      </div>
      <Texto texto={'Lista de pedidos'} mediana negrita centrado />
      <div className="cliente-pedido">
        {cliente.pedidos.map(pedido => (
          <PedidoCard pedido={pedido} key={pedido.id} />
        ))}
      </div>
    </Centro>
  )
}

export default ClienteSelect