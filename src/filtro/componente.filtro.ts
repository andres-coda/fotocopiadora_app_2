import { ComponenteProp } from "../modelo/Entidades/libro/componente.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { FiltroIndividual } from "./filtro.interface";

export const componenteKeyBuscador: (keyof ComponenteProp)[] = ['nombre'];

export const filtrosInicialesComponente: filtroLlamada[] = [
  { id: '', estado: false},
]

export const filtrosComponenteFuntion: FiltroIndividual<ComponenteProp>[] = [
]