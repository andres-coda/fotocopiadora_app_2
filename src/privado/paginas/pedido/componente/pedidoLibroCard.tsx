import { useSelector } from "react-redux";
import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import EspecificacionCard from "../../../../componente/especificaciones/especificacionCard";
import { Estado } from "../../../../modelo/Entidades/pedido_libro/estado.enum";
import { PedidoLibroConstruccionProp } from "../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { claseXestado, nombreLibroXstring } from "../../../../utils/formatoDatos";
import { calcularPrecio } from "../../../../utils/precio";
import './pedidoCard.css'
import { PrecioProp } from "../../../../modelo/Entidades/precio/precio.interface";
import { appStore } from "../../../../redux/store";
import { usePedidoContext } from "../../../../contexto/contextoPedido";

interface Prop {
  pL: PedidoLibroConstruccionProp;
  estadoClas: Estado;
}

const PedidoLibroCard = ({ pL, estadoClas }: Prop) => {
  const precios: PrecioProp[] = useSelector((store: appStore) => store.precio.items);
  const {setDatos} = usePedidoContext()

  const handleClick = () => {
    setDatos(prev=>  {
      const pedidos = prev?.pedidos?.filter(p=> p.id != pL.id)??[];
      return {
        pedidos,
        pedidoActual:pL
      }
    })
  }

  return (
    <Card
      nuevoEstilo={`pedido-libro-card ${claseXestado(estadoClas)}`}
      onClick={handleClick}
    >
      <Texto texto={`${pL.cantidad}`} mediana ajustado/>
      <div className={`card-vertical`}>
        <Texto texto={`${nombreLibroXstring(pL.libro)}`} centrado inline/>
        {pL.detalles && <Texto texto={`Detalles: ${pL.detalles}`} inline chica/>}
        <div className="card-horizontal">
        {(estadoClas === Estado.CONSTRUCCION || estadoClas === Estado.POR_CONFIRMAR) && <Texto texto={`Sede: ${pL.sede?.nombre ?? ''}`} chica/>}
        {(estadoClas === Estado.CONSTRUCCION || estadoClas === Estado.POR_CONFIRMAR) && <Texto texto={`$${calcularPrecio({libro:pL.libro, precios, especificaciones: pL.especificaciones, cantidad:pL.cantidad})}`} derecha/>}
        </div>
      </div>
      <EspecificacionCard listaEspecificaciones={pL.especificaciones || pL.libro.especificacionesDefecto} />
    </Card>
  )
}

export default PedidoLibroCard
