import { UsuarioAltaDtoProp } from '../../modelo/usuario/dtoUsuario.interface';
import { formValuesUsuarioAlta } from '../../modelo/usuario/esqUsuario.esquema';

// Alta de usuario desde el ABM: la password es obligatoria y el rol viaja tal
// como lo eligio el admin (admin | operador; super_admin no se ofrece).
export const usuarioAltaDtoAdapter = (p: formValuesUsuarioAlta): UsuarioAltaDtoProp => {
  const newUser: UsuarioAltaDtoProp = {
    nombre: p.nombre,
    email: p.email,
    password: p.password,
    role: p.role,
  };

  return newUser;
};
