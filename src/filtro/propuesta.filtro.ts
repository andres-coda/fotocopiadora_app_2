import { CampoBusqueda } from "../modelo/Entidades/base/base.interface";
import { PropuestaAdapterProp, PropuestaProp } from "../modelo/Entidades/propuesta/propuesta.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { FiltroIndividual } from "./filtro.interface";

export const propuestaKeyBuscador: (keyof PropuestaProp)[] = ['nombre'];

export const filtrosInicialesPropuesta: filtroLlamada[] = [
  { id: '', estado: false},
]

export const filtrosPropuestaFuntion: FiltroIndividual<PropuestaProp>[] = [
]

export const camposBusquedaPropuesta:CampoBusqueda<PropuestaAdapterProp>[] = [
  p => p.nombre ?? '',
]