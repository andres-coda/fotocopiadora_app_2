import { TokenAdapterProp, TokenProp, usuarioAdapterProps, usuarioProps } from "../../modelo/usuario/Usuario.interface";

export const usuarioAdapter = (user?:usuarioAdapterProps):usuarioProps | undefined=> {
  if(!user) return undefined
  const newUser: usuarioProps = {
    nombre: user.nombre,
    email: user.email,
    role: user.role,
    id: user.idUsuario

  }
  return newUser;
}

export const tokenAdapter = (token?: TokenAdapterProp | null): TokenProp | undefined => {
  if(!token) return undefined;
  return {
    access_token: token.access_token
  }
}