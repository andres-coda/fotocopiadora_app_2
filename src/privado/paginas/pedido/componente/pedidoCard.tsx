import Card from "../../../../componente-estilo/card/card"
import useEditar from "../../../../hooks/editar/useEditar"
import './pedidoCard.css'
import { PedidoProp } from "../../../../modelo/Entidades/pedido/pedido.interface"
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas"
import Calendario from "../../../../assets/calendario.svg?react"
import Texto from "../../../../componente-estilo/texto/texto"
import { formatoFecha, formatoHora } from "../../../../utils/calendario"
import { claseXestado } from "../../../../utils/formatoDatos"

interface Props {
  pedido: PedidoProp
}

const PedidoCard = ({ pedido }: Props) => {
  const { handleSelect } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
    pedido
  });
 
  return (
    <Card
      onClick={() => handleSelect(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`)}
      nuevoEstilo={'card-pedido'}
    >
      <div className={`card-pedido-fechas ${claseXestado(pedido.estado)}`}> 
        <Calendario/>
        <div className="pedido-fecha-interno" title={`Tomado a las ${formatoHora({fecha:pedido.fechaTomado})}`}>
          <Texto texto={'Tomado'} centrado/>
          <Texto texto={formatoFecha({fecha:pedido.fechaTomado})} negrita centrado/>
        </div>
        <div className="pedido-fecha-interno">
          <Texto texto={'Entrega'} centrado/>
          <Texto texto={pedido.fechaEntrega} negrita centrado/>
        </div>
      </div>
      
    </Card>
  )
}

export default PedidoCard

/*
<div className={`cliente-pedidos`} onClick={() => handlePedido(pedido)} title={nuevoPedido.estado.estado}>
        <div className={`cliente-pedidos-interno ${nuevoCaseClaseEstado(nuevoPedido.estado.idEstadoPedido)}`}>
          <PedidoFecha pedido={pedido} />
        </div>
        <div className={`cliente-pedidos-interno ${nuevoCaseClaseEstado(nuevoPedido.estado.idEstadoPedido)}`}>
          <PedidoArchivos pedido={pedido} />
        </div>
        <div className={`cliente-pedidos-interno ${nuevoCaseClaseEstado(nuevoPedido.estado.idEstadoPedido)}`}>
          <PedidoPesos pedido={pedido} />
        </div>
      </div>

*/