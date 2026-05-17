import { ZodObject, ZodRawShape, ZodOptional, ZodNullable } from "zod";

export function esCampoRequerido<T extends ZodRawShape>(
  esquema: ZodObject<T>,
  key: keyof T
): boolean {
  const campo = esquema.shape[key];

  // Si el campo es ZodOptional o ZodNullable, no es requerido
  return !(campo instanceof ZodOptional || campo instanceof ZodNullable);
}

export const parseNumero = (value: unknown, maxLength = 50): string => {
  const str = String(value ?? "");
  return str.replace(/\D/g, "").slice(0, maxLength);
};

export const parseOrden = (value: unknown, maxLength = 2): string => {
  const str = String(value ?? "");
  const digits = str.replace(/\D/g, "");
  return digits.slice(-maxLength);
};

// ALTERNATIVA: Si prefieres coma como separador decimal (estilo argentino)
export const parseDecimal = (
  value: string | number | undefined | null,
  maxLength = 50,
  maxDecimals = 2
): string => {

  let resultado = String(value ?? '')
    .replace(/[^\d.]/g, "")
    .replace(/(\..*)\./g, "$1");

  const partes = resultado.split(".");

  if (partes.length > 1 && partes[1].length > maxDecimals) {
    resultado = `${partes[0]}.${partes[1].slice(0, maxDecimals)}`;
  }

  return resultado.slice(0, maxLength);
};

export const parseTextoMayus = (value: string, maxLength = 50): string => {
  if (!value) return "";

  const resultado = value
    .replace(/[^a-zA-Z\s]/g, "") // Solo letras y espacios
    .toUpperCase()
    .slice(0, maxLength);

  return resultado;
};