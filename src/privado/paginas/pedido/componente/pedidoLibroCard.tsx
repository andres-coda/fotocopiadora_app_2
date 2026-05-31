import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import EspecificacionCard from "../../../../componente/especificaciones/especificacionCard";
import usePresupuesto from "../../../../hooks/presupuesto/usePresupuesto";
import { Estado } from "../../../../modelo/Entidades/pedido_libro/estado.enum";
import { PedidoLibroConstruccionProp } from "../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { claseXestado, nombreLibroXstring } from "../../../../utils/formatoDatos";
import './pedidoCard.css'

interface Prop {
  pL: PedidoLibroConstruccionProp;
  estadoClas: Estado;
}

const PedidoLibroCard = ({ pL, estadoClas }: Prop) => {
  const { precioSolo } = usePresupuesto({ libro: pL.libro, nuevasEsp: pL.esp })
  return (
    <Card
      nuevoEstilo={`pedido-libro-card ${claseXestado(estadoClas)}`}
    >
      <Texto texto={`${pL.cantidad}`} mediana ajustado/>
      <div className={`card-vertical`}>
        <Texto texto={`${nombreLibroXstring(pL.libro)}`} centrado inline/>
        {pL.detalles && <Texto texto={`Detalles: ${pL.detalles}`} inline chica/>}
        {(estadoClas === Estado.CONSTRUCCION || estadoClas === Estado.POR_CONFIRMAR) && <Texto texto={`$${precioSolo}`} derecha/>}
      </div>
      <EspecificacionCard listaEspecificaciones={pL.esp || pL.libro.especificacionesDefecto} />
    </Card>
  )
}

export default PedidoLibroCard
