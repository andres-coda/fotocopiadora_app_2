import { usuarioProps } from "../modelo/usuario/Usuario.interface";

export const esSuper = (u?: usuarioProps | null): boolean => {
  if (u && u.role === 'super_admin') return true;
  return false;
};