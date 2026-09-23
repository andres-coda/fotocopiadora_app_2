import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import { MateriaProp } from "../../../../modelo/Entidades/libro/materia.interface";

interface Prop {
  materia: MateriaProp;
  selectMateria?: (e: MateriaProp) => void;
}

const MateriaCard = ({ materia, selectMateria }: Prop) => {

  const handleMateria = () => {
    if (selectMateria)
      selectMateria(materia);
  }

  return (
    <Card
      onClick={selectMateria ? handleMateria : undefined}
      tituloCard={materia.nombre}
    >
      <Texto texto={materia.nombre} chica />
    </Card>
  )
}

export default MateriaCard;