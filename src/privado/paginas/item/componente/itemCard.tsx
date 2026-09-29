import { PedidoLibroProp } from "../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import Card from "../../../../componente-estilo/card/card";
import { claseXestado, nombreLibroXstring } from "../../../../utils/formatoDatos";
import ItemInternoCard from "./itemInternoCard";
import './itemCard.css';

interface Prop {
  item: PedidoLibroProp;
  idPedido?: string;
  onClick?: (item: PedidoLibroProp) => void;
}

const ItemCard = ({ item, idPedido, onClick }: Prop) => {

  const handleItem = () => {
    if (onClick)
      onClick(item);
  }

  return (
    <Card
      nuevoEstilo={`item-card ${claseXestado(item.estado)} pedido-cliente-card`}
      tituloCard={`${item.detalles || nombreLibroXstring(item.libro)}`}
      onClick={onClick ? handleItem : undefined}
    >
      <ItemInternoCard idPedido={idPedido} item={item} />
    </Card>
  )
}

export default ItemCard