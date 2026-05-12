import { libroDtoProp } from "../../modelo/Entidades/libro/dtoLibro.interface"
import { formValuesLibro } from "../../modelo/Entidades/libro/esqLibro.esquema"

export const libroDtoAdapter = (l: formValuesLibro): libroDtoProp => {
  const newGrupo: libroDtoProp = {
    nombre: l.nombre,
    descripcion: l.descripcion,
    autor: l.autor,
    edicion: l.edicion,
    nivel: l.nivel,
    editorial: l.editorial,
    anio: l.anio,
    img: l.img,
    cantidadPg: l.cantidadPg,
    adhesivos: l.adhesivos,
    materia: l.materia,
    componentes: transformarComponenteArray(l.componentes),
    especificacionesDefecto:[]
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
