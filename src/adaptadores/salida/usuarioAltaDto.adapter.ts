import { UsuarioAltaDtoProp } from '../../modelo/usuario/dtoUsuario.interface';
import { formValuesUsuarioAdmin } from '../../modelo/usuario/esqUsuario.esquema';

// Alta de usuario desde el ABM: la password es obligatoria.
export const usuarioAltaDtoAdapter = (p: formValuesUsuarioAdmin): UsuarioAltaDtoProp => {
  const newUser: UsuarioAltaDtoProp = {
    nombre: p.nombre,
    email: p.email,
    password: p.password ?? '',
    role: p.role,
  };

  return newUser;
};
