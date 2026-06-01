import { CampoBusqueda, TipoBusqueda } from "../modelo/Entidades/base/base.interface";
import { PedidoLibroAdapterProp, PedidoLibroProp } from "../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { normalizarTexto } from "../utils/formatoDatos";
import { FiltroIndividual } from "./filtro.interface";


export const pedidoLibroKeyBuscador: (keyof PedidoLibroProp)[] = ['cantidad', 'detalles', 'estado'];

export const filtrosInicialesPedidoLibro: filtroLlamada[] = [
  { id: '', estado: false },
]

export const filtrosPedidoLibroFuntion: FiltroIndividual<PedidoLibroProp>[] = [
]

export const camposBusquedaPedidoLibro: CampoBusqueda<PedidoLibroAdapterProp>[] = [
  c => ({ valor: normalizarTexto(c.detalles) }),
  c => ({ valor: normalizarTexto(c.libro?.nombre) }),
  c => ({ valor: normalizarTexto(c.libro?.nivel) }),
  c => ({ valor: normalizarTexto(c.libro?.editorial) }),
  c => ({ valor: normalizarTexto(c.libro?.autor) }),
  c => ({ valor: normalizarTexto(c.libro?.anio), tipo: TipoBusqueda.ESTRICTO }),
  c => ({ valor: normalizarTexto(c.libro?.materia?.nombre) }),
  c => ({ valor: c.libro?.componentes?.map(comp => normalizarTexto(comp.nombre)).join(' ') ?? '' })
]