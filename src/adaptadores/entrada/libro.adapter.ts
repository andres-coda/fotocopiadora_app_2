import { BaseProp } from '../../modelo/Entidades/base/base.interface';
import { ComponenteProp } from '../../modelo/Entidades/libro/componente.interface';
import {
  LibroAdapterProp,
  LibroNombreAdapterProp,
  LibroNombreProp,
  LibroProp,
  EditorialNombreAdapterProp,
  EditorialNombreProp,
  LibroCompletoAdapterProp,
  LibroCompletoProp,
} from '../../modelo/Entidades/libro/libro.interface';
import { materiaInicial, MateriaProp } from '../../modelo/Entidades/libro/materia.interface';
import { StockProp } from '../../modelo/Entidades/libro/stock.interface';
import { PropuestaProp } from '../../modelo/Entidades/propuesta/propuesta.interface';
import { baseAdapter } from './base.adapter';
import { componenteAdapterArray } from './componente.adapter';
import { materiaAdapter } from './materia.adapter';
import { propuestaAdapterArray } from './propuesta.adapter';
import { stockAdapter } from './stock.adapter';

export const editorialNombreAdapter = (
  editorial?: EditorialNombreAdapterProp
): EditorialNombreProp | undefined => {
  if (!editorial) return undefined;

  const base: BaseProp | undefined = baseAdapter<EditorialNombreAdapterProp>({ base: editorial });

  if (!base) return undefined;

  const newEditorial: EditorialNombreProp = {
    ...base,
    nombre: editorial.nombre,
  };
  return newEditorial;
};

export const editorialNombreAdapterArray = (
  editoriales?: EditorialNombreAdapterProp[]
): EditorialNombreProp[] => {
  const newEditoriales: EditorialNombreProp[] =
    editoriales?.flatMap(e => {
      const editorial = editorialNombreAdapter(e);
      return editorial ? [editorial] : [];
    }) ?? [];

  return newEditoriales;
};

export const libroNombreAdapter = (libro?: LibroNombreAdapterProp): LibroNombreProp | undefined => {
  if (!libro) return undefined;

  const base: BaseProp | undefined = baseAdapter<LibroNombreAdapterProp>({ base: libro });

  if (!base) return undefined;

  const materia: MateriaProp | undefined = libro.materia
    ? materiaAdapter(libro.materia)
    : undefined;

  if(!materia) throw new Error(`No hay materia en el libro ${libro.nombre}`)


  const newLibro: LibroNombreProp = {
    ...base,
    nombre: libro.nombre,
    editorial: libro.editorial,
    materia: materia,
  };
  return newLibro;
};

export const libroCompletoAdapter = (libro?: LibroCompletoAdapterProp): LibroCompletoProp | undefined => {
  if (!libro) return undefined;

  const nombre: LibroNombreProp|undefined = libroNombreAdapter(libro);
  if(!nombre) throw new Error(`La base de datos no reporto datos, o reporto datos dañados para el libro buscado`);

  const componentes: ComponenteProp[] = componenteAdapterArray(libro.componentes);

  return {
    ...nombre,
    edicion: libro.edicion,
    nivel: libro.nivel,
    anio: libro.anio,
    autor:libro.autor,
    img: libro.img,
    descripcion: libro.descripcion,
    componentes,
  }
}

export const libroAdapter = (libro?: LibroAdapterProp): LibroProp | undefined => {
  if (!libro) return undefined;

  const libroCompleto: LibroCompletoProp | undefined = libroCompletoAdapter(libro);
  if (!libroCompleto) return undefined;

  const stock: StockProp | undefined = libro.resumen ? stockAdapter(libro.resumen) : undefined;
  const propuesta: PropuestaProp[] = propuestaAdapterArray(libro.propuesta);

  const newLibro: LibroProp = {
    ...libroCompleto,
    detalleImpresion: libro.detalleImpresion,
    cantidadPg: libro.cantidadPg,
    adhesivos: libro.adhesivos ?? 0,
    especificacionesDefecto: libro.especificacionesDefecto,
    stock: stock,
    propuesta: propuesta.length > 0 ? propuesta : undefined,
  };
  return newLibro;
};

export const libroAdapterArray = (libros?: LibroAdapterProp[]): LibroProp[] => {
  const newLibros: LibroProp[] =
    libros?.flatMap(l => {
      const libro = libroAdapter(l);
      return libro ? [libro] : [];
    }) ?? [];

  return newLibros;
};
