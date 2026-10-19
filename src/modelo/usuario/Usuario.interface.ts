export type RolUsuario = 'super_admin' | 'admin' | 'operador';

// Los endpoints de usuario devuelven {id, nombre, email, role}. En cambio,
// /auth/profile devuelve el payload del JWT: {sub, nombre, role, idEmpresa},
// sin id ni email; por eso su adapter es perfilAdapter.
export interface usuarioAdapterProps {
  id: string,
  nombre: string,
  email: string,
  role: RolUsuario,
  idEmpresa?: string | null,
}

export interface usuarioProps {
  id: string,
  nombre: string,
  email: string,
  role: RolUsuario,
  idEmpresa?: string | null,
}


export const usuarioInicial: usuarioProps = {
  id: '',
  nombre: '',
  email: '',
  role: 'operador',
  idEmpresa: null,
}

export interface perfilAdapterProp {
  sub: string,
  nombre: string,
  role: RolUsuario,
  idEmpresa?: string | null,
}

export interface TokenAdapterProp {
  access_token: string;
}

export interface TokenProp {
  access_token: string;
}
