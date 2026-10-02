import { Especificaciones } from "../../modelo/Entidades/especificacion/especificacion.enum";
import { libroDtoProp, LibroEmresaDtoProp } from "../../modelo/Entidades/libro/dtoLibro.interface"
import { formValuesLibroDatosLocales } from "../../modelo/Entidades/libro/esqLibro.esquema";
import { CrearLibroProp } from "../../servicio/libro/useLibroApi"

interface EditarLibroLocalAdapterProp{
  data:formValuesLibroDatosLocales;
  especificaciones: Especificaciones[];
}

export const libroDtoAdapter = ({data, especificaciones}:CrearLibroProp): libroDtoProp => {
  const newGrupo: libroDtoProp = {
    nombre: data.nombre,
    descripcion: data.descripcion,
    autor: data.autor,
    edicion: Number(data.edicion),
    nivel: data.nivel,
    editorial: data.editorial,
    anio: data.anio,
    img: data.img,
    cantidadPg: Number(data.cantidadPg),
    adhesivos: Number(data.adhesivos),
    materia: data.materia,
    componentes: transformarComponenteArray(data.componentes),
    especificacionesDefecto: especificaciones
  }
  return newGrupo
}

export const libroEmpresaEditarDtoAdapter = ({data, especificaciones}:EditarLibroLocalAdapterProp): LibroEmresaDtoProp => {
  const newGrupo: LibroEmresaDtoProp = {
    cantidadPg: Number(data.cantidadPg),
    adhesivos: Number(data.adhesivos),
    especificacionesDefecto: especificaciones,
    detalle_impresion: data.detalles_impresion
  }
  return newGrupo
}

const transformarComponenteArray = (c: string | undefined): string[] => {
  if (!c) return []
  return c
    .split(',')
    .map(x => x.trim())
    .filter(Boolean);
}