import { PropuestaProp } from "../modelo/Entidades/propuesta/propuesta.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { FiltroIndividual } from "./filtro.interface";

export const propuestaKeyBuscador: (keyof PropuestaProp)[] = ['nombre'];

export const filtrosInicialesPropuesta: filtroLlamada[] = [
  { id: '', estado: false},
]

export const filtrosPropuestaFuntion: FiltroIndividual<PropuestaProp>[] = [
]