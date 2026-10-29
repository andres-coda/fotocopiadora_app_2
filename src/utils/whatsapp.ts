import { PedidoProp } from '../modelo/Entidades/pedido/pedido.interface';
import { nombreLibroXstring } from './formatoDatos';

/**
 * App de escritorio: reusa la ventana ya abierta del cliente, asi que no
 * aparecen pestanas nuevas. Es el destino primario.
 */
export const BASE_WHATSAPP_APP: string = 'whatsapp://send';

/**
 * Navegador: solo se usa si no hay app de WhatsApp registrada. Crea una pestana
 * por pedido; Chrome no permite reutilizar una pestana existente desde otra app.
 */
export const BASE_WHATSAPP_WEB: string = 'https://web.whatsapp.com/send';

interface WhatsappUrlProp {
  telefono?: string;
  mensaje?: string;
  base?: string;
}

export const soloDigitos = (telefono?: string): string => (telefono ?? '').replace(/\D/g, '');

/**
 * WhatsApp exige el numero completo con codigo de pais y sin simbolos. Los
 * telefonos ya se guardan normalizados (+54...), pero se valida igual porque
 * un numero corto abriria el chat equivocado.
 */
export const telefonoParaWhatsapp = (telefono?: string): string | undefined => {
  const digitos = soloDigitos(telefono);
  return digitos.length >= 10 ? digitos : undefined;
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
