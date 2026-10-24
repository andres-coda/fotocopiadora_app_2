import { RolUsuario } from './Usuario.interface';

export interface UserDtoProp {
  nombre: string;
  email: string;
  password: string;
}

// Alta de un usuario desde el ABM: la password es obligatoria.
export interface UsuarioAltaDtoProp {
  nombre: string;
  email: string;
  password: string;
  role: RolUsuario;
}

// Edicion de usuario: la password es opcional (si no viene no se envia).
// `role` solo lo manda el ABM de admin; el self-edit no lo setea.
export interface UsuarioEditarDtoProp {
  nombre: string;
  email: string;
  password?: string;
  role?: RolUsuario;
}
