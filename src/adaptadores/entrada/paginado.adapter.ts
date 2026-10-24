export interface PaginadoAdapterProp<T> {
  total?: number;
  limite?: number;
  pagina?: number;
  datos: T[];
}

export interface PaginadoProp<K> {
  total: number;
  limite: number;
  pagina: number;
  datos: K[];
}
// T es el dato de entrada, K es el dato de salida
export const paginadoAdapter = <T, K>(
  pg: PaginadoAdapterProp<T>,
  adapter: (datos?: T) => K | undefined
): PaginadoProp<K> => {
  const datos =
    pg.datos.flatMap(d => {
      const dato = adapter(d);
      return dato ? [dato] : [];
    }) ?? [];

  // El back devuelve pagina y limite como string (vienen de @Query), y
  // useBusquedaPaginada hace `pagina + 1`: sin convertir, "1" + 1 === "11".
  return {
    total: Number(pg.total ?? 0),
    limite: Number(pg.limite ?? 20),
    pagina: Number(pg.pagina ?? 1),
    datos,
  };
};
