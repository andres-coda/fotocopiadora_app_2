import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { ComponenteProp } from "../../modelo/Entidades/libro/componente.interface";
import { LibroAdapterProp, LibroNombreAdapterProp, LibroNombreProp, LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { materiaInicial, MateriaProp } from "../../modelo/Entidades/libro/materia.interface";
import { StockProp } from "../../modelo/Entidades/libro/stock.interface";
import { PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";
import { baseAdapter } from "./base.adapter";
import { componenteAdapterArray } from "./componente.adapter";
import { materiaAdapter } from "./materia.adapter";
import { propuestaAdapterArray } from "./propuesta.adapter";
import { stockAdapter } from "./stock.adapter";

export const libroNombreAdapter = (libro?: LibroNombreAdapterProp): LibroNombreProp | undefined => {
  if (!libro) return undefined;

  const base: BaseProp | undefined = baseAdapter<LibroNombreAdapterProp>({ base: libro});

  if (!base) return undefined;

  const materia: MateriaProp | undefined = libro.materia ? materiaAdapter(libro.materia) : undefined;

  const newLibro: LibroNombreProp = {
    ...base,
    nombre: libro.nombre,
    editorial: libro.editorial,
    materia: materia ?? materiaInicial,
  }
  return newLibro;
}

export const libroAdapter = (libro?: LibroAdapterProp): LibroProp | undefined => {
  if (!libro) return undefined;

  const libroNombre: LibroNombreProp | undefined = libroNombreAdapter(libro);
  if (!libroNombre) return undefined;

  const componentes: ComponenteProp[] = componenteAdapterArray(libro.componentes);

  const stock: StockProp | undefined = libro.resumen ? stockAdapter(libro.resumen) : undefined;
  const propuesta: PropuestaProp[] = propuestaAdapterArray(libro.propuesta);

  const newLibro: LibroProp = {
    ...libroNombre,
    detalleImpresion: libro.detalleImpresion,
    componentes_texto: libro.componentes_texto,
    descripcion: libro.descripcion,
    edicion: libro.edicion,
    nivel: libro.nivel,
    cantidadPg: libro.cantidadPg,
    anio: libro.anio,
    adhesivos: libro.adhesivos ?? 0,
    autor: libro.autor,
    img: libro.img,
    especificacionesDefecto: libro.especificacionesDefecto,
    componentes,
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