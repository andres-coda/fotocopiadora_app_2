import { Dispatch, SetStateAction, useState } from "react";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { useSelector } from "react-redux";
import { appStore } from "../../redux/store";
import InputCheckFueraForm from "../formulario/inputCheckFueraForm";
import LibroCard from "../../privado/paginas/libro/componente/libroCard";
import Buscador from "./buscador";

/* interface BuscadorProp {
  texto?: string;
  setValor: Dispatch<SetStateAction<string>>;
  valor: string;
  handleMas?: MouseEventHandler<HTMLButtonElement>;
  etiquetaMas?: string;
  nuevoEstilo?: string;
  titulo?: string;
} */

interface BuscadorProp {
  setValor: Dispatch<SetStateAction<string>>;
  valor: string;
}

const listaSeleccionable = [{ nombre: 'Propuestas' }];

const BuscadorLibro = ({ valor, setValor }: BuscadorProp) => {
  const libros: LibroProp[] = useSelector((store: appStore) => store.libro.items);
  const [opcionesActivas, setOpcionesActivas] = useState<string[]>([]);

  const coincideBusqueda = (
  libro: LibroProp
) => {

  const palabrasBusqueda = valor
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const textoBusqueda = [
    libro.nombre,
    libro.nivel,
    libro.editorial,
    ...(libro.componentes?.map(c => c.nombre) ?? [])
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return palabrasBusqueda.every(palabra =>
    textoBusqueda.includes(palabra)
  );
};

const librosFiltrados:LibroProp[] = libros.filter(coincideBusqueda);


  return (
    <div>
      <InputCheckFueraForm
        lista={listaSeleccionable}
        setelementosSelect={setOpcionesActivas}
        elementosSelect={opcionesActivas}
      />
      <Buscador
        valor={valor}
        setValor={setValor}
      />
      <div>
        { librosFiltrados.map(l=> <LibroCard libro={l} key={l.id}/>) }
      </div>
    </div>
  )
};

export default BuscadorLibro;