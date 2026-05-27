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
  listo = undefined,
  pendiente = undefined,
  retirado = undefined,
  onClick = undefined,
  nuevoEstilo = undefined,
  ruta = undefined,
  tituloCard = undefined
}: CardPropComp) {
  const { clase } = useCard({
    listo,
    pendiente,
    retirado,
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
    <div className={`card ${clase}`} onClick={handleClick} title={tituloCard}>
      {ultActualizacion && <Texto texto={ultAct} chica sombra derecha />}

      {children}
    </div>
  )
}