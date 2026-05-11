import { LibroProp } from "../modelo/Entidades/libro/libro.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { FiltroIndividual } from "./filtro.interface";

export const libroKeyBuscador: (keyof LibroProp)[] = ['nombre', 'nivel', 'componentes', 'editorial'];

export const filtrosInicialesLibro: filtroLlamada[] = [
  { id: '', estado: false},
]

export const filtrosLibroFuntion: FiltroIndividual<LibroProp>[] = [
]