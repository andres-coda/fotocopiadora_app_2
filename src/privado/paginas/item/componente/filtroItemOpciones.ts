import { Especificaciones } from '../../../../modelo/Entidades/especificacion/especificacion.enum';
import { Estado } from '../../../../modelo/Entidades/pedido_libro/estado.enum';
import { estadoXstring } from '../../../../utils/formatoDatos';

// Solo los 6 estados filtrables: se excluyen STOCK, CONSTRUCCION y POR_CONFIRMAR.
export const listaEstados: { nombre: Estado; texto: string }[] = [
  { nombre: Estado.PENDIENTE, texto: estadoXstring(Estado.PENDIENTE) },
  { nombre: Estado.IMPRESO_MITAD, texto: estadoXstring(Estado.IMPRESO_MITAD) },
  { nombre: Estado.IMPRESO_COMPLETO, texto: estadoXstring(Estado.IMPRESO_COMPLETO) },
  { nombre: Estado.LISTO, texto: estadoXstring(Estado.LISTO) },
  { nombre: Estado.RETIRADO, texto: estadoXstring(Estado.RETIRADO) },
  { nombre: Estado.CANCELADO, texto: estadoXstring(Estado.CANCELADO) },
];

export const listaEspecificaciones: { nombre: Especificaciones; texto: string }[] = [
  { nombre: Especificaciones.BLANCO_Y_NEGRO, texto: 'B y N' },
  { nombre: Especificaciones.COLOR, texto: 'Color' },
  { nombre: Especificaciones.ANILLADO, texto: 'Anillado' },
  { nombre: Especificaciones.DOBLE_FAZ, texto: 'D/Faz' },
  { nombre: Especificaciones.SIMPLE_FAZ, texto: 'S/Faz' },
  { nombre: Especificaciones.ADHESIVO, texto: 'Adhesivos' },
  { nombre: Especificaciones.TROKELADO, texto: 'Trokelado' },
];
