import { PedidoLibroProp } from "../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import Card from "../../../../componente-estilo/card/card";
import { claseXestado, nombreLibroXstring } from "../../../../utils/formatoDatos";
import ItemInternoCard from "./itemInternoCard";
import CardArchivos from "../../../../componente/pedido/cardArchivos";
import CardFechas from "../../../../componente/pedido/cardFechas";
import CardDatosCliente from "../../../../componente/pedido/cardDatosCliente";

interface Prop {
  item: PedidoLibroProp;
  idPedido?: string;
  onClick?: (item: PedidoLibroProp) => void;
}

const ItemCardCompleto = ({ item, idPedido,  onClick}: Prop) => {
  const handleItem = () => {
    if (onClick)
      onClick(item);
  }

  return (
    <Card
      nuevoEstilo={`card-pedido card-item-completa`}
      tituloCard={`${item.detalles || nombreLibroXstring(item.libro)}`}
      onClick={handleItem}
    >

        {item.pedido && <CardFechas pedido={item.pedido} />}
        {item.pedido && <CardArchivos pedido={item.pedido} />}
        <div className="card-horizontal">
        <ItemInternoCard idPedido={idPedido} item={item} />
        </div>
        {item?.pedido?.cliente && <CardDatosCliente pedido={item.pedido} />}
     

    </Card>
  )
}

export default ItemCardCompleto
