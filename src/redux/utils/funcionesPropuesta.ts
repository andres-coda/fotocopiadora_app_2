import { PropuestaProp } from '../../modelo/Entidades/propuesta/propuesta.interface';
import { crearAgregarSocket } from './funcionesGenericasEmpresa';

/** La busqueda del back resuelve por nombre (buscarPropuesta usa ILIKE). */
export const coincidePropuesta = (propuesta: PropuestaProp, query?: string): boolean => {
  if (!query) return true;
  return (propuesta.nombre ?? '').toLowerCase().includes(query.toLowerCase());
};

/** Inserta una propuesta recibida por socket respetando busqueda, limite y orden. */
export const agregarPropuestaSocket = crearAgregarSocket<PropuestaProp>(coincidePropuesta);
