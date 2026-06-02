import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import EspecificacionCard from "../../../../componente/especificaciones/especificacionCard";
import { PedidoLibroProp } from "../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { transformarEspeAEnum } from "../../../../utils/especificaciones";
import { claseXestado, nombreLibroXstring } from "../../../../utils/formatoDatos";
import './pedidoCard.css'

interface Prop {
  pL: PedidoLibroProp;
}

const PedidoLibroXPedidoCard = ({ pL }: Prop) => {
  const handleClick = () => {

  }

  return (
    <Card
      nuevoEstilo={`pedido-libro-card ${claseXestado(pL.estado)}`}
      onClick={handleClick}
    >
      <Texto texto={`${pL.cantidad}`} mediana ajustado />
      <div className={`card-vertical`}>
        <Texto texto={`${nombreLibroXstring(pL.libro)}`} centrado inline />
        <div className="card-horizontal">
          {pL.detalles && <Texto texto={`Detalles: ${pL.detalles}`} inline chica />}
          <Texto texto={`Sede: ${pL.sede?.nombre ?? ''}`} chica ajustado/>
        </div>
        <EspecificacionCard listaEspecificaciones={transformarEspeAEnum(pL.especificaciones)} horizontal />
      </div>
    </Card>
  )
}

export default PedidoLibroXPedidoCard
