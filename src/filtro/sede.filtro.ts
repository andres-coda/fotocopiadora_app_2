import { CampoBusqueda } from "../modelo/Entidades/base/base.interface";
import { SedeAdapterProp, SedeProp } from "../modelo/Entidades/sede/sede.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { normalizarTexto } from "../utils/formatoDatos";
import { FiltroIndividual } from "./filtro.interface";

export const sedeKeyBuscador: (keyof SedeProp)[] = ['nombre'];

export const filtrosInicialesSede: filtroLlamada[] = [
  { id: '', estado: false },
]

export const filtrosSedeFuntion: FiltroIndividual<SedeProp>[] = [
]

export const camposBusquedaSede: CampoBusqueda<SedeAdapterProp>[] = [
  c => ({ valor: normalizarTexto(c.nombre) }),
]