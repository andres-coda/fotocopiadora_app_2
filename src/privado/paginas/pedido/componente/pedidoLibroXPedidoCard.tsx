import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import EspecificacionCard from "../../../../componente/especificaciones/especificacionCard";
import { PedidoLibroProp } from "../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { transformarEspeAEnum } from "../../../../utils/especificaciones";
import { claseXestado, nombreLibroXstring } from "../../../../utils/formatoDatos";

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
        {pL.detalles && <Texto texto={`Detalles: ${pL.detalles}`} inline chica />}
        <div className="card-horizontal">
          <Texto texto={`Sede: ${pL.sede?.nombre ?? ''}`} chica />
        </div>
      </div>
      <EspecificacionCard listaEspecificaciones={transformarEspeAEnum(pL.especificaciones)}/>
    </Card>
  )
}

export default PedidoLibroXPedidoCard
