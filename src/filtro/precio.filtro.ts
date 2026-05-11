import { PrecioProp } from "../modelo/Entidades/precio/precio.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { FiltroIndividual } from "./filtro.interface";

export const precioKeyBuscador: (keyof PrecioProp)[] = ['nombre'];

export const filtrosInicialesPrecio: filtroLlamada[] = [
  { id: '', estado: false},
]

export const filtrosPrecioFuntion: FiltroIndividual<PrecioProp>[] = [
]