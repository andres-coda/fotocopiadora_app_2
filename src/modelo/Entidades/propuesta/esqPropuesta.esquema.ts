import { z } from "zod";
import { PropuestaProp } from "./propuesta.interface";

export const propuesta = z.object({
  nombre: z.string().min(1, 'La propuesta debe tener un nombre'),
});

export type formValuesPropuesta = z.infer<typeof propuesta>;

export const propuestaFormDefault: formValuesPropuesta = {
  nombre: '',
}

export const propuestaFormEdit = (propuesta?: PropuestaProp | null): formValuesPropuesta => {
  if (!propuesta) return propuestaFormDefault;
  return {
    nombre: propuesta?.nombre || propuestaFormDefault.nombre,
  }
}

