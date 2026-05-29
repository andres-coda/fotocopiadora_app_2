import { camposBusquedaLibro } from "../../filtro/libro.filtro";
import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { ComponenteProp } from "../../modelo/Entidades/libro/componente.interface";
import { LibroAdapterProp, LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { materiaInicial, MateriaProp } from "../../modelo/Entidades/libro/materia.interface";
import { StockProp } from "../../modelo/Entidades/libro/stock.interface";
import { PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";
import { baseAdapter } from "./base.adapter";
import { componenteAdapterArray } from "./componente.adapter";
import { materiaAdapter } from "./materia.adapter";
import { propuestaAdapterArray } from "./propuesta.adapter";
import { stockAdapter } from "./stock.adapter";

export const libroAdapter = (libro?: LibroAdapterProp): LibroProp | undefined => {
  if (!libro) return undefined;

  const base: BaseProp | undefined = baseAdapter<LibroAdapterProp>({ base: libro, busqueda: camposBusquedaLibro });

  if (!base) return undefined;
  
  const componentes: ComponenteProp[] = componenteAdapterArray(libro.componentes);

  const materia: MateriaProp | undefined = libro.materia ? materiaAdapter(libro.materia) : undefined;
  const stock: StockProp | undefined = libro.stock ? stockAdapter(libro.stock) : undefined;
  const propuesta: PropuestaProp[] = propuestaAdapterArray(libro.propuesta);

  const newLibro: LibroProp = {
    ...base,
    nombre: libro.nombre,
    descripcion: libro.descripcion,
    editorial: libro.editorial,
    edicion: libro.edicion,
    nivel: libro.nivel,
    cantidadPg: libro.cantidadPg,
    anio: libro.anio,
    adhesivos: libro.adhesivos ?? 0,
    autor: libro.autor,
    img: libro.img,
    especificacionesDefecto: libro.especificacionesDefecto,
    componentes,
    materia: materia ?? materiaInicial,
    stock: stock,
    propuesta: propuesta.length > 0 ? propuesta : undefined
  }
  return newLibro;
}

export const libroAdapterArray = (libros?: LibroAdapterProp[]): LibroProp[] => {
  const newLibros: LibroProp[] =
    libros?.flatMap(l => {
      const libro = libroAdapter(l);
      return libro ? [libro] : [];
    }) ?? [];

  return newLibros;
}