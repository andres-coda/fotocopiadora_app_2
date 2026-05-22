import { camposBusquedaEspecificaciones } from "../../filtro/especificacion.filtro";
import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { EspecificacionAdapterProp, EspecificacionProp } from "../../modelo/Entidades/especificacion/especificacion.interface";
import { baseAdapter } from "./base.adapter";

export const especificacionAdapter = (especificacion?: EspecificacionAdapterProp): EspecificacionProp | undefined => {
  if (!especificacion) return undefined;

  const base: BaseProp | undefined = baseAdapter<EspecificacionAdapterProp>({ base: especificacion, busqueda: camposBusquedaEspecificaciones });

  if (!base) return undefined;

  const newEspecificacion: EspecificacionProp = {
    ...base,
    nombre: especificacion.nombre,
  }
  return newEspecificacion;
}

export const especificacionAdapterArray = (especificacions?: EspecificacionAdapterProp[]): EspecificacionProp[] => {
  const newEspecificaciones: EspecificacionProp[] =
    especificacions?.flatMap(e => {
      const especificacion = especificacionAdapter(e);
      return especificacion ? [especificacion] : [];
    }) ?? [];

  return newEspecificaciones;
}