import Card from "../../../../componente-estilo/card/card"
import useEditar from "../../../../hooks/editar/useEditar"
import './pedidoCard.css'
import { PedidoProp } from "../../../../modelo/Entidades/pedido/pedido.interface"
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas"
import CardFechas from "../../../../componente/pedido/cardFechas"
import CardArchivos from "../../../../componente/pedido/cardArchivos"
import CardImporte from "../../../../componente/pedido/cardImporte"

interface Props {
  pedido: PedidoProp;
}

const PedidoCard =({ pedido }: Props) => {
  const { handleSelect } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
    pedido
  });
 
  return (
    <Card
      onClick={() => handleSelect({rutaLocal:`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`, pedido})}
      nuevoEstilo={'card-pedido'}
    >
      <CardFechas pedido={pedido} />
      <CardArchivos pedido={pedido}/>
      <CardImporte pedido={pedido} />
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