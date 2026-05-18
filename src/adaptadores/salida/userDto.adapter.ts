import { UserDtoProp } from "../../modelo/usuario/dtoUsuario.interface";
import { formValuesRegistro } from "../../modelo/usuario/esqUsuario.esquema";

export const userDtoAdapter = (p: formValuesRegistro):UserDtoProp  => {
  const newUser: UserDtoProp = {
    nombre: p.nombre,
    email: p.email,
    password: p.password
  }
  return newUser;
}