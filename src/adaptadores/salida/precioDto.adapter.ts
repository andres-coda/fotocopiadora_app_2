import { PrecioDtoProp } from "../../modelo/Entidades/precio/dtoPrecio.interface";
import { formValuesPrecio } from "../../modelo/Entidades/precio/esqPrecio.esquema";

export const precioDtoAdapter = (p: formValuesPrecio): PrecioDtoProp => {
  const newPrecio: PrecioDtoProp = {
    nombre: p.nombre,
    importe: Number(p.importe),
  }
  return newPrecio;
}