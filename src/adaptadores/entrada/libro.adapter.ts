import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { ComponenteProp } from "../../modelo/Entidades/libro/componente.interface";
import { LibroAdapterProp, LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { materiaInicial, MateriaProp } from "../../modelo/Entidades/libro/materia.interface";
import { StockProp } from "../../modelo/Entidades/libro/stock.interface";
import { baseAdapter } from "./base.adapter";
import { componenteAdapterArray } from "./componente.adapter";
import { materiaAdapter } from "./materia.adapter";
import { stockAdapter } from "./stock.adapter";

export const libroAdapter = (libro?: LibroAdapterProp): LibroProp | undefined => {
  if (!libro) return undefined;

  const base: BaseProp | undefined = baseAdapter(libro);

  if (!base) return undefined;

  const componentes: ComponenteProp[] = componenteAdapterArray(libro.componentes);

  const materia: MateriaProp | undefined = materiaAdapter(libro.materia);
  const stock: StockProp = stockAdapter(libro.stock);

  const newLibro: LibroProp = {
    ...base,
    nombre: libro.nombre,
    descripcion: libro.descripcion,
    editorial: libro.editorial,
    edicion: libro.edicion,
    nivel: libro.nivel,
    cantidadPg: libro.cantidadPg,
    anio: libro.anio,
    adhesivos: libro.adhesivos,
    autor: libro.autor,
    img: libro.img,
    especificacionesDefecto: libro.especificacionesDefecto,
    componentes,
    materia: materia ?? materiaInicial,
    stock,
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