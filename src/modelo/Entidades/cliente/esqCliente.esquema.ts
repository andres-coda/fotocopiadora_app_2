import { z } from "zod";
import { ClienteProp } from "./cliente.interface";

export const cliente = z.object({
  nombre: z.string().optional(),
  email: z.string().optional(),
  telefono: z
    .union([
      z.string()
        .min(1)
        .refine(
          (val) => {

            const cleaned = val.replace(/\D/g, '');

            return cleaned.length >= 8
              && cleaned.length <= 15;

          },
          {
            message: 'Debe ser un teléfono válido'
          }
        )
        .transform((val) => {

          let cleaned = val.replace(/[^\d+]/g, '');

          // sacar espacios y símbolos
          cleaned = cleaned.replace(/(?!^\+)\D/g, '');

          // quitar 0 inicial si no tiene código internacional
          if (
            !cleaned.startsWith('+')
            && cleaned.startsWith('0')
          ) {
            cleaned = cleaned.slice(1);
          }

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