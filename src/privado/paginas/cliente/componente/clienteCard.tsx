import useEditar from "../../../../hooks/editar/useEditar";
import { ClienteProp } from "../../../../modelo/Entidades/cliente/cliente.interface";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import './clienteCard.css'

interface Props {
  cliente: ClienteProp
}

const ClienteCard = ({ cliente }: Props) => {
  const { handleSelect } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.CLIENTE}`,
    cliente
  });

  return (
    <Card
      onClick={() => handleSelect(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.CLIENTE}`)}
      nuevoEstilo={'card-cliente'}
    >

      <div className="card-vertical">
        <Texto texto={`Telefono: ${cliente.telefono}`} negrita />
        <Texto texto={`Nombre: ${cliente.nombre}`} />
        <Texto texto={`Email: ${cliente.email}`} />
      </div>
      <ul>
        <li className='pendiente' title='Pedidos pendientes'>{cliente.pendiente}</li>
        <li className='terminado' title='Pedidos listos para entregar'>{cliente.listo}</li>
        <li className='retirado' title='Pedidos retirados'>{cliente.retirado}</li>
      </ul>

    </Card>
  )
}

export default ClienteCard