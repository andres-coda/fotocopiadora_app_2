import { z } from "zod";

export const libroStock = z.object({
  stock: z
    .string()
    .min(1, 'Debe agregar al menos un digito')
    .regex(/^\d+$/, 'Solo se permiten números'),
});

export type formValuesLibroStock = z.infer<typeof libroStock>;
