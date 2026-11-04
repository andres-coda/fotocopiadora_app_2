import { DesplegableClasProp } from "./desplegable.interface";

const useDesplegableClase = ({verde, gris, nuevoEstilo = ''}:DesplegableClasProp) => {
  const clase = [
    'desplegable-arrow',
    verde && 'desplegable-verde',
    gris && 'desplegable-gris',
    nuevoEstilo
  ]
    .filter(Boolean)
    .join(' ');

  return { clase }
}

export default useDesplegableClase
