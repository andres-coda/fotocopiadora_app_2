import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import usePresupuesto from "../../../../hooks/presupuesto/usePresupuesto";
import { Especificaciones } from "../../../../modelo/Entidades/especificacion/especificacion.enum";
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface";
import { especificacionEnumXString } from "../../../../utils/especificaciones";
import { nombreLibroXstring } from "../../../../utils/formatoDatos";

interface Props {
  libro: LibroProp;
  cantidad: number;
  detalles: string;
  esp?: Especificaciones[];
  editando?:boolean;
}

const LibroCardPedido = ({ libro, cantidad, detalles, esp, editando }: Props) => {
  const { precioSolo, presupuesto } = usePresupuesto({ libro });
  const especificaciones = esp ?? libro.especificacionesDefecto ?? [];

  return (
    <Card
      nuevoEstilo={`card-libro enProceso ${!editando ? 'retirado' : ''}`}
      tituloCard={nombreLibroXstring(libro)}
    >
      <div className="card-horizontal card-libro-pedido">
        <Texto texto={`${cantidad}`} negrita mediana nuevoEstilo="cantidad-libro-card"/>
        <div className="card-vertical card-libro-pedido-vertical">
          <Texto texto={nombreLibroXstring(libro)} chica />
          <Texto texto={detalles} chica />
          <Texto texto={`Precio: $${precioSolo}`} chica etiqueta={presupuesto}/>
        </div>
        <ul>
          {
            especificaciones.length > 0
              && especificaciones.map(e => <li className={`${editando ? 'retirado' : ''}`}>{especificacionEnumXString(e)}</li>)
          }
        </ul>
      </div>
    </Card>
  )
}

export default LibroCardPedido