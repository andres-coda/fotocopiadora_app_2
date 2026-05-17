import { z } from "zod";
import { LibroProp } from "./libro.interface";
import { Especificaciones } from "../especificacion/especificacion.enum";
import { transformarComponente } from "../../../utils/componente";
import { transformarEspecificaciones } from "../../../utils/especificaciones";

export const libro = z.object({
  nombre: z.string().min(1, 'El libro debe tener un nombre'),
  descripcion: z.string().optional(),
  editorial: z.string().optional(),
  edicion: z.number().optional(),
  nivel: z.string().optional(),
  cantidadPg: z.number().min(1, 'El libro debe tener cantidad de páginas, para poder calcular los precios'),
  anio: z.string().optional(),
  adhesivos: z.number().optional(),
  autor: z.string().optional(),
  img: z.string().optional(),
  materia: z.string().min(1, 'El libro debe pertenecer a una materia'),
  componentes: z.string().optional(),
  color: z.boolean().optional(),
  byn: z.boolean().optional(),
  anillado: z.boolean().optional(),
  d_f: z.boolean().optional(),
  s_f: z.boolean().optional(),
  adhesivo: z.boolean().optional(),
})
  .superRefine((data, ctx) => {
    const incompatibles = [
      {
        a: 'color',
        b: 'byn',
        mensaje: 'No puede ser color y blanco y negro al mismo tiempo',
      },
      {
        a: 'd_f',
        b: 's_f',
        mensaje: 'No puede ser doble y simple faz al mismo tiempo',
      },
    ] as const;

    incompatibles.forEach(({ a, b, mensaje }) => {
      if (data[a] && data[b]) {
        ctx.addIssue({
          code: 'custom',
          message: mensaje,
          path: [a],
        });
        ctx.addIssue({
          code: 'custom',
          message: mensaje,
          path: [b],
        });
      }
    });
  });

export type formValuesLibro = z.infer<typeof libro>;

export const libroFormDefault: formValuesLibro = {
  nombre: '',
  descripcion: '',
  editorial: '',
  edicion: undefined,
  nivel: '',
  cantidadPg: 0,
  anio: '',
  adhesivos: undefined,
  autor: '',
  img: '',
  materia: '',
  componentes: '',
  color: true,
  byn: false,
  anillado: true,
  d_f: true,
  s_f: false,
  adhesivo: false,
}

export const libroFormEdit = (libro?: LibroProp | null): formValuesLibro => {
  if (!libro) return libroFormDefault;
  return {
    nombre: libro?.nombre || libroFormDefault.nombre,
    descripcion: libro?.descripcion || libroFormDefault.descripcion,
    editorial: libro?.editorial || libroFormDefault.editorial,
    edicion: libro?.edicion || libroFormDefault.edicion,
    nivel: libro?.nivel || libroFormDefault.nivel,
    cantidadPg: libro?.cantidadPg || libroFormDefault.cantidadPg,
    anio: libro?.anio || libroFormDefault.anio,
    adhesivos: libro?.adhesivos || libroFormDefault.adhesivos,
    autor: libro?.autor || libroFormDefault.autor,
    img: libro?.img || libroFormDefault.img,
    materia: libro?.materia.nombre || libroFormDefault.materia,
    componentes: transformarComponente(libro?.componentes),
    color: transformarEspecificaciones(libro.especificacionesDefecto, Especificaciones.COLOR),
    byn: transformarEspecificaciones(libro.especificacionesDefecto, Especificaciones.BLANCO_Y_NEGRO),
    anillado: transformarEspecificaciones(libro.especificacionesDefecto, Especificaciones.ANILLADO),
    d_f: transformarEspecificaciones(libro.especificacionesDefecto, Especificaciones.DOBLE_FAZ),
    s_f: transformarEspecificaciones(libro.especificacionesDefecto, Especificaciones.SIMPLE_FAZ),
    adhesivo: transformarEspecificaciones(libro.especificacionesDefecto, Especificaciones.ADHESIVO),
  }
}

