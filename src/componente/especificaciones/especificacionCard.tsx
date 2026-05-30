import Texto from "../../componente-estilo/texto/texto";
import { Especificaciones } from "../../modelo/Entidades/especificacion/especificacion.enum"
import './especificacionCard.css';

interface Prop{
  listaEspecificaciones?:Especificaciones[];
}

const EspecificacionCard = ({ listaEspecificaciones }:Prop) => {
  if(!listaEspecificaciones) return null;
  return (
    <div className={`especificaciones-container`}>
      <ul>
        {listaEspecificaciones?.map((esp, index) => (
          <li key={`esp-${index}`}><Texto texto={esp} chica/></li>
        ))}
      </ul>
    </div>
  )
}

export default EspecificacionCard
