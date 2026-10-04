import Texto from "../../../../componente-estilo/texto/texto";
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface";
import './libroSelect.css';

interface Prop {
  libro: LibroProp;
  nuevoEstilo?: string;
}

const LibroSelectExtra = ({ libro, nuevoEstilo = '' }: Prop) => {
  return (
    <div className={`libro-select-nombre ${nuevoEstilo}`}>
      <Texto textoResaltado={'Año de edición:  '} texto={libro.anio ?? ''} chica />
      <Texto textoResaltado={'Número de edición:  '} texto={`${libro.edicion}`} chica />
      <Texto textoResaltado={'Autor:  '} texto={`${libro.autor ?? ''}`} chica />
    </div>
  )
}

export default LibroSelectExtra
