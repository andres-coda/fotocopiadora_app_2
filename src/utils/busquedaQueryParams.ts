/**
 * Arma el query string de una lista a partir de sus filtros y su orden.
 *
 * - Los grupos se repiten como params individuales, no como CSV.
 * - Los grupos vacíos se omiten (sin estados no se emite `estado`, sin fecha no
 *   se emite esa fecha).
 * - Cada criterio de orden se emite como `campo:direccion`, por ejemplo
 *   `orden=fechaEntrega:asc`.
 *
 * Sin el `?` inicial.
 */
export const busquedaQueryParams = (
  filtros: { estado: (string | number)[]; especificaciones: (string | number)[]; entrega: string; tomado: string },
  orden: { campo: string; direccion: string }[]
): string => {
  const params: string[] = [];

  filtros.estado.forEach(e => params.push(`estado=${e}`));
  filtros.especificaciones.forEach(e => params.push(`especificacion=${e}`));

  if (filtros.entrega) params.push(`entrega=${filtros.entrega}`);
  if (filtros.tomado) params.push(`tomado=${filtros.tomado}`);

  orden.forEach(o => params.push(`orden=${o.campo}:${o.direccion}`));

  return params.join('&');
};
