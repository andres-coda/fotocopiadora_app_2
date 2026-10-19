import { z } from "zod";
import { DatoCobroProp } from "./datoCobro.interface";

// La columna nombre es varchar(50); el mensaje es TEXT opcional.
export const datoCobro = z.object({
  nombre: z.string()
    .min(1, { message: 'El dato de cobro debe tener un nombre' })
    .max(50, { message: 'El nombre no puede superar los 50 caracteres' }),
  mensaje: z.string().optional(),
});

export type formValuesDatoCobro = z.infer<typeof datoCobro>;

export const datoCobroFormDefault: formValuesDatoCobro = {
  nombre: '',
  mensaje: '',
}

export const datoCobroFormEdit = (datoCobro?: DatoCobroProp | null): formValuesDatoCobro => {
  if (!datoCobro) return datoCobroFormDefault;
  return {
    nombre: datoCobro.nombre || datoCobroFormDefault.nombre,
    mensaje: datoCobro.mensaje || '',
  }
}
