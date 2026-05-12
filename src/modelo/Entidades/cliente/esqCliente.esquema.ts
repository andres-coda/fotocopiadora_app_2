import { z } from "zod";
import { ClienteProp } from "./cliente.interface";

export const cliente = z.object({
  nombre: z.string().optional(),
  email: z.string().optional(),
  telefono: z
    .union([
      z.string().min(1).refine(
        (val) => {
          const cleaned = val.replace(/[\s\-\(\)]/g, '');
          return /^\+?54?9?\d{8,11}$/.test(cleaned);
        },
        { message: 'Debe ser un número de teléfono válido de Argentina, ej: +5491112345678' }
      ).transform((val) => {
        let cleaned = val.replace(/[\s\-\(\)]/g, '');

        if (cleaned.startsWith('0')) cleaned = cleaned.substring(1);
        if (!cleaned.startsWith('+54') && !cleaned.startsWith('54')) cleaned = '+54' + cleaned;
        if (cleaned.startsWith('54') && !cleaned.startsWith('+')) cleaned = '+' + cleaned;

        return cleaned;
      }),
      z.literal(''),
    ])
    .optional(),
})


export type formValuesCliente = z.infer<typeof cliente>;

export const clienteFormDefault: formValuesCliente = {
  nombre: '',
  email: '',
  telefono: '',
}

export const clienteFormEdit = (cliente?: ClienteProp | null): formValuesCliente => {
  if (!cliente) return clienteFormDefault;
  return {
    nombre: cliente?.nombre || clienteFormDefault.nombre,
    email: cliente?.email || clienteFormDefault.email,
    telefono: cliente?.telefono || clienteFormDefault.telefono,
  }
}