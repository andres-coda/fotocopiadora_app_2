import { ClienteDtoProp } from "../../modelo/Entidades/cliente/dtoCliente.interface"
import { formValuesCliente } from "../../modelo/Entidades/cliente/esqCliente.esquema"

const normalizarTelefono = (telefono?: string): string | undefined => {

  if (!telefono) return undefined;

  let limpio = telefono.replace(/\D/g, '');

  // si empieza con 00 -> internacional
  if (telefono.trim().startsWith('+')) {
    return `+${limpio}`;
  }

  // si ya tiene código internacional
  if (limpio.length > 10) {
    return `+${limpio}`;
  }

  // si no tiene código -> argentina
  return `+54${limpio}`;
};

export const clienteDtoAdapter = (c: formValuesCliente): ClienteDtoProp => {
  const newGrupo: ClienteDtoProp = {
    nombre: c.nombre,
    telefono: normalizarTelefono(c.telefono),
    email: c.email,
  }
  return newGrupo
}