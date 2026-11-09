import { useNavigate } from 'react-router-dom';
import { CardProp } from '../modelo/card.interface';
import { MouseEventHandler } from 'react';

function useCard({ 
  listo = false, 
  pendiente = false, 
  retirado =false, 
  cancelado=false, 
  ruta=undefined, 
  nuevoEstilo='', 
  onClick=undefined, 
  limitado=false, 
  gigante=false, 
  estadoClass = '' }: CardProp) {
  const navigate = useNavigate();

  const clase = [
    'card',
    !listo && !pendiente && !cancelado && retirado && 'retirado',
    !listo && !cancelado  && pendiente && 'pendiente',
    !listo && cancelado && 'cancelado',
    listo && 'listo',

    limitado && 'limitado',
    gigante && 'gigante',
    ruta || (onClick && 'card-click'),
    estadoClass,
  ]
    .filter(Boolean)
    .join(' ');

  const claseInterno = [
    'card-interno',
    limitado && 'limitado-interno',
    nuevoEstilo ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick: MouseEventHandler<HTMLDivElement> = event => {
      if (onClick) {
        onClick(event);
      }
  
      if (ruta) {
        navigate(ruta);
      }
    };

  return { clase, claseInterno, handleClick };
}

export default useCard;
