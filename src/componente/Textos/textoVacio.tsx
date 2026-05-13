import Texto from "../../componente-estilo/texto/texto"

interface Prop{
  entidad:string;
  filtro?:boolean;
}

const TextoVacio = ({entidad, filtro=false}:Prop) => {
  return (
    <Texto 
      texto={`No hay ${entidad} en la lista ${filtro === true ? `que cumpla con los filtros seleccionados`: ''}`}
      mediana
      centrado
      />
  )
}

export default TextoVacio
