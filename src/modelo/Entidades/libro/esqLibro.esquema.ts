import { z } from 'zod';
import { LibroCompletoProp, LibroProp } from './libro.interface';
import { transformarComponente } from '../../../utils/componente';
import { ArmadoProp } from '../../../privado/paginas/libro/contexto/contexto.libro';

const libroNombre = z.object({
  nombre: z.string().min(1, 'El libro debe tener un nombre'),
  materia: z.string().min(1, 'El libro debe pertenecer a una materia'),
  editorial: z.string().optional(),
});

export type formValuesLibroNombre = z.infer<typeof libroNombre>;

export const libroComponentes = z.object({
  nivel: z.string().optional(),
  componentes: z.string().optional(),
});

export type formValuesLibroComponentes = z.infer<typeof libroComponentes>;

export const libroDatosExtras = z.object({
  descripcion: z.string().optional(),
  edicion: z.string().optional(),
  anio: z.string().optional(),
  autor: z.string().optional(),
  img: z.string().optional(),
});

export type formValuesLibroDatosExtras = z.infer<typeof libroDatosExtras>;

export const libroDatosLocal = z.object({
  cantidadPg: z
    .string()
    .min(1, 'El libro debe tener cantidad de páginas, para poder calcular los precios'),
  adhesivos: z.string().optional(),
  detalles_impresion: z.string().optional(),
});

export type formValuesLibroDatosLocales = z.infer<typeof libroDatosLocal>;

export const libro = libroNombre
  .extend(libroComponentes.shape)
  .extend(libroDatosExtras.shape)
  .extend(libroDatosLocal.shape);

export type formValuesLibro = formValuesLibroNombre &
  formValuesLibroComponentes &
  formValuesLibroDatosExtras &
  formValuesLibroDatosLocales;

export const libroFormDefault: formValuesLibro = {
  nombre: '',
  descripcion: '',
  editorial: '',
  edicion: undefined,
  nivel: '',
  cantidadPg: '',
  anio: '',
  adhesivos: undefined,
  autor: '',
  img: '',
  materia: '',
  componentes: '',
};

/**
 * Un campo vacio tiene que llegar al formulario como cadena vacia, no como el
 * texto `"undefined"`: un template literal sobre `undefined` devuelve una
 * cadena truthy, que rompe la validacion (por ejemplo `cantidadPg`, donde el
 * `min(1)` de Zod daria por valido un campo que el usuario ve vacio).
 */
const textoFormulario = (valor?: string | number | null): string =>
  valor === undefined || valor === null ? '' : String(valor);

export const libroFormEdit = ({ libro, armado, libroCompleto }: EditProp): formValuesLibro => {
  if (!libro && (!armado?.libroNombre && !armado?.libroPrincipal) && !libroCompleto) return libroFormDefault;
  return {
    ...libroMedioFormEdit({ libro, armado }),
    descripcion: libro?.descripcion || libroCompleto?.descripcion || libroFormDefault.descripcion,
    edicion: textoFormulario(libro?.edicion) || textoFormulario(libroCompleto?.edicion) || libroFormDefault.edicion,
    cantidadPg: textoFormulario(libro?.cantidadPg),
    anio: libro?.anio || libroCompleto?.anio || libroFormDefault.anio,
    adhesivos: textoFormulario(libro?.adhesivos) || libroFormDefault.adhesivos,
    autor: libro?.autor || libroCompleto?.autor || libroFormDefault.autor,
    img: libro?.img || libroCompleto?.img || libroFormDefault.img,
  };
};



export const libroMedio = libroNombre
  .extend(libroComponentes.shape);

export type formValuesLibroMedio = formValuesLibroNombre &
  formValuesLibroComponentes;

export const libroMedioFormDefault: formValuesLibroMedio = {
  nombre: '',
  editorial: '',
  nivel: '',
  materia: '',
  componentes: '',
};

interface EditProp {
  libro?: LibroProp | null;
  armado?: ArmadoProp;
  libroCompleto?:LibroCompletoProp;
}

export const libroMedioFormEdit = ({ libro, armado }: EditProp): formValuesLibroMedio => {
  if (!libro && (!armado?.libroNombre && !armado?.libroPrincipal)) return libroFormDefault;
  return {
    nombre: libro?.nombre || armado?.libroNombre?.nombre || libroFormDefault.nombre,
    editorial: libro?.editorial || armado?.libroNombre?.editorial || libroFormDefault.editorial,
    nivel: libro?.nivel || armado?.libroPrincipal?.nivel || libroFormDefault.nivel,
    materia: libro?.materia.nombre || armado?.libroNombre?.materia || libroFormDefault.materia,
    componentes: transformarComponente(libro?.componentes) || libro?.componentes_texto || armado?.libroPrincipal?.componentes_texto || transformarComponente(armado?.libroPrincipal?.componentes) || libroFormDefault.componentes,
  };
};