import { camposBusquedaPropuesta } from "../../filtro/propuesta.filtro";
import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { PropuestaAdapterProp, PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";
import { baseAdapter } from "./base.adapter";
import { libroAdapterArray } from "./libro.adapter";

export const propuestaAdapter = (propuesta?: PropuestaAdapterProp): PropuestaProp | undefined => {
  if (!propuesta) return undefined;

  const base: BaseProp | undefined = baseAdapter<PropuestaAdapterProp>({ base: propuesta, busqueda: camposBusquedaPropuesta });

  if (!base) return undefined;

  const libros: LibroProp[] = libroAdapterArray(propuesta.libro);

  const newPropuesta: PropuestaProp = {
    ...base,
    cantidadLibros: propuesta.libro.length,
    nombre: propuesta.nombre,
    libro: libros,
  }
  return newPropuesta;
}

export const propuestaAdapterArray = (propuestas?: PropuestaAdapterProp[]): PropuestaProp[] => {
  const newPropuestas: PropuestaProp[] =
    propuestas?.flatMap(p => {
      const propuest = propuestaAdapter(p);
      return propuest ? [propuest] : [];
    }) ?? [];

  return newPropuestas;
}