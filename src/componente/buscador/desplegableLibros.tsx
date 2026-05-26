import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import LibroCard from "../../privado/paginas/libro/componente/libroCard";

interface Prop {
  libros: LibroProp[];
  selectLibro: (libro: LibroProp) => void
}

const DesplegableLibros = ({ libros, selectLibro }: Prop) => {
  return (
    <div className="buscador-desplegable">
      {libros.map(l => <LibroCard libro={l} key={l.id} selecLibro={selectLibro} />)}
    </div>
  )
}

export default DesplegableLibros
