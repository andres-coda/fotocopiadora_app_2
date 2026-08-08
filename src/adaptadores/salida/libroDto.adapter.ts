import { Especificaciones } from "../../modelo/Entidades/especificacion/especificacion.enum"
import { libroDtoProp } from "../../modelo/Entidades/libro/dtoLibro.interface"
import { formValuesLibro } from "../../modelo/Entidades/libro/esqLibro.esquema"

export const libroDtoAdapter = (l: formValuesLibro): libroDtoProp => {
  const newGrupo: libroDtoProp = {
    nombre: l.nombre,
    descripcion: l.descripcion,
    autor: l.autor,
    edicion: Number(l.edicion),
    nivel: l.nivel,
    editorial: l.editorial,
    anio: l.anio,
    img: l.img,
    cantidadPg: Number(l.cantidadPg),
    adhesivos: Number(l.adhesivos),
    materia: l.materia,
    componentes: transformarComponenteArray(l.componentes),
    especificacionesDefecto: especificacionesDefecto(l)
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

const especificacionesDefecto = (l:formValuesLibro):Especificaciones[] => {
  const espDefecto: Especificaciones[] = [];

  if(l.s_f) espDefecto.push(Especificaciones.SIMPLE_FAZ);
  if(l.d_f) espDefecto.push(Especificaciones.DOBLE_FAZ);
  if(l.color) espDefecto.push(Especificaciones.COLOR);
  if(l.byn) espDefecto.push(Especificaciones.BLANCO_Y_NEGRO);
  if(l.adhesivo) espDefecto.push(Especificaciones.ADHESIVO);
  if(l.anillado) espDefecto.push(Especificaciones.ANILLADO);
  if(l.trokelado) espDefecto.push(Especificaciones.TROKELADO);
  
  return espDefecto;
}
