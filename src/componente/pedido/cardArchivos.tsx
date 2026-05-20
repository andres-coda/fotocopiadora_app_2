import { PedidoClienteProp } from '../../modelo/Entidades/pedido/pedido.interface';
import './cardPedido.css'
import Check from "../../assets/check.svg?react"
import { claseXestado, estadoXstring } from '../../utils/formatoDatos';
import Texto from '../../componente-estilo/texto/texto';

interface Prop<T extends PedidoClienteProp> {
  pedido: T;
}
const CardArchivos = <T extends PedidoClienteProp>({ pedido }: Prop<T>) => {
  return (
    <div className={`card-pedido-fechas ${claseXestado(pedido.estado)}`} title={estadoXstring(pedido.estado)}>
      <Check className='icono-pedido'/>
      <div className="pedido-archivos">
        <Texto texto={`${pedido.archivos} - Archivos`} centrado chica/>
        <Texto texto={`${pedido.anillados} - Anillados`} centrado chica/>
      </div>
    </div>
  )
}

export default CardArchivos;