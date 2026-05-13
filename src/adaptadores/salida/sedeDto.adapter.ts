import { SedeDtoProp } from "../../modelo/Entidades/sede/dtoSede.interface";
import { formValuesSede } from "../../modelo/Entidades/sede/esqSede.esquema";


export const sedeDtoAdapter = (p: formValuesSede): SedeDtoProp => {
  const newSede: SedeDtoProp = {
    nombre: p.nombre,
  }
  return newSede;
}