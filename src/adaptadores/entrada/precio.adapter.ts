import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { PrecioAdapterProp, PrecioNombreAdapterProp, PrecioNombreProp, PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { baseAdapter } from "./base.adapter";

export const precioAdapter = (precio?: PrecioAdapterProp): PrecioProp | undefined => {
  if (!precio) return undefined;

  const base: BaseProp | undefined = baseAdapter<PrecioAdapterProp>({ base: precio });

  if (!base) return undefined;

  const newPrecio: PrecioProp = {
    ...base,
    descripcion: precio.descripcion,
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


export const precioNombreAdapter = (precio?: PrecioNombreAdapterProp): PrecioNombreProp | undefined => {
  if (!precio) return undefined;

  const newPrecio: PrecioNombreProp = {
    id: precio.id,
    descripcion: precio.descripcion,
    nombre: precio.nombre,
    abreviatura: precio.abreviatura
  }
  return newPrecio;
}