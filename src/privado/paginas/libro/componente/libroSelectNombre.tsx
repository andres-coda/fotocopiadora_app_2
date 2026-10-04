import Texto from "../../../../componente-estilo/texto/texto"
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface"
import { nombreLibroXstring } from "../../../../utils/formatoDatos"
import './libroSelect.css'

interface Prop{
  libro:LibroProp;
  nuevoEstilo?: string;
}

const LibroSelectNombre = ({libro, nuevoEstilo = ''}:Prop) => {
  return (
    <div className={`libro-select-nombre ${nuevoEstilo}`} title={nombreLibroXstring(libro)}>
      <Texto texto={nombreLibroXstring(libro)} grande centrado negrita inline />
      <Texto textoResaltado={'Editorial:  '} texto={`${libro.editorial ?? ''}`} chica />
      <Texto textoResaltado={'Materia:  '} texto={`${libro.materia.nombre}`} chica />
    </div>
  )
}

export default LibroSelectNombre
