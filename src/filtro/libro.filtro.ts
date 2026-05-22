import { CampoBusqueda } from "../modelo/Entidades/base/base.interface";
import { LibroAdapterProp, LibroProp } from "../modelo/Entidades/libro/libro.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { FiltroIndividual } from "./filtro.interface";

export const libroKeyBuscador: (keyof LibroProp)[] = ['nombre', 'nivel', 'componentes', 'editorial'];

export const filtrosInicialesLibro: filtroLlamada[] = [
  { id: '', estado: false },
]

export const filtrosLibroFuntion: FiltroIndividual<LibroProp>[] = [
]

export const camposBusquedaLibro: CampoBusqueda<LibroAdapterProp>[] = [
  c => c.nombre ?? '',
  c => c.editorial ?? '',
  c => c.nivel ?? '',
  c => c.anio ?? '',
  c => c.autor ?? '',
  c => c.materia?.nombre ?? '',
  l => l.componentes?.map(c => c.nombre).join(' ')
]