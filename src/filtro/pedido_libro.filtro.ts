import { CampoBusqueda, TipoBusqueda } from "../modelo/Entidades/base/base.interface";
import { PedidoLibroAdapterProp, PedidoLibroProp } from "../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { FiltroIndividual } from "./filtro.interface";


export const pedidoLibroKeyBuscador: (keyof PedidoLibroProp)[] = ['cantidad', 'detalles', 'estado'];

export const filtrosInicialesPedidoLibro: filtroLlamada[] = [
  { id: '', estado: false },
]

export const filtrosPedidoLibroFuntion: FiltroIndividual<PedidoLibroProp>[] = [
]

export const camposBusquedaPedidoLibro: CampoBusqueda<PedidoLibroAdapterProp>[] = [
  c => ({ valor: c.detalles ?? '' }),
  c => ({ valor: c.libro?.nombre ?? '' }),
  c => ({ valor: c.libro?.nivel ?? '' }),
  c => ({ valor: c.libro?.editorial ?? '' }),
  c => ({ valor: c.libro?.autor ?? '' }),
  c => ({ valor: c.libro?.anio ?? '', tipo: TipoBusqueda.ESTRICTO }),
  c => ({ valor: c.libro?.materia.nombre ?? '' }),
  c => ({ valor: c.libro?.componentes?.map(comp => comp.nombre).join(' ') ?? '' })
]