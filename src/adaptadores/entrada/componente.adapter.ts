import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { ComponenteAdapterProp, ComponenteProp } from "../../modelo/Entidades/libro/componente.interface";
import { baseAdapter } from "./base.adapter";

export const componenteAdapter = (componente?:ComponenteAdapterProp):ComponenteProp | undefined=> {
  if(!componente) return undefined;

  const base: BaseProp | undefined= baseAdapter(componente);

  if(!base) return undefined;

  const newComponente: ComponenteProp = {
    ...base,
    nombre: componente.nombre,

  }
  return newComponente;
}

export const componenteAdapterArray = (componentes?: ComponenteAdapterProp[]): ComponenteProp[] => {
  const newComponentes: ComponenteProp[] =
    componentes?.flatMap(c => {
      const componente = componenteAdapter(c);
      return componente ? [componente] : [];
    }) ?? [];

  return newComponentes;
}