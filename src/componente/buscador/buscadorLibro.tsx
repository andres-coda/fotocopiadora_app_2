import { useMemo, useState } from "react";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { useSelector } from "react-redux";
import { appStore } from "../../redux/store";
import InputCheckFueraForm from "../formulario/inputCheckFueraForm";
import Buscador from "./buscador";
import useBuscador from "../../hooks/buscador/useBuscador";
import { filterContext } from "../../redux/modelo/reduxContext.interface";
import DesplegableLibros from "./desplegableLibros";
import { PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";

const listaSeleccionable = [{ nombre: 'Todo' }, { nombre: 'Propuestas' }, { nombre: 'Libros' }];

interface PropuestaAgregada {
  id: string;               // id de la propuesta
  nombre: string;           // nombre de la propuesta
  cantidadLibros: number;   // del campo cantidadLibros de PropuestaProp
  libros: LibroProp[];      // libros filtrados que tienen esta propuesta
}

interface Prop {
  libro?: LibroProp;
  setLibro: (libro: LibroProp) => void
}

const BuscadorLibro = ({ setLibro }: Prop) => {
  const libroContext: filterContext<LibroProp> = useSelector((store: appStore) => store.libro);
  const [opcionesActivas, setOpcionesActivas] = useState<string[]>([]);

  const { elementosFiltrados, valor, setValor } = useBuscador<LibroProp>({
    elementos: libroContext.items,
    sortBy: libroContext.filter.sortBy,
    sortOrder: libroContext.filter.sortOrder,
  });

  const propuestasAgregadas = useMemo((): PropuestaProp[] => {
    const map = new Map<string, PropuestaProp>();

    for (const libro of elementosFiltrados) {
      if (!libro.propuesta) continue;

      for (const propuesta of libro.propuesta) {
        if (map.has(propuesta.id)) {
          const existing = map.get(propuesta.id)!;
          // ✅ Nuevo array en lugar de mutar el existente
          map.set(propuesta.id, {
            ...existing,
            libro: [...(existing.libro ?? []), libro],
            cantidadLibros: existing.cantidadLibros + 1,
          });
        } else {
          map.set(propuesta.id, {
            id: propuesta.id,
            nombre: propuesta.nombre,
            libro: [libro],
            cantidadLibros: 1,
            campoBusqueda: [{ valor: propuesta.nombre }],
            deleted: false,
            ultAct: ''
          });
        }
      }
    }

    return Array.from(map.values());
  }, [elementosFiltrados]);

  const handleClickLibro = (libro: LibroProp) => {
    setLibro(libro);
    setValor('');
  }

  const normalizar = (elementos: string[]): string[] => {
    return [elementos[elementos.length - 1]];
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
      {valor.length > 2 && elementosFiltrados.length > 0 &&
        <DesplegableLibros libros={elementosFiltrados} selectLibro={handleClickLibro} />
      }
    </div>
  )
};

export default BuscadorLibro;