import { PrecioProp } from '../../modelo/Entidades/precio/precio.interface';
import { crearAgregarSocket } from './funcionesGenericasEmpresa';

export const coincidePrecio = (precio: PrecioProp, query?: string): boolean => {
  if (!query) return true;
  return (precio.nombre ?? '').toLowerCase().includes(query.toLowerCase());
};

/** Inserta un precio recibido por socket respetando busqueda, limite y orden. */
export const agregarPrecioSocket = crearAgregarSocket<PrecioProp>(coincidePrecio);
