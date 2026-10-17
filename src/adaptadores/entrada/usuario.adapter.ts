import { TokenAdapterProp, TokenProp, usuarioAdapterProps, usuarioProps } from "../../modelo/usuario/Usuario.interface";

export const usuarioAdapter = (user?:usuarioAdapterProps):usuarioProps | undefined=> {
  if(!user) return undefined
  const newUser: usuarioProps = {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    role: user.role,
  }
  return newUser;
}

export const usuarioAdapterArray = (datos?: usuarioAdapterProps[]): usuarioProps[] => {
  const newUsuarios: usuarioProps[] =
    datos?.flatMap(d => {
      const usuario = usuarioAdapter(d);
      return usuario ? [usuario] : [];
    }) ?? [];

  return newUsuarios;
}

export const tokenAdapter = (token?: TokenAdapterProp | null): TokenProp | undefined => {
  if(!token) return undefined;
  return {
    access_token: token.access_token
  }
}