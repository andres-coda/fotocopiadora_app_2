import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { NivelAdapterProp, NivelProp } from "../../modelo/Entidades/libro/nivel.interface";
import { baseAdapter } from "./base.adapter";

export const nivelAdapter = (nivel?: NivelAdapterProp): NivelProp | undefined => {
  if (!nivel) return undefined;

  const base: BaseProp | undefined = baseAdapter<NivelAdapterProp>({ base: nivel });

  if (!base) return undefined;

  const newNivel: NivelProp = {
    ...base,
    nombre: nivel.nombre,

  }
  return newNivel;
}

export const nivelAdapterArray = (nivels?: NivelAdapterProp[]): NivelProp[] => {
  const newNivels: NivelProp[] =
    nivels?.flatMap(c => {
      const nivel = nivelAdapter(c);
      return nivel ? [nivel] : [];
    }) ?? [];

  return newNivels;
}