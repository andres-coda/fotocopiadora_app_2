import { CampoBusqueda } from "../modelo/Entidades/base/base.interface";
import { PedidoLibroAdapterProp, PedidoLibroProp } from "../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { filtroLlamada } from "../redux/modelo/reduxContext.interface";
import { FiltroIndividual } from "./filtro.interface";


export const pedidoLibroKeyBuscador: (keyof PedidoLibroProp)[] = ['cantidad', 'detalles', 'estado'];

export const filtrosInicialesPedidoLibro: filtroLlamada[] = [
  { id: '', estado: false},
]

export const filtrosPedidoLibroFuntion: FiltroIndividual<PedidoLibroProp>[] = [
]

export const camposBusquedaPedidoLibro:CampoBusqueda<PedidoLibroAdapterProp>[] = [
  c => c.detalles ?? '',
  c => c.libro.nombre ?? '',
  c => c.libro.nivel ?? '',
  c => c.libro.editorial ?? '',
  c => c.libro.autor ?? '',
  c => c.libro.anio ?? '',
  c => c.libro.materia?.nombre ?? '',
  c => c.libro.componentes?.map(comp => comp.nombre).join(' ')
]