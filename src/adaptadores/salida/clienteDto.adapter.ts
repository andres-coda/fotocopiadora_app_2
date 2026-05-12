import { ClienteDtoProp } from "../../modelo/Entidades/cliente/dtoCliente.interface"
import { formValuesCliente } from "../../modelo/Entidades/cliente/esqCliente.esquema"

export const clienteDtoAdapter = (c: formValuesCliente): ClienteDtoProp => {
  const newGrupo: ClienteDtoProp = {
    nombre: c.nombre,
    telefono: c.telefono,
    email: c.email,
  }
  return newGrupo
}