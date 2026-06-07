import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { claseXestadoPedido, estadoPedidoXstring, formatoTelefonoMostrar } from "../../utils/formatoDatos";
import Cliente from "../../assets/userCircleBlack.svg?react"
import Texto from "../../componente-estilo/texto/texto";

interface Prop {
  pedido: PedidoProp;
}
const CardDatosCliente = ({ pedido }: Prop) => {
  if(!pedido.cliente) return null;
  return (
    <div className={`card-pedido-fechas ${claseXestadoPedido(pedido.estado)}`} title={estadoPedidoXstring(pedido.estado)}>
      <Cliente className="icono-pedido" />
      {
        pedido.cliente.telefono
          ? <Texto texto={`${formatoTelefonoMostrar(pedido.cliente.telefono)}`} centrado  />
          : <Texto texto={`${pedido.cliente.email}`} centrado  />
      }
    </div>
  )
}

export default CardDatosCliente;