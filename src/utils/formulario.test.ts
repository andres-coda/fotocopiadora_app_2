import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  esCampoRequerido,
  formatTelefono,
  parseDecimal,
  parseNumero,
  parseOrden,
  parseTelefono,
  parseTextoMayus,
  pasarDesplegable,
  pasarDesplegableOrdenado,
} from './formulario';
import { BaseProp } from '../modelo/Entidades/base/base.interface';

interface Item extends BaseProp {
  nombre: string;
}

const item = (id: string, nombre: string): Item => ({ id, nombre, deleted: false, ultAct: '' });

describe('esCampoRequerido', () => {
  const esquema = z.object({
    nombre: z.string(),
    descripcion: z.string().optional(),
    editor: z.string().nullable(),
  });

  it('marca requerido un campo obligatorio', () => {
    expect(esCampoRequerido(esquema, 'nombre')).toBe(true);
  });

  it('no marca requerido un campo opcional', () => {
    expect(esCampoRequerido(esquema, 'descripcion')).toBe(false);
  });

  it('no marca requerido un campo nullable', () => {
    expect(esCampoRequerido(esquema, 'editor')).toBe(false);
  });
});

describe('parseNumero', () => {
  it('deja solo digitos', () => {
    expect(parseNumero('12a3-4')).toBe('1234');
  });

  it('corta al maximo', () => {
    expect(parseNumero('123456', 3)).toBe('123');
  });

  it('devuelve string vacio con valores vacios', () => {
    expect(parseNumero(undefined)).toBe('');
    expect(parseNumero(null)).toBe('');
    expect(parseNumero(0)).toBe('0');
  });
});

describe('parseOrden', () => {
  it('deja solo digitos', () => {
    expect(parseOrden('a1b2')).toBe('12');
  });

  it('se queda con los ultimos digitos, que es lo que se tipea al final', () => {
    expect(parseOrden('123', 2)).toBe('23');
  });

  it('devuelve string vacio sin valor', () => {
    expect(parseOrden(undefined)).toBe('');
  });
});

describe('parseDecimal', () => {
  it('conserva un decimal y descarta el resto', () => {
    expect(parseDecimal('12.345')).toBe('12.34');
  });

  it('deja los decimales que no sobran', () => {
    expect(parseDecimal('12.3')).toBe('12.3');
  });

  it('saca cualquier caracter que no sea digito o punto', () => {
    expect(parseDecimal('$ 12.50')).toBe('12.50');
  });

  it('respeta el maximo de decimales configurado', () => {
    expect(parseDecimal('12.3456', 50, 3)).toBe('12.345');
  });

  it('respeta el largo maximo', () => {
    expect(parseDecimal('123456789', 5)).toBe('12345');
  });

  it('devuelve string vacio con valores vacios', () => {
    expect(parseDecimal('')).toBe('');
    expect(parseDecimal(undefined)).toBe('');
    expect(parseDecimal(null)).toBe('');
  });
});

describe('parseTextoMayus', () => {
  it('pasa a mayusculas y deja solo letras y espacios', () => {
    expect(parseTextoMayus('hola mundo')).toBe('HOLA MUNDO');
  });

  it('saca numeros y simbolos', () => {
    expect(parseTextoMayus('hola 123!')).toBe('HOLA ');
  });

  it('corta al maximo', () => {
    expect(parseTextoMayus('abcdef', 2)).toBe('AB');
  });

  it('devuelve string vacio sin texto', () => {
    expect(parseTextoMayus('')).toBe('');
  });
});

describe('formatTelefono', () => {
  it('no formatea hasta tener mas de cuatro digitos', () => {
    expect(formatTelefono('1234')).toBe('1234');
  });

  it('separa los ultimos cuatro con un espacio', () => {
    expect(formatTelefono('12345')).toBe('1 2345');
    expect(formatTelefono('1234567')).toBe('123 4567');
  });

  it('separa en tres bloques cuando el numero es largo', () => {
    expect(formatTelefono('1152244487')).toBe('115-224-4487');
  });

  it('conserva el + del codigo de pais', () => {
    expect(formatTelefono('+5491122444872')).toBe('+549112-244-4872');
  });

  it('devuelve string vacio sin telefono', () => {
    expect(formatTelefono()).toBe('');
  });
});

describe('parseTelefono', () => {
  it('conserva el + para no perder el pais', () => {
    // Sin el +, un +34 se leeria como numero argentino.
    expect(parseTelefono('+54 9 11 2244-4872')).toBe('+5491122444872');
  });

  it('deja solo digitos cuando no hay +', () => {
    expect(parseTelefono('11 2244-4872')).toBe('1122444872');
  });

  it('respeta el largo maximo', () => {
    expect(parseTelefono('1122444872', 5)).toBe('11224');
  });

  it('devuelve string vacio con valores vacios', () => {
    expect(parseTelefono(undefined)).toBe('');
    expect(parseTelefono(null)).toBe('');
  });
});

describe('pasarDesplegable', () => {
  it('usa id como value y nombre como label', () => {
    expect(pasarDesplegable({ items: [item('1', 'Ana'), item('2', 'Beto')] })).toEqual([
      { value: '1', label: 'Ana' },
      { value: '2', label: 'Beto' },
    ]);
  });

  it('acepta otra clave como label', () => {
    const conCodigo = [{ ...item('1', 'Ana'), codigo: 'A1' }];

    expect(pasarDesplegable({ items: conCodigo, clave: 'codigo' })).toEqual([
      { value: '1', label: 'A1' },
    ]);
  });
});

describe('pasarDesplegableOrdenado', () => {
  const items = [item('1', 'Ana'), item('2', 'Beto'), item('3', 'Carla')];

  it('devuelve todo en orden cuando no hay seleccionado', () => {
    expect(pasarDesplegableOrdenado({ items })).toEqual([
      { value: '1', label: 'Ana' },
      { value: '2', label: 'Beto' },
      { value: '3', label: 'Carla' },
    ]);
  });

  it('pone el seleccionado primero y no lo repite', () => {
    expect(pasarDesplegableOrdenado({ items, selec: items[2] })).toEqual([
      { value: '3', label: 'Carla' },
      { value: '1', label: 'Ana' },
      { value: '2', label: 'Beto' },
    ]);
  });

  it('usa la clave de comparacion cuando se pasa otra', () => {
    const conCodigo = [
      { ...item('1', 'Ana'), codigo: 'x' },
      { ...item('2', 'Beto'), codigo: 'y' },
      { ...item('3', 'Carla'), codigo: 'x' },
    ];

    expect(
      pasarDesplegableOrdenado({ items: conCodigo, comparacion: 'codigo', selec: conCodigo[0] })
    ).toEqual([
      { value: '1', label: 'Ana' },
      { value: '2', label: 'Beto' },
    ]);
  });
});
