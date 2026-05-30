import { Dispatch, SetStateAction, useState } from "react";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { filterContext } from "../../redux/modelo/reduxContext.interface";
import { PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";
import { useSelector } from "react-redux";
import { appStore } from "../../redux/store";
import { filtrosLibroFuntion } from "../../filtro/libro.filtro";
import useBuscadorCompleto from "../../hooks/buscador/useBuscadorCompleto";
import BuscadorFiltros from "./buscadorCompleto";
import { rutaPrivadaBase, RutasPrivadas } from "../../privado/rutas/rutasPrivadas";
import DesplegableConteiner from "../../componente-estilo/deslegable/desplegableConteiner";
import PropuestaCard from "../../privado/paginas/propuesta/componente/propuestaCard";
import LibroCard from "../../privado/paginas/libro/componente/libroCard";
import TextoVacio from "../Textos/textoVacio";
import './buscador.css'

const listaSeleccionable = [{ nombre: 'Todo' }, { nombre: 'Propuestas' }, { nombre: 'Libros' }];

const normalizar = (elementos: string[]): string[] => {
  return [elementos[elementos.length - 1]];
}

interface Prop {
  setLibros: (Dispatch<SetStateAction<LibroProp[]>>);
}

const BuscadorLibro = ({ setLibros }: Prop) => {
  const libroContext: filterContext<LibroProp> = useSelector((store: appStore) => store.libro);
  const propuestas: PropuestaProp[] = useSelector((store: appStore) => store.propuesta.items);

  const [opcionesActivas, setOpcionesActivas] = useState<string[]>([listaSeleccionable[0].nombre]);
  const { elementosFiltrados, contenedorRef, valor, setValor, nuevoElemento, retornoPropuestas } = useBuscadorCompleto<LibroProp>({
    estadoFiltros: libroContext.filter.filtros,
    filtros: [...filtrosLibroFuntion],
    elementos: libroContext.items,
    sortBy: libroContext.filter.sortBy,
    sortOrder: libroContext.filter.sortOrder,
    propuestas,
  });

  const handlePropuesta = (propuesta: PropuestaProp): void => {
    const libros: LibroProp[] = propuesta.libro ?? [];
    setLibros(prev => [...prev, ...libros]);
  }

  const handleLibro = (libro: LibroProp): void => {
    setLibros(prev => [...prev, libro]);
  }

  return (
    <div className="buscador-libro">
      <BuscadorFiltros
        ref={contenedorRef}
        texto='Buscar libro'
        handleMas={() => nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO_CARGAR}`)}
        valor={valor}
        setValor={setValor}
        etiquetaMas='Nueva libro'
        opcionesActivas={opcionesActivas}
        setOpcionesActivas={setOpcionesActivas}
        normalizar={normalizar}
        listaSeleccionable={listaSeleccionable}
      />
      {valor.length < 3
        ? null
        : <DesplegableConteiner>
          {
            !opcionesActivas.includes(listaSeleccionable[2].nombre) &&
            retornoPropuestas.map(p => <PropuestaCard propuesta={p} key={p.id} selecPropuesta={handlePropuesta} />)
          }
          {
            !opcionesActivas.includes(listaSeleccionable[1].nombre) && elementosFiltrados.length > 0 &&
            elementosFiltrados
              .map(dato => (
                <LibroCard libro={dato} key={dato.id} selecLibro={handleLibro} />
              ))
          }
          {
            elementosFiltrados.length === 0 || (retornoPropuestas.length === 0 && !opcionesActivas.includes(listaSeleccionable[2].nombre)) &&
            <TextoVacio entidad='libros, ni propuestas de pedidos' />
          }
        </DesplegableConteiner>
      }

    </div>
  )
};

export default BuscadorLibro;