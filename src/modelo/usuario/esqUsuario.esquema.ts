import { z } from 'zod';
import { usuarioProps } from './Usuario.interface';

export const registro = z
  .object({
    nombre: z.string().min(1, 'El nombre es obligatorio'),
    email: z.email('Email invalido').min(1, 'El email es obligatorio'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirPassword: z.string().min(6, 'La confirmación debe tener al menos 6 caracteres'),
  })
  .refine(data => data.password === data.confirPassword, {
    message: 'Las contraseñas son diferentes',
    path: ['confirPassword'],
  });

export type formValuesRegistro = z.infer<typeof registro>;

export const registroFormDefault: formValuesRegistro = {
  nombre: '',
  email: '',
  password: '',
  confirPassword: '',
};

export const login = z.object({
  nombre: z.string('Debe ser un texto').min(1, 'El nombre de usuario es obligatorio'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type formValuesLogin = z.infer<typeof login>;

export const loginFormDefault: formValuesLogin = {
  nombre: '',
  password: '',
};

// Edicion de los datos del usuario logueado. La password es opcional:
// si viene vacia no se envia al backend.
export const usuarioEditar = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(50, 'El nombre no puede superar los 50 caracteres'),
  email: z.email('Email invalido').max(50, 'El email no puede superar los 50 caracteres'),
  password: z
    .string()
    .max(255, 'La contraseña no puede superar los 255 caracteres')
    .refine(val => val === '' || val.length >= 6, {
      message: 'La contraseña debe tener al menos 6 caracteres',
    })
    .optional(),
});

export type formValuesUsuarioEditar = z.infer<typeof usuarioEditar>;

export const usuarioEditarFormDefault: formValuesUsuarioEditar = {
  nombre: '',
  email: '',
  password: '',
};

export const usuarioEditarFormEdit = (usuario?: usuarioProps | null): formValuesUsuarioEditar => {
  if (!usuario) return usuarioEditarFormDefault;
  return {
    nombre: usuario.nombre || usuarioEditarFormDefault.nombre,
    email: usuario.email || usuarioEditarFormDefault.email,
    password: '',
  };
};

// ABM de usuarios por parte de un admin.
// El desplegable solo ofrece admin | operador: la DB (RLS insert/update) rechaza
// asignar super_admin a quien no es super_admin, por eso no se ofrece.
export const rolesAsignables = ['admin', 'operador'] as const;

const nombreAdmin = z
  .string()
  .min(1, 'El nombre es obligatorio')
  .max(50, 'El nombre no puede superar los 50 caracteres');

const emailAdmin = z.email('Email invalido').max(50, 'El email no puede superar los 50 caracteres');

const roleAdmin = z.enum(rolesAsignables, 'Rol invalido');

// Alta: la password es obligatoria (min 6, max 255).
export const usuarioAdminAlta = z.object({
  nombre: nombreAdmin,
  email: emailAdmin,
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(255, 'La contraseña no puede superar los 255 caracteres')
    .optional(),
  role: roleAdmin,
});

// Edicion: igual pero la password es opcional (si viene vacia no se envia).
export const usuarioAdminEditar = z.object({
  nombre: nombreAdmin,
  email: emailAdmin,
  password: z
    .string()
    .max(255, 'La contraseña no puede superar los 255 caracteres')
    .refine(val => val === '' || val.length >= 6, {
      message: 'La contraseña debe tener al menos 6 caracteres',
    })
    .optional(),
  role: roleAdmin,
});

// Ambos esquemas infieren el mismo tipo, asi que un unico useForm sirve para alta y edicion.
export type formValuesUsuarioAdmin = z.infer<typeof usuarioAdminEditar>;

export const usuarioAdminFormDefault: formValuesUsuarioAdmin = {
  nombre: '',
  email: '',
  password: '',
  role: 'operador',
};

export const usuarioAdminFormEdit = (usuario?: usuarioProps | null): formValuesUsuarioAdmin => {
  if (!usuario) return usuarioAdminFormDefault;
  return {
    nombre: usuario.nombre || usuarioAdminFormDefault.nombre,
    email: usuario.email || usuarioAdminFormDefault.email,
    password: '',
    // Un super_admin no pertenece a una empresa y no aparece en el listado,
    // pero si llegara se mapea a admin para respetar el enum asignable.
    role: usuario.role === 'super_admin' ? 'admin' : usuario.role,
  };
};
