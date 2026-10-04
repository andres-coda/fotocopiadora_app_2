import { Especificaciones } from "../../modelo/Entidades/especificacion/especificacion.enum";
import { libroDtoProp, LibroEmresaDtoProp, LibroExtraDtoProp, LibroPrincipalDtoProp } from "../../modelo/Entidades/libro/dtoLibro.interface"
import { formValuesLibroComponentes, formValuesLibroDatosExtras, formValuesLibroDatosLocales, formValuesLibroNombre } from "../../modelo/Entidades/libro/esqLibro.esquema";
import { CrearLibroProp } from "../../servicio/libro/useLibroApi"

interface EditarLibroLocalAdapterProp{
  data:formValuesLibroDatosLocales;
  especificaciones: Especificaciones[];
}

export const libroExtraDtoAdapter = (data:formValuesLibroDatosExtras): LibroExtraDtoProp => {
  const newGrupo: LibroExtraDtoProp = {
    descripcion: data.descripcion,
    autor: data.autor,
    edicion: Number(data.edicion),
    anio: data.anio,
    img: data.img,
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

export const libroPrincipalDtoAdapter = (data: formValuesLibroNombre, componentes: formValuesLibroComponentes ): LibroPrincipalDtoProp => {

  const newGrupo: LibroPrincipalDtoProp = {
    nombre: data.nombre,
    nivel: componentes.nivel,
    editorial: data.editorial,
    materia: data.materia,
    componentes: transformarComponenteArray(componentes.componentes),
  }
  return newGrupo
}

export const libroDtoAdapter = ({data, especificaciones}:CrearLibroProp): libroDtoProp => {

  const newGrupo: libroDtoProp = {
    ...libroExtraDtoAdapter(data),
    ...libroEmpresaEditarDtoAdapter({data, especificaciones}),
    ...libroPrincipalDtoAdapter(data, data)
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