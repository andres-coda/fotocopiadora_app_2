import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import { EditorialNombreProp } from "../../../../modelo/Entidades/libro/libro.interface";

interface Prop {
  editorial: EditorialNombreProp;
  selectEditorial?: (e: EditorialNombreProp) => void;
}

const EditorialCard = ({ editorial, selectEditorial }: Prop) => {

  const handleEditorial = () => {
    if (selectEditorial)
      selectEditorial(editorial);
  }

  return (
    <Card
      onClick={selectEditorial ? handleEditorial : undefined}
      tituloCard={editorial.nombre}
    >
      <Texto texto={editorial.nombre} chica />
    </Card>
  )
}

export default EditorialCard;