import { ZodObject, ZodRawShape, ZodOptional, ZodNullable } from "zod";
import { BaseProp } from "../modelo/Entidades/base/base.interface";
import { Opcion } from "../componente/formulario/modelo/input.interface";

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

export const formatTelefono = (value: string = ''): string => {

  const numeros = value.replace(/\D/g, '');

  if (numeros.length <= 4) {
    return numeros;
  }

  const ultimos4 = numeros.slice(-4);

  if (numeros.length <= 7) {
    const medio = numeros.slice(0, -4);

    return `${medio} ${ultimos4}`;
  }

  const medio3 = numeros.slice(-7, -4);
  const inicio = numeros.slice(0, -7);

  return [inicio, medio3, ultimos4]
    .filter(Boolean)
    .join('-');
};

interface Prop<T, K extends keyof T = keyof T>{
  items: T[]
  clave?: K; 
}

export const pasarDesplegable = <T extends BaseProp, K extends keyof T = keyof T>({ items, clave }: Prop<T, K>): Opcion[] => {
  const newClave: K = (clave || 'nombre') as K
  const opciones: Opcion[] = items.map(d => {
    return { value: d.id, label: String(d[newClave]) }
  });
  return opciones
}