import { LibroProp } from "../modelo/Entidades/libro/libro.interface";
import { EstadoPedido } from "../modelo/Entidades/pedido/estadoPedido.enum";
import { Estado } from "../modelo/Entidades/pedido_libro/estado.enum";
import { transformarComponente } from "./componente";

export const normalizarTexto = (texto: string | undefined): string => {
  if (!texto) return '';
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

export const formatoTelefonoMostrar = (telefono: string): string => {
  const t = telefono.replace(/\D/g, '');

  if (t.length < 11) {
    throw new Error('Telefono no valido');
  }

  const parte4 = t.slice(-4);
  const parte3b = t.slice(-7, -4);
  const parte3a = t.slice(-10, -7);
  const resto = t.slice(0, -10);

  return ['+',resto, parte3a, parte3b, parte4]
    .filter(Boolean)
    .join(' ');
};

export const claseXestado = (estado: Estado): string => {
  if (estado === Estado.LISTO) return 'listo';
  if (estado === Estado.RETIRADO) return 'retirado';
  if (estado === Estado.CANCELADO) return 'cancelado';
  if (estado === Estado.CONSTRUCCION) return 'construccion';
  if (estado === Estado.POR_CONFIRMAR) return 'por-confirmar';
  return 'pendiente'
}

export const claseXestadoPedido = (estado: EstadoPedido): string => {
  if (estado === EstadoPedido.LISTO) return 'listo';
  if (estado === EstadoPedido.RETIRADO) return 'retirado';
  if (estado === EstadoPedido.CANCELADO) return 'cancelado';
  return 'pendiente'
}

export const estadoXstring = (estado: Estado): string => {
  switch (estado) {
    case Estado.PENDIENTE: return 'Pendiente';
    case Estado.LISTO: return 'Listo';
    case Estado.RETIRADO: return 'Retirado';
    case Estado.CANCELADO: return 'Cancelado';
    case Estado.IMPRESO_COMPLETO: return 'Impreso';
    case Estado.IMPRESO_MITAD: return 'Imprimiendo...';
    case Estado.STOCK: return 'En stock';
    default: return 'todavía no se resolvió este estado';
  }
}

export const estadoPedidoXstring = (estado: EstadoPedido): string => {
  switch (estado) {
    case EstadoPedido.PENDIENTE: return 'Pendiente';
    case EstadoPedido.LISTO: return 'Listo';
    case EstadoPedido.RETIRADO: return 'Retirado';
    case EstadoPedido.CANCELADO: return 'Cancelado';
    default: return 'todavía no se resolvió este estado';
  }
}

export const nombreLibroXstring = (libro:LibroProp | undefined) => {
  if(!libro) return '';
  return `${libro.nombre} - ${libro.nivel} - ${transformarComponente(libro.componentes)}`
}