import { perfilAdapterProp, TokenAdapterProp, TokenProp, usuarioAdapterProps, usuarioProps } from "../../modelo/usuario/Usuario.interface";

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

// /auth/profile todavia no devuelve email: queda vacio hasta que el back
// agregue ese campo (PB-4 pendiente en el back).
export const perfilAdapter = (perfil?: perfilAdapterProp): usuarioProps | undefined => {
  if(!perfil) return undefined;
  const newUser: usuarioProps = {
    id: perfil.sub,
    nombre: perfil.nombre,
    email: '',
    role: perfil.role,
  }
  return newUser;
}

export const tokenAdapter = (token?: TokenAdapterProp | null): TokenProp | undefined => {
  if(!token) return undefined;
  return {
    access_token: token.access_token
  }
}