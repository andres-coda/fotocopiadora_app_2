import { Mens } from "./enum/mens.enum";

export const EntidadDatoMap = {
  "CLIENTE": "cliente",
  "COMPONENTE": "componente",
  "ESPECIFICACION": "esp",
  "LIBRO": "libro",
  "PEDIDO_LIBRO": "libro_pedido",
  "MATERIA": "materia",
  "PEDIDO": "pedido",
  "PRECIO": "precio",
  "PREOPUESTA": "propuesta_pedido",
  "SEDE": "sede",
  "STOCK": "stock",
  "RESUMEN": "resumen",
} as const;

export type EntidadDatoMapType = typeof EntidadDatoMap;

export const Entidad = Object.freeze(
  Object.fromEntries(
    Object.keys(EntidadDatoMap).map((key) => [key.toUpperCase(), key])
  )
) as {
    [K in keyof typeof EntidadDatoMap as Uppercase<K & string>]: K;
  };


export type Mensaje<
  K extends keyof EntidadDatoMapType = keyof EntidadDatoMapType
> =
  | {
    mensaje: Mens.ELIMINAR;
    entidad: K;
    id: string;
    dato?: never;
  }
  | {
    mensaje: Exclude<Mens, Mens.ELIMINAR>;
    entidad: K;
    dato: EntidadDatoMapType[K];
    id?: never;
  };
