import { EspecificacionProp } from "../modelo/Entidades/especificacion/especificacion.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { FiltroIndividual } from "./filtro.interface";

export const clienteKeyBuscador: (keyof EspecificacionProp)[] = ['nombre'];

export const filtrosInicialesEspecificacion: filtroLlamada[] = [
  { id: '', estado: false},
]

export const filtrosEspecificacionFuntion: FiltroIndividual<EspecificacionProp>[] = [
]