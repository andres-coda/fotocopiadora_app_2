import { CampoBusqueda } from "../modelo/Entidades/base/base.interface";
import { PrecioAdapterProp, PrecioProp } from "../modelo/Entidades/precio/precio.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { normalizarTexto } from "../utils/formatoDatos";
import { FiltroIndividual } from "./filtro.interface";

export const precioKeyBuscador: (keyof PrecioProp)[] = ['nombre'];

export const filtrosInicialesPrecio: filtroLlamada[] = [
  { id: '', estado: false },
]

export const filtrosPrecioFuntion: FiltroIndividual<PrecioProp>[] = [
]

export const camposBusquedaPrecio: CampoBusqueda<PrecioAdapterProp>[] = [
  c => ({ valor: normalizarTexto(c.nombre) }),
]