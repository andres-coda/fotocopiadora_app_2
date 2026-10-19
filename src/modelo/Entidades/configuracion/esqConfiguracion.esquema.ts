import { z } from "zod";
import { ConfiguracionProp } from "./configuracion.interface";

// PUT /configuracion acepta todo opcional (el back valida uuid4 e int 0..23).
// Los desplegables sin seleccion quedan en '' y una fecha limpia tambien:
// por eso '' se acepta como "sin valor" y el DTO de salida lo omite.
export const configuracion = z.object({
  fechaEntrega: z.string()
    .refine(
      (val) => val === '' || /^\d{4}-\d{2}-\d{2}$/.test(val),
      { message: 'La fecha de entrega debe tener formato YYYY-MM-DD' }
    )
    .optional(),
  // El input type="number" entrega strings; coerce los convierte a number.
  // El cast deja entrada y salida en number|undefined para que zodResolver
  // y useForm<formValuesConfiguracion> compartan el mismo tipo.
  horaEntrega: z.coerce.number()
    .int({ message: 'La hora de entrega debe ser un numero entero' })
    .min(0, { message: 'La hora de entrega no puede ser menor a 0' })
    .max(23, { message: 'La hora de entrega no puede ser mayor a 23' })
    .optional() as z.ZodOptional<z.ZodNumber>,
  idSede: z.union([z.uuid(), z.literal('')]).optional(),
  idDatoCobro: z.union([z.uuid(), z.literal('')]).optional(),
  idMsjPedidoTomado: z.union([z.uuid(), z.literal('')]).optional(),
  idMsjPedidoRetirado: z.union([z.uuid(), z.literal('')]).optional(),
  msjRetiro: z.boolean().optional(),
  msjEnvio: z.boolean().optional(),
})

export type formValuesConfiguracion = z.infer<typeof configuracion>;

export const configuracionFormDefault: formValuesConfiguracion = {
  fechaEntrega: '',
  horaEntrega: undefined,
  idSede: '',
  idDatoCobro: '',
  idMsjPedidoTomado: '',
  idMsjPedidoRetirado: '',
  msjRetiro: false,
  msjEnvio: false,
}

export const configuracionFormEdit = (config?: ConfiguracionProp): formValuesConfiguracion => {
  if (!config) return configuracionFormDefault;
  return {
    fechaEntrega: config.fechaEntrega ?? configuracionFormDefault.fechaEntrega,
    horaEntrega: config.horaEntrega ?? configuracionFormDefault.horaEntrega,
    idSede: config.sede?.id ?? configuracionFormDefault.idSede,
    idDatoCobro: config.datoCobrado?.id ?? configuracionFormDefault.idDatoCobro,
    idMsjPedidoTomado: config.msjTomado?.id ?? configuracionFormDefault.idMsjPedidoTomado,
    idMsjPedidoRetirado: config.msjRetirado?.id ?? configuracionFormDefault.idMsjPedidoRetirado,
    msjRetiro: config.msjRetiro ?? configuracionFormDefault.msjRetiro,
    msjEnvio: config.msjEnvio ?? configuracionFormDefault.msjEnvio,
  }
}
