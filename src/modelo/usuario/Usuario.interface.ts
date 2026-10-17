export type RolUsuario = 'super_admin' | 'admin' | 'operador';

// Los endpoints de usuario devuelven {id, nombre, email, role}, igual que /auth/profile.
export interface usuarioAdapterProps {
  id: string,
  nombre: string,
  email: string,
  role: RolUsuario,
}

export interface usuarioProps {
  id: string,
  nombre: string,
  email: string,
  role: RolUsuario,
}


export const usuarioInicial: usuarioProps = {
  id: '',
  nombre: '',
  email: '',
  role: 'operador',
}

export interface TokenAdapterProp {
  access_token: string;
}

export interface TokenProp {
  access_token: string;
}
