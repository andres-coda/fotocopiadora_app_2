import { CampoBusqueda } from "../modelo/Entidades/base/base.interface";
import { EspecificacionAdapterProp, EspecificacionProp } from "../modelo/Entidades/especificacion/especificacion.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { FiltroIndividual } from "./filtro.interface";

export const clienteKeyBuscador: (keyof EspecificacionProp)[] = ['nombre'];

export const filtrosInicialesEspecificacion: filtroLlamada[] = [
  { id: '', estado: false},
]

export const filtrosEspecificacionFuntion: FiltroIndividual<EspecificacionProp>[] = [
]

export const camposBusquedaEspecificaciones:CampoBusqueda<EspecificacionAdapterProp>[] = [
  c => c.nombre ?? '',
]