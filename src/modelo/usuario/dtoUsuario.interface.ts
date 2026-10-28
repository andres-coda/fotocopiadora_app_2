import { RolUsuario } from './Usuario.interface';

export interface UserDtoProp {
  nombre: string;
  email: string;
  password: string;
}

// Alta de un usuario desde el ABM: la password es obligatoria y el rol lo
// decide el admin que da de alta.
export interface UsuarioAltaDtoProp {
  nombre: string;
  email: string;
  password: string;
  role: RolUsuario;
}

// Datos editables del propio usuario. `rol` e `idEmpresa` no estan a proposito:
// el RLS rechaza cualquier intento de moverlos desde un perfil propio.
export interface DatosEditarUsuarioProp {
  nombre: string;
  email: string;
  passwordActual?: string;
  passwordNueva?: string;
}

// PUT /user: el id viaja en el body porque el controller valida que coincida
// con el `sub` del token.
export interface UsuarioEditarDtoProp {
  id: string;
  datos: DatosEditarUsuarioProp;
}
