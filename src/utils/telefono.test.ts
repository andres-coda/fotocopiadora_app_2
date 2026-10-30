import { describe, it, expect } from 'vitest';
import { normalizarTelefono } from './telefono';

describe('normalizarTelefono: argentina', () => {
  // Los mismos casos que se verificaron a mano contra el codigo cuando se
  // escribio el normalizador. Fijan el formato que se guarda en cliente.
  it.each([
    ['+5491123456789', '+5491123456789'],
    ['5491123456789', '+5491123456789'],
    ['91123456789', '+5491123456789'],
    ['0111522444872', '+5491122444872'],
    ['111522444872', '+5491122444872'],
    ['0221151234567', '+5492211234567'],
    ['221151234567', '+5492211234567'],
    ['+5492211234567', '+5492211234567'],
    ['+542244448728', '+5492244448728'],
    ['02244448728', '+5492244448728'],
    ['2244448728', '+5492244448728'],
    ['0224154448728', '+5492244448728'],
    ['+5492244448728', '+5492244448728'],
    ['1122444872', '+5491122444872'],
  ])('convierte %s en %s', (entrada, esperado) => {
    expect(normalizarTelefono(entrada)).toBe(esperado);
  });

  it('saca el 15 local en CABA, donde el area tiene dos digitos', () => {
    expect(normalizarTelefono('11 15 2244-4872')).toBe('+5491122444872');
  });

  it('saca el 15 local en el interior, donde el area tiene tres digitos', () => {
    expect(normalizarTelefono('221 15 123-4567')).toBe('+5492211234567');
  });

  it('saca el 0 inicial de la marcacion nacional', () => {
    expect(normalizarTelefono('011 2244-4872')).toBe('+5491122444872');
  });

  it('no agrega el 9 si el numero ya lo trae', () => {
    expect(normalizarTelefono('9 11 2244-4872')).toBe('+5491122444872');
  });

  it('ignora espacios, guiones y parentesis', () => {
    expect(normalizarTelefono('(11) 2244-4872')).toBe('+5491122444872');
  });
});

describe('normalizarTelefono: otros paises', () => {
  it('respeta un numero con codigo de pais distinto de 54', () => {
    expect(normalizarTelefono('+34 612 345 678')).toBe('+34612345678');
  });

  it('nunca le agrega el 9 argentino a un numero de otro pais', () => {
    expect(normalizarTelefono('+1 415 555 2671')).toBe('+14155552671');
  });

  it('acepta el prefijo internacional 00', () => {
    expect(normalizarTelefono('0034 612 345 678')).toBe('+34612345678');
  });

  it('rechaza un numero de otro pais demasiado corto para E.164', () => {
    expect(normalizarTelefono('+34 612')).toBeUndefined();
  });
});

describe('normalizarTelefono: lo que no se puede usar', () => {
  it('no inventa un pais para un numero sin + que no cierra como argentino', () => {
    // Mandar el mensaje al chat equivocado es peor que pedir que corrijan el
    // dato: estos numeros no se guardan y la UI muestra el error.
    expect(normalizarTelefono('11224448728')).toBeUndefined();
    expect(normalizarTelefono('5411224448728')).toBeUndefined();
  });

  it('rechaza un argentino que se pasa de digitos', () => {
    // 011 2244-48728 tiene un digito de mas: con el 549 queda en 14.
    expect(normalizarTelefono('011224448728')).toBeUndefined();
  });

  it.each([undefined, '', '   ', 'sin numeros', '- - -'])('devuelve undefined con %s', entrada => {
    expect(normalizarTelefono(entrada)).toBeUndefined();
  });

  it('rechaza un argentino mas largo que el maximo', () => {
    expect(normalizarTelefono('+549112244487299')).toBeUndefined();
  });
});
