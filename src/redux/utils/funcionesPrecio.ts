import { PayloadAction } from '@reduxjs/toolkit';
import { PrecioProp } from '../../modelo/Entidades/precio/precio.interface';
import { ReduxProp, UltimaBusquedaProp, orden } from '../modelo/reduxContext.interface';

const coincideQuery = (precio: PrecioProp, query?: string): boolean => {
  if (!query) return true;
  return (precio.nombre ?? '').toLowerCase().includes(query.toLowerCase());
};

const comparar = (
  a: PrecioProp,
  b: PrecioProp,
  sortBy: keyof PrecioProp,
  sortOrder: orden
): number => {
  const valorA = a[sortBy];
  const valorB = b[sortBy];

  const resultado =
    typeof valorA === 'number' && typeof valorB === 'number'
      ? valorA - valorB
      : String(valorA ?? '').localeCompare(String(valorB ?? ''), 'es', { sensitivity: 'base' });

  return sortOrder === 'desc' ? -resultado : resultado;
};

const insertarSiCoincide = (
  precio: PrecioProp,
  busqueda: UltimaBusquedaProp<PrecioProp>
): UltimaBusquedaProp<PrecioProp> => {
  if (busqueda.datosQuery.some(p => p.id === precio.id)) return busqueda;
  if (busqueda.datosQuery.length >= busqueda.limite) return busqueda;
  if (!coincideQuery(precio, busqueda.query)) return busqueda;

  const datosQuery = [...busqueda.datosQuery, precio].sort((a, b) =>
    comparar(a, b, busqueda.sortBy, busqueda.sortOrder)
  );

  return {
    ...busqueda,
    datosQuery,
    total: busqueda.total + 1,
  };
};

export const agregarPrecioSocket = (
  state: ReduxProp<PrecioProp>,
  action: PayloadAction<PrecioProp>
): void => {
  state.busquedaActual = insertarSiCoincide(action.payload, state.busquedaActual);
  state.datosIniciales = insertarSiCoincide(action.payload, state.datosIniciales);
  state.ultimasBusqueda = state.ultimasBusqueda.map(busqueda =>
    insertarSiCoincide(action.payload, busqueda)
  );
};
