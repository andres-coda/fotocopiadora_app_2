import { CampoBusqueda, TipoBusqueda } from "../modelo/Entidades/base/base.interface";
import { LibroAdapterProp, LibroProp } from "../modelo/Entidades/libro/libro.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { normalizarTexto } from "../utils/formatoDatos";
import { FiltroIndividual } from "./filtro.interface";

export const libroKeyBuscador: (keyof LibroProp)[] = ['nombre', 'nivel', 'componentes', 'editorial'];

export const filtrosInicialesLibro: filtroLlamada[] = [
  { id: '', estado: false },
]

export const filtrosLibroFuntion: FiltroIndividual<LibroProp>[] = [
]

export const camposBusquedaLibro: CampoBusqueda<LibroAdapterProp>[] = [
  c => ({ valor: normalizarTexto(c.nombre) }),
  c => ({ valor: normalizarTexto(c.editorial) }),
  c => ({ valor: normalizarTexto(c.nivel) }),
  c => ({ valor: normalizarTexto(c.anio), tipo: TipoBusqueda.ESTRICTO }),
  c => ({ valor: normalizarTexto(c.autor) }),
  c => ({ valor: normalizarTexto(c.materia?.nombre)}),
  l => ({
    valor: l.componentes?.map(comp => normalizarTexto(comp?.nombre)).join(' ') ?? ''
  })
]