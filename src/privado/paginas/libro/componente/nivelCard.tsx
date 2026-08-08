import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import { NivelProp } from "../../../../modelo/Entidades/libro/nivel.interface";

interface Prop {
  nivel: NivelProp;
  selectNivel?: (c: NivelProp) => void;
}

const NivelCard = ({nivel, selectNivel }: Prop) => {

  const handleNivel = () => {
    if( selectNivel)
    selectNivel(nivel);
  }

  return (
    <Card
      onClick={selectNivel ? handleNivel : undefined}
      tituloCard={nivel.nombre}
    >
        <Texto texto={nivel.nombre} />
    </Card>
  )
}

export default NivelCard;