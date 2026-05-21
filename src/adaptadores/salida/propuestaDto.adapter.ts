import { PropuestaDtoProp } from "../../modelo/Entidades/propuesta/dtoPropuesta.interface"
import { formValuesPropuesta } from "../../modelo/Entidades/propuesta/esqPropuesta.esquema"

export const propuestaDtoAdapter = (data: formValuesPropuesta, libros:string[]):PropuestaDtoProp => {
  return {
    nombre: data.nombre,
    libros: libros
  }
}