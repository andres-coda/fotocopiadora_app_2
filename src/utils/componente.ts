import { ComponenteProp } from "../modelo/Entidades/libro/componente.interface";

export const transformarComponente = (componentes: ComponenteProp[] | undefined): string => {
  if (!componentes) return '';
  return componentes.map(c => c.nombre).join(', ');
}
