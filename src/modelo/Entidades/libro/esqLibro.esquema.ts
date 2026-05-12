import { z } from "zod";
import { LibroProp } from "./libro.interface";
import { ComponenteProp } from "./componente.interface";
import { Especificaciones } from "../especificacion/especificacion.enum";

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
  especificacionesDefecto: z.string().optional(),
})

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
  especificacionesDefecto: '',
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
    especificacionesDefecto: transformarEspecificaciones(libro?.especificacionesDefecto),
  }
}

const transformarComponente = (componentes: ComponenteProp[] | undefined): string => {
  if (!componentes) return '';
  return componentes.map(c => c.nombre).join(', ');
}

const transformarEspecificaciones = (esp: Especificaciones[] | undefined): string => {
  if (!esp) return '';
  return esp.map(e => e).join(', ');
}