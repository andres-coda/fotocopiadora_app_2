import { camposBusquedaPrecio } from "../../filtro/precio.filtro";
import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { PrecioAdapterProp, PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { baseAdapter } from "./base.adapter";

export const precioAdapter = (precio?: PrecioAdapterProp): PrecioProp | undefined => {
  if (!precio) return undefined;

  const base: BaseProp | undefined = baseAdapter<PrecioAdapterProp>({ base: precio, busqueda: camposBusquedaPrecio });

  if (!base) return undefined;

  const newPrecio: PrecioProp = {
    ...base,
    nombre: precio.nombre,
    importe: precio.importe,
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