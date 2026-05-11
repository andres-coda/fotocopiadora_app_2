import './card.css'
import Texto from "../texto/texto";
import { CardPropComp } from "./modelo/card.interface";
import useCard from './hooks/useCard';
import { useNavigate } from 'react-router-dom';
import { MouseEventHandler } from 'react';

export default function Card({
  children,
  ultActualizacion = undefined,
  chica = undefined,
  activo = undefined,
  jubilado = undefined,
  inactivo = undefined,
  onClick = undefined,
  nuevoEstilo = undefined,
  ruta = undefined
}: CardPropComp) {
  const { clase } = useCard({
    activo,
    jubilado,
    inactivo,
    ruta,
    nuevoEstilo,
    onClick
  })
  const navigate = useNavigate();
  const ultAct: string = chica
    ? `Últ. act.: ${ultActualizacion}`
    : `Última actualización ${ultActualizacion}`;

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {

    if (onClick) {
      onClick(event);
    }

    if (ruta) {
      navigate(ruta);
    }
  }

  return (
    <div className={`card ${clase}`} onClick={handleClick}>
      {ultActualizacion && <Texto texto={ultAct} chica sombra derecha />}

      {children}
    </div>
  )
}