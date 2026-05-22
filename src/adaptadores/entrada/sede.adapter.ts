import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { SedeAdapterProp, SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { baseAdapter } from "./base.adapter";
import { camposBusquedaSede } from "../../filtro/sede.filtro";

export const sedeAdapter = (sede?: SedeAdapterProp): SedeProp | undefined => {
  if (!sede) return undefined;

  const base: BaseProp | undefined = baseAdapter<SedeAdapterProp>({ base: sede, busqueda: camposBusquedaSede });

  if (!base) return undefined;

  const newSede: SedeProp = {
    ...base,
    nombre: sede.nombre,

  }
  return newSede;
}

export const sedeAdapterArray = (sedes?: SedeAdapterProp[]): SedeProp[] => {
  const newSedes: SedeProp[] =
    sedes?.flatMap(s => {
      const sede = sedeAdapter(s);
      return sede ? [sede] : [];
    }) ?? [];

  return newSedes;
}