import { CampoBusqueda, TipoBusqueda } from "../modelo/Entidades/base/base.interface";
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
  c => ({ valor: c.nombre ?? '' }),
  c => ({ valor: c.editorial ?? '' }),
  c => ({ valor: c.nivel ?? '' }),
  c => ({ valor: c.anio ?? '', tipo: TipoBusqueda.ESTRICTO }),
  c => ({ valor: c.autor ?? '' }),
  c => ({ valor: c.materia.nombre ?? '' }),
  l => ({
    valor: l.componentes?.map(c => c.nombre ?? '').join(' ') ?? ''
  })
]