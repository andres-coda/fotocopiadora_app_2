import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { ResumenAdapterProp, resumenInicial, ResumenProp } from "../../modelo/Entidades/cliente/resumen.interface";
import { baseAdapter } from "./base.adapter";

export const resumenAdapter = (resumen?: ResumenAdapterProp): ResumenProp => {
  if (!resumen) return resumenInicial

  const base: BaseProp | undefined = baseAdapter<ResumenAdapterProp>({ base: resumen, busqueda: [] });

  if (!base) throw new Error('El resumen del cliente no tiene id, o alguna de las caracteristicas bases');

  const newResumen: ResumenProp = {
    ...base,
  pendiente: resumen.pendiente,
  listo: resumen.listo,
  retirado: resumen.retirado,
  cancelado: resumen.cancelado,
  }
  return newResumen;
}