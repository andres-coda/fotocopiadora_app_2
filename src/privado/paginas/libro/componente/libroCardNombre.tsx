import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import { LibroNombreProp } from "../../../../modelo/Entidades/libro/libro.interface";

interface Prop{
  libro: LibroNombreProp;
  selectLibro?: (libro: LibroNombreProp) => void;
}

export const LibroCardNombre = ({libro, selectLibro}:Prop) => {

  const handleLibro = () => {
    if( selectLibro)
    selectLibro(libro);
  }
  return (
    <Card
      onClick={selectLibro ? handleLibro : undefined}
      tituloCard={libro.nombre}
    >
      <div className="card-vertical">
      <Texto texto={libro.nombre} />
      <Texto texto={`Materia: ${libro.materia.nombre}`} chica/>
      <Texto texto={`Editorial: ${libro.editorial}`} chica/>
      </div>
    </Card>
  )
}

export default LibroCardNombre;