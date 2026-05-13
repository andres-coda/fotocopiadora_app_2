import { z } from "zod";
import { SedeProp } from "./sede.interface";

export const sede = z.object({
  nombre: z.string().min(1, { message: 'La sede debe tener un nombre'}),
})


export type formValuesSede = z.infer<typeof sede>;

export const sedeFormDefault: formValuesSede = {
  nombre: '',
}

export const sedeFormEdit = (sede?: SedeProp| null): formValuesSede => {
  if (!sede) return sedeFormDefault;
  return {
    nombre: sede?.nombre || sedeFormDefault.nombre,
  }
}