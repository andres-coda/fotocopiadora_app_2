import { Especificaciones } from '../modelo/Entidades/especificacion/especificacion.enum';
import { PedidoProp } from '../modelo/Entidades/pedido/pedido.interface';
import { nombreLibroXstring } from './formatoDatos';
import { normalizarTelefono } from './telefono';

/**
 * App de escritorio. El protocolo `whatsapp:` lo recibe el manejador del
 * sistema, que reusa la ventana ya abierta: no aparece ninguna pestana nueva y
 * la sesion iniciada es la del cliente de escritorio.
 */
export const BASE_WHATSAPP_APP: string = 'whatsapp://send';

/**
 * WhatsApp Web. Queda como respaldo explicito para cuando no hay app de
 * escritorio: abre una pestana nueva y no puede reusar la que el usuario ya
 * tiene abierta, porque un navegador no permite dirigir una pestana ajena.
 */
export const BASE_WHATSAPP_WEB: string = 'https://web.whatsapp.com/send';

interface WhatsappUrlProp {
  telefono?: string;
  mensaje?: string;
  base?: string;
}

export const soloDigitos = (telefono?: string): string => (telefono ?? '').replace(/\D/g, '');

/**
 * WhatsApp quiere el numero internacional sin simbolos. La normalizacion vive
 * en `utils/telefono` para que el formulario de alta guarde el mismo formato que
 * se usa aca al enviar: un solo lugar decide que es un celular argentino.
 */
export const telefonoParaWhatsapp = (telefono?: string): string | undefined => {
  const normalizado = normalizarTelefono(telefono);

  return normalizado ? soloDigitos(normalizado) : undefined;
};

export const urlWhatsapp = ({
  telefono,
  mensaje,
  base = BASE_WHATSAPP_APP,
}: WhatsappUrlProp): string | undefined => {
  const numero = telefonoParaWhatsapp(telefono);
  if (!numero) return undefined;

  const texto = mensaje?.trim();
  const query = texto ? `?phone=${numero}&text=${encodeURIComponent(texto)}` : `?phone=${numero}`;

  return `${base}${query}`;
};

const formatoImporte = (importe: number): string =>
  `$${new Intl.NumberFormat('es-AR', { maximumFractionDigits: 2 }).format(importe)}`;

/**
 * Acepta tanto `YYYY-MM-DD` (input date y configuracion) como `DD-MM-YYYY`
 * (fecha ya convertida en `PedidoProp`) y devuelve siempre `DD/MM/YYYY`.
 */
const fechaVisible = (fecha?: string): string => {
  if (!fecha) return '';

  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(fecha);
  if (iso) return `${iso[3]}/${iso[2]}/${iso[1]}`;

  const dmy = /^(\d{2})-(\d{2})-(\d{4})$/.exec(fecha);
  if (dmy) return `${dmy[1]}/${dmy[2]}/${dmy[3]}`;

  return fecha;
};

const nombreEspecificacion: Record<Especificaciones, string> = {
  [Especificaciones.BLANCO_Y_NEGRO]: 'Blanco y negro',
  [Especificaciones.COLOR]: 'Color',
  [Especificaciones.ADHESIVO]: 'Adhesivo',
  [Especificaciones.SUELTO]: 'Suelto',
  [Especificaciones.ANILLADO]: 'Anillado',
  [Especificaciones.ABROCHADO]: 'Abrochado',
  [Especificaciones.DOBLE_FAZ]: 'Doble faz',
  [Especificaciones.SIMPLE_FAZ]: 'Simple faz',
  [Especificaciones.SELECCION]: 'Seleccion',
  [Especificaciones.TROKELADO]: 'Trokelado',
};

const resumenLibros = (pedido: PedidoProp): string =>
  (pedido.libroPedidos ?? [])
    .map(lp => {
      const especificaciones = (lp.especificaciones ?? [])
        .map(e => nombreEspecificacion[e] ?? e)
        .join(', ');
      const detalle = especificaciones ? ` (${especificaciones})` : '';
      return `- ${lp.cantidad}x ${nombreLibroXstring(lp.libro)}${detalle}`;
    })
    .join('\n');

const pieEntrega = (fecha?: string, hora?: number): string => {
  const partes: string[] = [];

  const fechaMostrar = fechaVisible(fecha);
  if (fechaMostrar) partes.push(fechaMostrar);
  if (hora !== undefined && hora !== null) partes.push(`${hora} hs`);

  return partes.length > 0 ? `Entrega: ${partes.join(' - ')}` : '';
};

export interface MensajeTomadoProp {
  pedido: PedidoProp;
  /** Texto configurado en Ajustes como mensaje de pedido tomado. */
  encabezado?: string;
  /** Fecha de entrega del pedido; si falta se usa la configurada. */
  fechaEntrega?: string;
  /** Hora de entrega configurada; solo existe en la configuracion. */
  horaEntrega?: number;
}

/**
 * Arma el mensaje de "pedido tomado": encabezado configurado, resumen de los
 * libros con sus especificaciones, importes y pie con la entrega. La app lo
 * arma entero para que el texto salga siempre igual y no dependa de como se
 * escribio la plantilla.
 */
export const armarMensajeTomado = ({
  pedido,
  encabezado,
  fechaEntrega,
  horaEntrega,
}: MensajeTomadoProp): string => {
  const bloques: string[] = [];

  const titulo = encabezado?.trim();
  if (titulo) bloques.push(titulo);

  const libros = resumenLibros(pedido);
  if (libros) bloques.push(`Pedido:\n${libros}`);

  const total = pedido.importeTotal ?? 0;
  const sena = pedido.sena ?? 0;
  const importes: string[] = [`Total: ${formatoImporte(total)}`];
  // La sena solo se informa si existe: un "Seña: $0" en el mensaje confunde.
  if (sena > 0) importes.push(`Seña: ${formatoImporte(sena)}`);
  importes.push(`Saldo: ${formatoImporte(total - sena)}`);
  bloques.push(importes.join('\n'));

  const entrega = pieEntrega(fechaEntrega, horaEntrega);
  if (entrega) bloques.push(entrega);

  return bloques.join('\n\n');
};

/**
 * Variables disponibles en el texto del mensaje. Si la plantilla no usa
 * ninguna, el texto viaja tal cual se cargo en la pagina de mensajes.
 */
export const variablesMensaje = (pedido: PedidoProp): Record<string, string> => ({
  cliente: pedido.cliente?.nombre ?? '',
  fechaEntrega: pedido.fechaEntrega ?? '',
  importe: formatoImporte(pedido.importeTotal ?? 0),
  saldo: formatoImporte((pedido.importeTotal ?? 0) - (pedido.sena ?? 0)),
  libros:
    pedido.libroPedidos?.map(lp => `${lp.cantidad}x ${nombreLibroXstring(lp.libro)}`).join(', ') ??
    '',
});

export const armarMensaje = (plantilla: string | undefined, pedido: PedidoProp): string => {
  if (!plantilla) return '';

  const variables = variablesMensaje(pedido);

  return plantilla.replace(
    /\{(\w+)\}/g,
    (coincidencia, clave: string) => variables[clave] ?? coincidencia
  );
};
