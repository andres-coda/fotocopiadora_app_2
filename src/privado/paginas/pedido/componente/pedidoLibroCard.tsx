import Texto from "../../../../componente-estilo/texto/texto";
import EspecificacionCard from "../../../../componente/especificaciones/especificacionCard";
import usePresupuesto from "../../../../hooks/presupuesto/usePresupuesto";
import { Especificaciones } from "../../../../modelo/Entidades/especificacion/especificacion.enum";
import { Estado } from "../../../../modelo/Entidades/pedido_libro/estado.enum";
import { PedidoLibroConstruccionProp } from "../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { nombreLibroXstring } from "../../../../utils/formatoDatos";

interface Prop{
  pL: PedidoLibroConstruccionProp;
  estadoClas: Estado;
  especificaciones?:Especificaciones[]
}

const PedidoLibroCard = ({pL, estadoClas, especificaciones}:Prop) => {
  const {precioSolo} = usePresupuesto({libro:pL.libro, nuevasEsp:especificaciones})
  return (
    <div className={`libro-pedido-card  ${estadoClas}`} >
      <Texto texto={`${pL.cantidad}`} mediana/>
      <div className={`libro-pedido-card-centro`}>
        <Texto texto={`${nombreLibroXstring(pL.libro)}`} mediana/>
        {pL.detalles && <Texto texto={`${pL.detalles}`} mediana/>}
        {(estadoClas === Estado.CONSTRICCION || estadoClas === Estado.POR_CONFIRMAR) && <Texto texto={`$${precioSolo}`}/> }
      </div>
      <EspecificacionCard listaEspecificaciones={especificaciones || pL.libro.especificacionesDefecto} />
    </div>
  )
}

export default PedidoLibroCard
