import { camposBusquedaMateria } from "../../filtro/materia.filtro";
import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { MateriaAdapterProp, MateriaProp } from "../../modelo/Entidades/libro/materia.interface";
import { baseAdapter } from "./base.adapter";

export const materiaAdapter = (materia?: MateriaAdapterProp): MateriaProp | undefined => {
  if (!materia) return undefined;

  const base: BaseProp | undefined = baseAdapter<MateriaAdapterProp>({ base: materia, busqueda: camposBusquedaMateria });

  if (!base) return undefined;

  const newMateria: MateriaProp = {
    ...base,
    nombre: materia.nombre,

  }
  return newMateria;
}

export const materiaAdapterArray = (materias?: MateriaAdapterProp[]): MateriaProp[] => {
  const newMaterias: MateriaProp[] =
    materias?.flatMap(m => {
      const materia = materiaAdapter(m);
      return materia ? [materia] : [];
    }) ?? [];

  return newMaterias;
}