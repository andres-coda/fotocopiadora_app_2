export interface FiltroIndividual<T> {
  id: string; // Para poder identificar y remover
  filtro: (e: T) => boolean;
}