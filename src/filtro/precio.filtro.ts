import { PrecioFiltrosProp } from '../modelo/Entidades/precio/precioFiltro.interface';

/**
 * Arma el query string de la lista de precios a partir de sus filtros.
 *
 * Cada categoria se emite como un `categoria=<id>` repetido, igual que hace
 * `busquedaQueryParams` con `estado` y `especificacion`. Sin filtros devuelve
 * '' para que el llamador no tenga que decidir el separador.
 */
export const precioQueryParams = (filtros: PrecioFiltrosProp): string =>
  filtros.categorias.map(id => `categoria=${id}`).join('&');

export const hayFiltrosPrecio = (filtros: PrecioFiltrosProp): boolean =>
  filtros.categorias.length > 0;
