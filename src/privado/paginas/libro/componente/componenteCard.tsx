import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import { ComponenteProp } from "../../../../modelo/Entidades/libro/componente.interface"

interface Prop {
  componente: ComponenteProp;
  selectComponente?: (c: ComponenteProp) => void;
}

const ComponenteCard = ({componente, selectComponente }: Prop) => {

  const handleComponente = () => {
    if( selectComponente)
    selectComponente(componente);
  }

  return (
    <Card
      onClick={selectComponente ? handleComponente : undefined}
      tituloCard={componente.nombre}
    >
        <Texto texto={componente.nombre} chica/>
    </Card>
  )
}

export default ComponenteCard;