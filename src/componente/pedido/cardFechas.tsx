import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface"
import Calendario from "../../assets/calendario.svg?react"
import { claseXestado, estadoXstring } from "../../utils/formatoDatos";
import { formatoFecha, formatoHora, invertirFecha } from "../../utils/calendario";
import Texto from "../../componente-estilo/texto/texto";
import './cardPedido.css'
interface Prop {
  pedido: PedidoProp;
}
const CardFechas = ({ pedido }: Prop) => {
  return (
    <div className={`card-pedido-fechas ${claseXestado(pedido.estado)}`}>
      <Calendario className="icono-pedido"/>
      <div className="pedido-fecha-interno" title={`Tomado a las ${formatoHora({ fecha: pedido.fechaTomado })}`}>
        <Texto texto={'Tomado'} centrado chica/>
        <Texto texto={formatoFecha({ fecha: pedido.fechaTomado })} centrado />
      </div>
      <div className="pedido-fecha-interno" title={estadoXstring(pedido.estado)}>
        <Texto texto={'Entrega'} centrado chica/>
        <Texto texto={invertirFecha(pedido.fechaEntrega)} centrado mediana/>
      </div>
    </div>
  )
}

export default CardFechas;