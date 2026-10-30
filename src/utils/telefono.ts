/**
 * Un celular argentino tiene dos formas de escribirse: la local
 * (`11 15 1234-5678`) y la internacional (`+54 9 11 1234-5678`).
 *
 * WhatsApp solo entiende la internacional, y el `9` no es decorativo: marca que
 * es celular. Sin el lo toma como fijo y contesta "el numero no esta en
 * WhatsApp". Este modulo deja todo guardado en un unico formato.
 */

const AREA_CABA_DIGITOS = 2;
const AREA_INTERIOR_DIGITOS = 3;

/** Maximo de digitos de un numero argentino completo: 54 + 9 + area + numero. */
const LARGO_MAXIMO_ARGENTINA = 13;
const LARGO_MINIMO_ARGENTINA = 12;

/** Rango E.164 para los numeros de otros paises. */
const LARGO_MINIMO_INTERNACIONAL = 8;
const LARGO_MAXIMO_INTERNACIONAL = 15;

/**
 * Saca el `15` con el que se marca un celular local. En CABA el area tiene 2
 * digitos (`11 15 1234-5678`) y en el interior 3 (`221 15 123-4567`).
 */
const sinQuince = (numero: string): string => {
  const area = numero.startsWith('11') ? AREA_CABA_DIGITOS : AREA_INTERIOR_DIGITOS;

  return numero.slice(area, area + 2) === '15'
    ? numero.slice(0, area) + numero.slice(area + 2)
    : numero;
};

/** Arma `54 9 <area> <numero>` a partir de un numero argentino sin codigo de pais. */
const argentina = (local: string): string => {
  const sinCero = local.replace(/^0/, '');
  const sinNueve = sinCero.startsWith('9') ? sinCero.slice(1) : sinCero;

  return `549${sinQuince(sinNueve)}`;
};

/**
 * Devuelve el telefono en formato internacional (`+<pais><numero>`), o
 * `undefined` si no alcanza para armar un numero usable.
 *
 * Argentina es el caso por defecto: ni el alta de cliente ni la de pedido
 * tienen selector de pais, asi que lo que se escribe sin `+` se toma como
 * local. Un numero de otro pais tiene que venir con su codigo y `+` adelante
 * (`+34...`, `+1...`): asi se respeta tal cual y nunca se le agrega el 9
 * argentino.
 *
 * Un numero sin `+` que no cierra como argentino devuelve `undefined` en vez
 * de inventarle un codigo de pais: mandar el mensaje al chat equivocado es peor
 * que pedir que se corrija el dato.
 */
export const normalizarTelefono = (entrada?: string): string | undefined => {
  const original = (entrada ?? '').trim();
  if (!original) return undefined;

  let digitos = original.replace(/\D/g, '');
  if (!digitos) return undefined;

  // `+34...` o `00 34...` ya traen el codigo de pais.
  const internacional = original.startsWith('+') || digitos.startsWith('00');
  if (digitos.startsWith('00')) digitos = digitos.slice(2);

  const numero =
    internacional || digitos.startsWith('54')
      ? digitos.startsWith('54')
        ? `+${argentina(digitos.slice(2))}`
        : `+${digitos}`
      : `+${argentina(digitos)}`;

  const largo = numero.length - 1;

  return numero.startsWith('+54')
    ? largo >= LARGO_MINIMO_ARGENTINA && largo <= LARGO_MAXIMO_ARGENTINA
      ? numero
      : undefined
    : largo >= LARGO_MINIMO_INTERNACIONAL && largo <= LARGO_MAXIMO_INTERNACIONAL
      ? numero
      : undefined;
};
