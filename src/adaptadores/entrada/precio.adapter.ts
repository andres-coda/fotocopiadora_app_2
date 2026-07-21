import { PrecioAdapterProp, PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { ultFechaAdapter } from "../../utils/calendario";

export const precioAdapter = (precio?: PrecioAdapterProp): PrecioProp | undefined => {
  if (!precio) return undefined;

  const ultAct = ultFechaAdapter({ fechaActualizacion: precio.fecha_actualizacion, fechaCreacion: precio.fecha_creacion });

  const newPrecio: PrecioProp = {
    id: precio.idPrecio,
    descripcion: precio.descripcion,
    ultAct,
    deleted: precio.delete,
    importe: precio.importe,
    detalles: precio.detalles,
    nombre: precio.nombre,
    abreviatura: precio.abreviatura
  }
  return newPrecio;
}

export const precioAdapterArray = (precios?: PrecioAdapterProp[]): PrecioProp[] => {
  const newPrecios: PrecioProp[] =
    precios?.flatMap(p => {
      const precio = precioAdapter(p);
      return precio ? [precio] : [];
    }) ?? [];

  return newPrecios;
}