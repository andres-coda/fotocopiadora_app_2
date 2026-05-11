import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { PrecioAdapterProp, PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { baseAdapter } from "./base.adapter";

export const precioAdapter = (precio?:PrecioAdapterProp):PrecioProp | undefined=> {
  if(!precio) return undefined;

  const base: BaseProp | undefined= baseAdapter(precio);

  if(!base) return undefined;

  const newPrecio: PrecioProp = {
    ...base,
    nombre: precio.nombre,
    importe: precio.importe,
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