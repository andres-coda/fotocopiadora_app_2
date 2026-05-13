import { z } from "zod";
import { PrecioProp } from "./precio.interface";

export const precio = z.object({
  nombre: z.string().min(1, { message: 'El precio debe tener un nombre'}),
  importe: z.number().min(1, { message: 'El precio debe tener un valor numerico'})
})


export type formValuesPrecio = z.infer<typeof precio>;

export const precioFormDefault: formValuesPrecio = {
  nombre: '',
  importe: 0,
}

export const precioFormEdit = (precio?: PrecioProp | null): formValuesPrecio => {
  if (!precio) return precioFormDefault;
  return {
    nombre: precio?.nombre || precioFormDefault.nombre,
    importe: precio?.importe || precioFormDefault.importe
  }
}