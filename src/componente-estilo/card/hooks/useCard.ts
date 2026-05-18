import { CardProp } from "../modelo/card.interface";

function useCard({
   chica,
  listo,
  pendiente,
  retirado,
  ruta,
  nuevoEstilo,
  onClick,
}: CardProp) {

  const clase = [
    chica && 'chica',
    !listo && !pendiente && retirado && 'retirado',
    !listo && pendiente && 'pendiente',
    listo && 'listo',
    ruta || onClick && 'card-click',
    nuevoEstilo,
  ]
    .filter(Boolean)
    .join(' ');

  return { clase }
}

export default useCard