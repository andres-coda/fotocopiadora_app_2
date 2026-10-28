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

// ───────────────────────────────────────────────────────────────────────────
// ABM de usuarios por parte de un admin.
// El desplegable solo ofrece admin | operador: el RLS rechaza asignar
// super_admin a quien no lo es (pc_usuario_insert), por eso no se ofrece.
// ───────────────────────────────────────────────────────────────────────────
export const rolesAsignables = ['admin', 'operador'] as const;

const nombreAdmin = z
  .string()
  .min(1, 'El nombre es obligatorio')
  .max(50, 'El nombre no puede superar los 50 caracteres');

const emailAdmin = z.email('Email invalido').max(50, 'El email no puede superar los 50 caracteres');

const roleAdmin = z.enum(rolesAsignables, 'Rol invalido');

// Alta: la contraseña es obligatoria. Antes era `.optional()` aunque el
// comentario decía lo contrario; el back la exige con @MinLength(6) y el
// formulario la dejaba pasar vacía hasta el 400.
export const usuarioAdminAlta = z.object({
  nombre: nombreAdmin,
  email: emailAdmin,
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(255, 'La contraseña no puede superar los 255 caracteres'),
  role: roleAdmin,
});

export type formValuesUsuarioAlta = z.infer<typeof usuarioAdminAlta>;

export const usuarioAltaFormDefault: formValuesUsuarioAlta = {
  nombre: '',
  email: '',
  password: '',
  role: 'operador',
};

// ───────────────────────────────────────────────────────────────────────────
// Edición del propio perfil.
// La contraseña es opcional. Si se cambia, se exige la actual y la repetición
// de la nueva. Las tres reglas viven acá para que el formulario no pueda
// mandar una combinación que el back rechazaría, y para que el error aparezca
// en el campo que corresponde en vez de como un 400 genérico.
//
// Los campos de contraseña son strings vacíos y no opcionales: con
// `useForm` + `zodResolver` un `undefined` en un input controlado se comporta
// distinto que '', y el usuario tiene que poder borrar lo que escribió.
// ───────────────────────────────────────────────────────────────────────────
export const perfilEditar = z
  .object({
    nombre: z
      .string()
      .min(1, 'El nombre es obligatorio')
      .max(50, 'El nombre no puede superar los 50 caracteres'),
    email: z.email('Email invalido').max(50, 'El email no puede superar los 50 caracteres'),
    passwordActual: z.string().max(255, 'La contraseña no puede superar los 255 caracteres'),
    passwordNueva: z.string().max(255, 'La contraseña no puede superar los 255 caracteres'),
    repetirPassword: z.string().max(255, 'La contraseña no puede superar los 255 caracteres'),
  })
  .refine(d => !d.passwordActual || d.passwordNueva.length > 0, {
    message: 'Falta la nueva contraseña',
    path: ['passwordNueva'],
  })
  .refine(d => d.passwordNueva.length === 0 || d.passwordNueva.length >= 6, {
    message: 'La nueva contraseña debe tener al menos 6 caracteres',
    path: ['passwordNueva'],
  })
  .refine(d => d.passwordNueva.length === 0 || d.passwordNueva === d.repetirPassword, {
    message: 'Las contraseñas nuevas no son iguales',
    path: ['repetirPassword'],
  })
  // Escribió la nueva pero no la actual: el back no puede verificar identidad.
  .refine(d => d.passwordNueva.length === 0 || d.passwordActual.length > 0, {
    message: 'Para cambiar la contraseña hay que indicar la actual',
    path: ['passwordActual'],
  });

export type formValuesPerfilEditar = z.infer<typeof perfilEditar>;

/**
 * Espejo del anterior con las contrasenas opcionales. NO valida nada: existe
 * solo porque `Input` y `Desplegable` reciben un `ZodObject` y lo usan para
 * dibujar el asterisco de campo obligatorio. Con los tres campos como
 * requeridos, el formulario marcaria como obligatorio algo que en realidad es
 * condicional.
 */
export const perfilEditarEsquema = z.object({
  nombre: z.string(),
  email: z.string(),
  passwordActual: z.string().optional(),
  passwordNueva: z.string().optional(),
  repetirPassword: z.string().optional(),
});

export const perfilEditarFormDefault: formValuesPerfilEditar = {
  nombre: '',
  email: '',
  passwordActual: '',
  passwordNueva: '',
  repetirPassword: '',
};

export const perfilEditarFormEdit = (usuario?: usuarioProps | null): formValuesPerfilEditar => {
  if (!usuario) return perfilEditarFormDefault;
  return {
    ...perfilEditarFormDefault,
    nombre: usuario.nombre || '',
    email: usuario.email || '',
  };
};
