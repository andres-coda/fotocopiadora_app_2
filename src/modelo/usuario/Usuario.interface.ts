export interface usuarioAdapterProps {
  idUsuario: string,
  nombre: string,
  email: string,
  role: string,
}

export interface usuarioProps {
  id: string,
  nombre: string,
  email: string,
  role: string,
}


export const usuarioInicial: usuarioProps = {
  id: '',
  nombre: '',
  email: '',
  role: '',
}

export interface TokenAdapterProp {
  access_token: string;
}

export interface TokenProp {
  access_token: string;
}
