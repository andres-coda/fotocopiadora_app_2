import { z } from 'zod';
import { MensajeProp } from './mensaje.interface';

// La columna nombre es varchar(50); el mensaje es TEXT opcional y favorito un boolean.
// El switch de favorito no es campo de RHF, asi que el esquema solo valida el tipo.
export const mensaje = z.object({
  nombre: z
    .string()
    .min(1, { message: 'El mensaje debe tener un nombre' })
    .max(50, { message: 'El nombre no puede superar los 50 caracteres' }),
  mensaje: z.string().optional(),
  favorito: z.boolean(),
});

export type formValuesMensaje = z.infer<typeof mensaje>;

export const mensajeFormDefault: formValuesMensaje = {
  nombre: '',
  mensaje: '',
  favorito: false,
};

export const mensajeFormEdit = (mensaje?: MensajeProp | null): formValuesMensaje => {
  if (!mensaje) return mensajeFormDefault;
  return {
    nombre: mensaje.nombre || mensajeFormDefault.nombre,
    mensaje: mensaje.mensaje || '',
    favorito: mensaje.favorito ?? mensajeFormDefault.favorito,
  };
};
