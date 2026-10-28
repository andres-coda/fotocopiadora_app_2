import { UsuarioEditarDtoProp } from '../../modelo/usuario/dtoUsuario.interface';
import { formValuesPerfilEditar } from '../../modelo/usuario/esqUsuario.esquema';

// Edicion del propio perfil. Si los campos de contrasena vienen vacios no se
// envian: el back interpreta "sin passwordNueva" como "no cambiar la clave" y
// no exige la actual.
//
// El rol no se envia nunca. El `with check` de pc_usuario_update exige que el
// rol quede igual, asi que mandarlo seria un rechazo garantizado.
export const usuarioEditarDtoAdapter = (
  p: formValuesPerfilEditar,
  id: string
): UsuarioEditarDtoProp => {
  const newUser: UsuarioEditarDtoProp = {
    id,
    datos: {
      nombre: p.nombre,
      email: p.email,
    },
  };

  if (p.passwordNueva.length > 0) {
    newUser.datos.passwordActual = p.passwordActual;
    newUser.datos.passwordNueva = p.passwordNueva;
  }

  return newUser;
};
