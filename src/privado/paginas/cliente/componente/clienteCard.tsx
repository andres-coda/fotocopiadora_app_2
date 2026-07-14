import useEditar from "../../../../hooks/editar/useEditar";
import { ClienteProp } from "../../../../modelo/Entidades/cliente/cliente.interface";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import Card from "../../../../componente-estilo/card/card";
import './clienteCard.css'
import ClienteDatos from "./clienteDatos";

interface Props {
  cliente: ClienteProp
  onClick?: (cliente: ClienteProp) => void;
}

const ClienteCard = ({ cliente, onClick }: Props) => {
  const { handleSelect } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.CLIENTE}`,
    cliente
  });

  const handleCliente = () => {
    if (onClick) {
      onClick(cliente)
    } else {
      console.log('hace click')
      handleSelect({rutaLocal: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.CLIENTE}`})
    }
  }

  return (
    <Card
      onClick={() => handleCliente()}
      nuevoEstilo={'card-cliente'}
    >
      <ClienteDatos cliente={cliente} />
      <ul>
        <li className='pendiente' title='Pedidos pendientes'>{cliente.resumen.pendiente}</li>
        <li className='terminado' title='Pedidos listos para entregar'>{cliente.resumen.listo}</li>
        <li className='retirado' title='Pedidos retirados'>{cliente.resumen.retirado}</li>
        <li className='cancelado' title='Pedidos cancelados'>{cliente.resumen.cancelado}</li>
      </ul>

    </Card>
  )
}

export default ClienteCard