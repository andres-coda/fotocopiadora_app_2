import { useState } from "react";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { useSelector } from "react-redux";
import { appStore } from "../../redux/store";
import InputCheckFueraForm from "../formulario/inputCheckFueraForm";
import LibroCard from "../../privado/paginas/libro/componente/libroCard";
import Buscador from "./buscador";
import useBuscador from "../../hooks/buscador/useBuscador";
import { filterContext } from "../../redux/modelo/reduxContext.interface";

const listaSeleccionable = [{ nombre: 'Todo' },{ nombre: 'Propuestas' },{ nombre: 'Libros' }];

const BuscadorLibro = () => {
  const libroContext: filterContext<LibroProp> = useSelector((store: appStore) => store.libro);
  const [opcionesActivas, setOpcionesActivas] = useState<string[]>([]);

  const { elementosFiltrados, valor, setValor } = useBuscador<LibroProp>({
    elementos: libroContext.items,
    sortBy: libroContext.filter.sortBy,
    sortOrder: libroContext.filter.sortOrder,
  })

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
      />
      <div>
        {!opcionesActivas.includes('Propuestas') && elementosFiltrados.map(l => <LibroCard libro={l} key={l.id} />)}
      </div>
    </div>
  )
};

export default BuscadorLibro;