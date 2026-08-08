import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import { PrecioNombreProp } from "../../../../modelo/Entidades/precio/precio.interface";

interface Prop {
  precioNombre: PrecioNombreProp;
  selectPrecioNombre?: (c: PrecioNombreProp) => void;
}

const PrecioNombreCard = ({precioNombre, selectPrecioNombre }: Prop) => {

  const handlePrecioNombre = () => {
    if( selectPrecioNombre)
    selectPrecioNombre(precioNombre);
  }

  return (
    <Card
      onClick={selectPrecioNombre ? handlePrecioNombre : undefined}
      tituloCard={precioNombre.nombre}
    >
        <Texto texto={precioNombre.nombre} chica/>
        <Texto texto={precioNombre.abreviatura} chica/>
    </Card>
  )
}

export default PrecioNombreCard;