import useEditar from "../../../../hooks/editar/useEditar";
import { ClienteProp } from "../../../../modelo/Entidades/cliente/cliente.interface";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import Card from "../../../../componente-estilo/card/card";
import './clienteCard.css'
import ClienteDatos from "./clienteDatos";
import useClienteApi from "../../../../servicio/cliente/useClienteApi";
import Texto from "../../../../componente-estilo/texto/texto";
import { useEffect } from "react";

interface Props {
  cliente: ClienteProp
  onClick?: (cliente: ClienteProp) => void;
}

const ClienteCard = ({ cliente, onClick }: Props) => {
  const { obtenerClienteById, responseCliente, loadingCliente, errorFetchCliente } = useClienteApi();
  const { handleSelect } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.CLIENTE}`,
    cliente
  });

  const handleCliente = () => {
    if(onClick) {
      onClick(cliente)
    } else {
      obtenerClienteById(cliente.id);
    }
  }

  useEffect(() => {
    if (responseCliente) {
      handleSelect({ rutaLocal: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.CLIENTE}`, cliente: responseCliente });
    }
  }, [responseCliente])

  if (loadingCliente) return (
    <Card> <Texto texto={'Cargando ....'} /></Card>
  )

  if (errorFetchCliente) return (
    <Card> <Texto texto={`Error en la selección del cliente: ${errorFetchCliente}`} /></Card>
  )

  return (
    <Card
      onClick={() => handleCliente()}
      nuevoEstilo={'card-cliente'}
    >
      <ClienteDatos cliente={cliente} />
      <ul>
        <li className='pendiente' title='Pedidos pendientes'>{cliente.pendiente}</li>
        <li className='terminado' title='Pedidos listos para entregar'>{cliente.listo}</li>
        <li className='retirado' title='Pedidos retirados'>{cliente.retirado}</li>
      </ul>

    </Card>
  )
}

export default ClienteCard