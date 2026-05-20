import { PedidoClienteProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { claseXestado, estadoXstring } from "../../utils/formatoDatos";
import Precio from "../../assets/pesos.svg?react"
import Texto from "../../componente-estilo/texto/texto";

interface Prop<T extends PedidoClienteProp> {
  pedido: T;
}
const CardImporte = <T extends PedidoClienteProp>({ pedido }: Prop<T>) => {
  return (
    <div className={`card-pedido-fechas ${claseXestado(pedido.estado)}`} title={estadoXstring(pedido.estado)}>
      <Precio className="icono-pedido"/>
      <div className="pedido-fecha-interno">
        <Texto texto={'Total'} centrado chica/>
        <Texto texto={`$${Number(pedido.importeTotal)}`} centrado chica/>
      </div>
      <div className="pedido-fecha-interno">
        <Texto texto={'Seña'} centrado chica/>
        <Texto texto={`$${Number(pedido.sena)}`} centrado chica/>
      </div>
      <div className="pedido-fecha-interno">
        <Texto texto={'Saldo'} centrado chica/>
        <Texto texto={`$${Number(pedido.importeTotal - pedido.sena)}`} centrado mediana/>
      </div>
    </div>
  )
}

export default CardImporte;