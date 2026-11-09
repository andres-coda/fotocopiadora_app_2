import { z } from 'zod';
import { PeticionProp } from './solicitud.interface';

export const peticionEsq = z.object({
  observacion: z.string().optional(),
});

export type formValuesPeticion = z.infer<typeof peticionEsq>;

export const peticionFormDefault: formValuesPeticion = {
  observacion: undefined,
};

export const peticionFormEdit = (peticion?: PeticionProp | null): formValuesPeticion => {
  if (!peticion) return peticionFormDefault;
  return {
    observacion: peticion?.observaciones || peticionFormDefault.observacion,
  };
};
