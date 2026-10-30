import { z } from 'zod';
import { ClienteProp } from './cliente.interface';
import { normalizarTelefono } from '../../../utils/telefono';

export const cliente = z.object({
  nombre: z.string().optional(),
  email: z.string().optional(),
  telefono: z
    .union([
      z
        .string()
        .min(1)
        .refine(val => normalizarTelefono(val) !== undefined, {
          message: 'Debe ser un teléfono válido',
        })
        .transform(val => normalizarTelefono(val) ?? val),

      z.literal(''),
    ])
    .optional(),
});

export type formValuesCliente = z.infer<typeof cliente>;

export const clienteFormDefault: formValuesCliente = {
  nombre: '',
  email: '',
  telefono: '',
};

export const clienteFormEdit = (cliente?: ClienteProp | null): formValuesCliente => {
  if (!cliente) return clienteFormDefault;
  return {
    nombre: cliente?.nombre || clienteFormDefault.nombre,
    email: cliente?.email || clienteFormDefault.email,
    telefono: cliente?.telefono || clienteFormDefault.telefono,
  };
};
