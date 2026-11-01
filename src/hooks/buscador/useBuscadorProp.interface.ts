import { UnknownAction } from '@reduxjs/toolkit';
import { ordenProp } from '../../modelo/orden/esqOrden.esquema';
import { BaseProp } from '../../modelo/Entidades/base/base.interface';

/**
 * Props del hook `useOrden`.
 *
 * Antes extendia de `useBuscadorCompletoProp`, una interfaz del hook
 * `useBuscadorCompleto` que ya no existe. Ahora declara sus propios campos
 * para no arrastrar dependencias muertas ni tipos sin uso.
 */
export interface useOrdenProp<T extends BaseProp> {
  sortBy: keyof T;
  sortOrder?: 'asc' | 'desc';
  setOrden: (e: ordenProp<T>) => UnknownAction;
}
