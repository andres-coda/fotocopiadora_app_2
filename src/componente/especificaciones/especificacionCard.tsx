import Texto from "../../componente-estilo/texto/texto";
import { Especificaciones } from "../../modelo/Entidades/especificacion/especificacion.enum"
import './especificacionCard.css';

interface Prop{
  listaEspecificaciones?:Especificaciones[];
  horizontal?: boolean;
}

const EspecificacionCard = ({ listaEspecificaciones, horizontal }:Prop) => {
  if(!listaEspecificaciones) return null;
  return (
    <div className={`especificaciones-container ${horizontal ? 'especificaciones-horizontal' : ''}`}>
      <ul>
        {listaEspecificaciones?.map((esp, index) => (
          <li key={`esp-${index}`}><Texto texto={esp} chica/></li>
        ))}
      </ul>
    </div>
  )
}

export default EspecificacionCard
