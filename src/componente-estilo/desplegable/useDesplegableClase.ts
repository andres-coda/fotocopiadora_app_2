import { DesplegableClasProp } from "./desplegable.interface";

const clasChica = (tituloChico:boolean):string =>{
    if(!tituloChico) return `mediana negrita`

    return `inline desplegable-titulo-chico`
  }

const useDesplegableClase = ({
  verde = false, 
  gris = false, 
  tituloChico = false,
  nuevoEstilo = '', 
}:DesplegableClasProp) => {
  const clase = [
    'desplegable-arrow',
    verde && 'desplegable-verde',
    gris && 'desplegable-gris',
    nuevoEstilo
  ]
    .filter(Boolean)
    .join(' ');

  

  const claseTitulo = clasChica(tituloChico);

  return { clase, claseTitulo }
}

export default useDesplegableClase
