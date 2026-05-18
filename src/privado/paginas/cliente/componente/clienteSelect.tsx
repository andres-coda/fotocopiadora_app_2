import { useSelector } from "react-redux";
import { ClienteProp } from "../../../../modelo/Entidades/cliente/cliente.interface";
import { appStore } from "../../../../redux/store";
import { RefObject, useRef } from "react";
import Centro from "../../../../componente-estilo/centro/centro";
import ClienteDatos from "./clienteDatos";
import './cliente-select.css'

const ClienteSelect = () => {
  const cliente: ClienteProp | null = useSelector((store: appStore) => store.cliente.selected);
  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  if (!cliente) return <p>No se encontro el cliente seleccionado</p>

  return (
    <Centro 
      ref={contenedorRef} texto="Datos del cliente" 
      nuevoEstilo={'cliente-select'}>
      <ClienteDatos cliente={cliente} />
      <ul>
        <li className='pendiente' title='Pedidos pendientes'>Pendiente: {cliente.pendiente}</li>
        <li className='terminado' title='Pedidos listos para entregar'>Para retirar: {cliente.listo}</li>
        <li className='retirado' title='Pedidos retirados'>Retirados: {cliente.retirado}</li>
      </ul>
    </Centro>
  )
}

export default ClienteSelect