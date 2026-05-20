import { Estado } from "../modelo/Entidades/pedido_libro/estado.enum";

export const formatoTelefono = (telefono: string): string => {
  const t = telefono.replace(/\D/g, '');

  if (t.length < 11) {
    throw new Error('Telefono no valido');
  }

  const parte4 = t.slice(-4);
  const parte3b = t.slice(-7, -4);
  const parte3a = t.slice(-10, -7);
  const resto = t.slice(0, -10);

  return [resto, parte3a, parte3b, parte4]
    .filter(Boolean)
    .join(' ');
};

export const claseXestado = (estado:Estado):string => {
  if(estado === Estado.LISTO) return 'listo';
  if(estado === Estado.RETIRADO) return 'retirado';
  if(estado === Estado.CANCELADO) return 'cancelado';
  return 'pendiente'
}