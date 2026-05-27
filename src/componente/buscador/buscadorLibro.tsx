import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { useSelector } from "react-redux";
import { appStore } from "../../redux/store";
import InputCheckFueraForm from "../formulario/inputCheckFueraForm";
import LibroCard from "../../privado/paginas/libro/componente/libroCard";
import Buscador from "./buscador";
import useBuscador from "../../hooks/buscador/useBuscador";
import { filterContext } from "../../redux/modelo/reduxContext.interface";
import DesplegableLibros from "./desplegableLibros";

const listaSeleccionable = [{ nombre: 'Todo' },{ nombre: 'Propuestas' },{ nombre: 'Libros' }];

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

  const normalizar=(elementos:string[]):string[]=>{
    return [elementos[elementos.length-1]];
  }
  return (
    <div>
      <InputCheckFueraForm
        lista={listaSeleccionable}
        setelementosSelect={setOpcionesActivas}
        elementosSelect={opcionesActivas}
        normalizar={normalizar}
      />
      <Buscador
        valor={valor}
        setValor={setValor}
        texto="Buscar libro"
        etiquetaMas="Nuevo libro"
      />
<<<<<<< HEAD
      <div>
        {!opcionesActivas.includes('Propuestas') && elementosFiltrados.map(l => <LibroCard libro={l} key={l.id} />)}
      </div>
=======
      {valor.length > 2 && elementosFiltrados.length > 0 &&
        <DesplegableLibros libros={elementosFiltrados} selectLibro={handleClickLibro}/>
      }
>>>>>>> 762bada519971427ec3a6886182f2fffc684d5c9
    </div>
  )
};

export default BuscadorLibro;