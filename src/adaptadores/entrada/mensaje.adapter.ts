import { MensajeAdapterProp, MensajeProp } from "../../modelo/Entidades/mensaje/mensaje.interface";

// No usa baseAdapter: la tabla mensaje no tiene fechas ni deleted.
export const mensajeAdapter = (mensaje?: MensajeAdapterProp): MensajeProp | undefined => {
  if (!mensaje) return undefined;

  const newMensaje: MensajeProp = {
    id: mensaje.id,
    nombre: mensaje.nombre,
    mensaje: mensaje.mensaje ?? undefined,
    favorito: mensaje.favorito ?? false,
  }
  return newMensaje;
}

export const mensajeAdapterArray = (datos?: MensajeAdapterProp[]): MensajeProp[] => {
  const newMensajes: MensajeProp[] =
    datos?.flatMap(d => {
      const mensaje = mensajeAdapter(d);
      return mensaje ? [mensaje] : [];
    }) ?? [];

  return newMensajes;
}
