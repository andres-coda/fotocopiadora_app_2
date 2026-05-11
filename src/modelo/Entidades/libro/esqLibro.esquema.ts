import { z } from "zod";

export const libro = z.object({
  nombre: z.string().min(1, 'El banco debe tener un nombre'),
})

export type formValuesLibro = z.infer<typeof libro>;

export const libroFormDefault: formValuesLibro = {    
  nombre: '',
}
