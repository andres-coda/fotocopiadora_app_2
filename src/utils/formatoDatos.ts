import { Especificaciones } from "../modelo/Entidades/especificacion/especificacion.enum";
import { LibroProp } from "../modelo/Entidades/libro/libro.interface";
import { Estado } from "../modelo/Entidades/pedido_libro/estado.enum";
import { PrecioProp } from "../modelo/Entidades/precio/precio.interface";
import { transformarComponente } from "./componente";
import { transformarEspecificacinesATexto } from "./especificaciones";
import { calcularPrecio } from "./precio";

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

export const claseXestado = (estado: Estado): string => {
  if (estado === Estado.LISTO) return 'listo';
  if (estado === Estado.RETIRADO) return 'retirado';
  if (estado === Estado.CANCELADO) return 'cancelado';
  return 'pendiente'
}

export const estadoXstring = (estado: Estado): string => {
  switch (estado) {
    case Estado.PENDIENTE: return 'Pendiente';
    case Estado.LISTO: return 'Listo';
    case Estado.RETIRADO: return 'Retirado';
    case Estado.CANCELADO: return 'Cancelado';
    case Estado.IMPRESO_COMPLETO: return 'Impreso completo';
    case Estado.IMPRESO_MITAD: return 'Impreso el simple faz';
    case Estado.STOCK: return 'En stock';
    default: return 'todavía no se resolvió este estado';
  }
}