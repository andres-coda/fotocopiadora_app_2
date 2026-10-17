import { UsuarioEditarDtoProp } from "../../modelo/usuario/dtoUsuario.interface";
import { formValuesUsuarioAdmin, formValuesUsuarioEditar } from "../../modelo/usuario/esqUsuario.esquema";

// Sirve para las dos ediciones: la propia (sin rol) y la del ABM de admin (con rol).
export const usuarioEditarDtoAdapter = (p: formValuesUsuarioEditar | formValuesUsuarioAdmin): UsuarioEditarDtoProp => {
  const newUser: UsuarioEditarDtoProp = {
    nombre: p.nombre,
    email: p.email,
  }

  // Si la password viene vacia no se envia.
  if (p.password) {
    newUser.password = p.password;
  }

  // El ABM de admin manda tambien el rol; la edicion propia no lo setea.
  if ('role' in p && p.role) {
    newUser.role = p.role;
  }

  return newUser;
}
