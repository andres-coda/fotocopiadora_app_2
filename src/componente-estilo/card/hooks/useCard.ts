import { CardProp } from "../modelo/card.interface";

function useCard({
   chica,
  activo,
  jubilado,
  inactivo,
  ruta,
  nuevoEstilo,
  onClick,
}: CardProp) {

  const clase = [
    chica && 'chica',
    !activo && !jubilado && inactivo && 'inactivo',
    !activo && jubilado && 'jubilado',
    activo && 'activo',
    ruta || onClick && 'card-click',
    nuevoEstilo,
  ]
    .filter(Boolean)
    .join(' ');

  return { clase }
}

export default useCard