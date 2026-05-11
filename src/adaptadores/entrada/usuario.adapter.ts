import { usuarioAdapterProps, usuarioProps } from "../../modelo/usuario/Usuario.interface";

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