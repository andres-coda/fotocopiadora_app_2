/**
 * Filtros de la lista de precios.
 *
 * Solo se filtra por categoria. `categorias` guarda ids y es multi-seleccion:
 * el modal ofrece las categorias no bloqueadas que la empresa usa, porque las
 * bloqueadas ya viven en el lateral.
 */
export interface PrecioFiltrosProp {
  categorias: string[];
}

export const filtrosPrecioInicial: PrecioFiltrosProp = {
  categorias: [],
};
