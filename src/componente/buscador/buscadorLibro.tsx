import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { useSelector } from "react-redux";
import { appStore } from "../../redux/store";
import InputCheckFueraForm from "../formulario/inputCheckFueraForm";
import LibroCard from "../../privado/paginas/libro/componente/libroCard";
import Buscador from "./buscador";
import useBuscador from "../../hooks/buscador/useBuscador";
import { filterContext } from "../../redux/modelo/reduxContext.interface";

const listaSeleccionable = [{ nombre: 'Propuestas' }];

interface Prop {
  libro?: LibroProp;
  setLibro:  (libro: LibroProp) => void
}

const BuscadorLibro = ({ setLibro }: Prop) => {
  const libroContext: filterContext<LibroProp> = useSelector((store: appStore) => store.libro);
  const [opcionesActivas, setOpcionesActivas] = useState<string[]>([]);

  const { elementosFiltrados, valor, setValor } = useBuscador<LibroProp>({
    elementos: libroContext.items,
    sortBy: libroContext.filter.sortBy,
    sortOrder: libroContext.filter.sortOrder,
  });

  const handleClickLibro = (libro: LibroProp) => {
    setLibro(libro);
    setValor('');
  }


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
        texto="Buscar libro"
        etiquetaMas="Nuevo libro"
      />
      {valor.length > 2 && elementosFiltrados.length > 0 &&
        <div className="buscador-desplegable">
          {elementosFiltrados.map(l => <LibroCard libro={l} key={l.id} selecLibro={handleClickLibro} />)}
        </div>
      }
    </div>
  )
};

export default BuscadorLibro;