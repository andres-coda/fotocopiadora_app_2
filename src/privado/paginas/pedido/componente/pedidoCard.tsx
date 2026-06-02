import Card from "../../../../componente-estilo/card/card"
import useEditar from "../../../../hooks/editar/useEditar"
import './pedidoCard.css'
import { PedidoProp } from "../../../../modelo/Entidades/pedido/pedido.interface"
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas"
import CardFechas from "../../../../componente/pedido/cardFechas"
import CardArchivos from "../../../../componente/pedido/cardArchivos"
import CardImporte from "../../../../componente/pedido/cardImporte"
import PedidoLibroXPedidoCard from "./pedidoLibroXPedidoCard"
import Botonera from "../../../../componente-estilo/botonera/botonera"
import Boton from "../../../../componente-estilo/boton/boton"

interface Props {
  pedido: PedidoProp;
  onClick?: (pedido: PedidoProp) => void;
  activo?: boolean;
}

const PedidoCard = ({ pedido, onClick, activo }: Props) => {
  const { handleSelect } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
    pedido
  });

  return (
    <Card
      onClick={onClick ? () => onClick(pedido) : undefined}
      nuevoEstilo={`card-pedido`}
    >
      <CardFechas pedido={pedido} />
      <CardArchivos pedido={pedido} />
      {
        activo &&
        <div className="pedidos-internos">
          {pedido?.libroPedidos.map(lp => <PedidoLibroXPedidoCard pL={lp} key={lp.id} />)}
          <Botonera>
            <Boton texto="cambiar estado" secundario />
            <Boton texto="editar" secundario />
          </Botonera>
        </div>
      }
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