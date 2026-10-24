import { z } from 'zod';
import { EmpresaProp } from './empresa.interface';

// La DB exige nombre (50), email (150) y un telefono valido (max 15).
export const empresa = z.object({
  nombre: z
    .string()
    .min(1, { message: 'La empresa debe tener un nombre' })
    .max(50, { message: 'El nombre no puede superar los 50 caracteres' }),
  email: z
    .email('Email invalido')
    .min(1, { message: 'El email es obligatorio' })
    .max(150, { message: 'El email no puede superar los 150 caracteres' }),
  telefono: z
    .string()
    .min(1, { message: 'El telefono es obligatorio' })
    .refine(
      val => {
        const cleaned = val.replace(/\D/g, '');
        return cleaned.length >= 10 && cleaned.length <= 15;
      },
      { message: 'Debe ser un telefono valido' }
    )
    .transform(val => {
      let cleaned = val.replace(/[^\d+]/g, '');

      // sacar espacios y simbolos, salvo el + inicial
      cleaned = cleaned.replace(/(?!^\+)\D/g, '');

      // quitar 0 inicial si no tiene codigo internacional
      if (!cleaned.startsWith('+') && cleaned.startsWith('0')) {
        cleaned = cleaned.slice(1);
      }

      return cleaned;
    }),
});

export type formValuesEmpresa = z.infer<typeof empresa>;

export const empresaFormDefault: formValuesEmpresa = {
  nombre: '',
  email: '',
  telefono: '',
};

export const empresaFormEdit = (empresa?: EmpresaProp | null): formValuesEmpresa => {
  if (!empresa) return empresaFormDefault;
  return {
    nombre: empresa?.nombre || empresaFormDefault.nombre,
    email: empresa?.email || empresaFormDefault.email,
    telefono: empresa?.telefono || empresaFormDefault.telefono,
  };
};
