import { useSelector } from "react-redux"
import Centro from "../../../../componente-estilo/centro/centro"
import CardArchivos from "../../../../componente/pedido/cardArchivos"
import CardFechas from "../../../../componente/pedido/cardFechas"
import { PedidoProp } from "../../../../modelo/Entidades/pedido/pedido.interface"
import { appStore } from "../../../../redux/store"
import Texto from "../../../../componente-estilo/texto/texto"
import ItemCard from "../../item/componente/itemCard"
import CardDatosCliente from "../../../../componente/pedido/cardDatosCliente"
import CardImporte from "../../../../componente/pedido/cardImporte"
import './pedidoSelect.css'

const PedidoSelect = () => {
  const pedido: PedidoProp | undefined = useSelector((store: appStore) => store.pedido.datoSeleccionado);

  if(!pedido) return <Texto texto={'No hay pedido seleccionado'}/>
  return (
    <Centro
    nuevoEstilo="pedido-select"
    >
      <CardDatosCliente pedido={pedido} />
      <CardFechas pedido={pedido} />
      <CardArchivos pedido={pedido} />
      {pedido.libroPedidos.map(lp => <ItemCard item={lp} key={lp.id} idPedido={pedido.id} />)}
      <CardImporte pedido={pedido} />
    </Centro>
  )
}

export default PedidoSelect
