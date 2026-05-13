import { z } from "zod";

export const registro = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  email: z.email('Email invalido').min(1, 'El email es obligatorio'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirPassword: z.string().min(6, 'La confirmación debe tener al menos 6 caracteres'),
}).refine(data => data.password === data.confirPassword, {
  message: 'Las contraseñas son diferentes',
  path: ['confirPassword']
});

export type formValuesRegistro = z.infer<typeof registro>;

export const registroFormDefault:formValuesRegistro = {
  nombre: '',
  email: '',
  password: '',
  confirPassword: '',
}


export const login = z.object({
  email: z.email('Email invalido').min(1, 'El email es obligatorio'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type formValuesLogin = z.infer<typeof login>;

export const loginFormDefault:formValuesLogin = {
  email: '',
  password: '',
}