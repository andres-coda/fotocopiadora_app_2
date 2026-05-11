import { MateriaProp } from "../modelo/Entidades/libro/materia.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { FiltroIndividual } from "./filtro.interface";

export const clienteKeyBuscador: (keyof MateriaProp)[] = ['nombre'];

export const filtrosInicialesMateria: filtroLlamada[] = [
  { id: '', estado: false},
]

export const filtrosMateriaFuntion: FiltroIndividual<MateriaProp>[] = [
]