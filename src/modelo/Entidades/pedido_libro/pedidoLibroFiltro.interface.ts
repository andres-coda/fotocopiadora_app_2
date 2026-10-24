import { Especificaciones } from '../especificacion/especificacion.enum';
import { Estado } from './estado.enum';

/**
 * Filtros de la lista de items (pedidoLibro).
 * Cada arreglo es multi-selección; las fechas usan '' para indicar "sin filtro"
 * y el formato 'YYYY-MM-DD' cuando tienen valor.
 */
export interface PedidoLibroFiltrosProp {
  estado: Estado[];
  especificaciones: Especificaciones[];
  entrega: string;
  tomado: string;
}

export type PedidoLibroOrdenCampo = 'fechaEntrega' | 'fechaCreacion' | 'libro' | 'cliente';

/** Un criterio de orden. El arreglo completo define la prioridad (primario, secundario, ...). */
export interface PedidoLibroOrdenProp {
  campo: PedidoLibroOrdenCampo;
  direccion: 'asc' | 'desc';
}

export const filtrosPedidoLibroInicial: PedidoLibroFiltrosProp = {
  estado: [],
  especificaciones: [],
  entrega: '',
  tomado: '',
};

export const ordenPedidoLibroInicial: PedidoLibroOrdenProp[] = [
  { campo: 'fechaEntrega', direccion: 'asc' },
];
