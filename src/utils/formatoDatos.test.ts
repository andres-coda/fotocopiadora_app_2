import { describe, it, expect } from 'vitest';
import {
  claseXestado,
  claseXestadoPedido,
  estadoPedidoXstring,
  estadoXstring,
  formatoTelefonoMostrar,
  nombreLibroXstring,
  normalizarTexto,
} from './formatoDatos';
import { Estado } from '../modelo/Entidades/pedido_libro/estado.enum';
import { LibroProp, libroInicial } from '../modelo/Entidades/libro/libro.interface';

const libro = (over: Partial<LibroProp> = {}): LibroProp => ({ ...libroInicial, ...over });

describe('normalizarTexto', () => {
  it('pasa a minusculas, saca acentos y recorta', () => {
    expect(normalizarTexto('  Ñandú ÁRBOL  ')).toBe('nandu arbol');
  });

  it('devuelve string vacio sin texto', () => {
    expect(normalizarTexto(undefined)).toBe('');
    expect(normalizarTexto('')).toBe('');
  });
});

describe('formatoTelefonoMostrar', () => {
  it('muestra el numero internacional agrupado', () => {
    expect(formatoTelefonoMostrar('+5491122444872')).toBe('+ 549 112 244 4872');
  });

  it('agrupa igual un numero sin codigo de pais', () => {
    expect(formatoTelefonoMostrar('1122444872')).toBe('+ 112 244 4872');
  });

  it('falla si el numero no tiene digitos suficientes', () => {
    // Un telefono corto no se puede mostrar: es un dato roto, no un telefono.
    expect(() => formatoTelefonoMostrar('123456789')).toThrow('Telefono no valido');
  });
});

describe('claseXestado', () => {
  it.each([
    [Estado.LISTO, 'listo'],
    [Estado.RETIRADO, 'retirado'],
    [Estado.CANCELADO, 'cancelado'],
    [Estado.CONSTRUCCION, 'construccion'],
    [Estado.POR_CONFIRMAR, 'por-confirmar'],
    [Estado.PENDIENTE, 'pendiente'],
    [Estado.IMPRESO_COMPLETO, 'pendiente'],
  ])('%s se pinta con la clase %s', (estado, clase) => {
    expect(claseXestado(estado)).toBe(clase);
  });
});

describe('claseXestadoPedido', () => {
  it.each([
    [Estado.LISTO, 'listo'],
    [Estado.RETIRADO, 'retirado'],
    [Estado.CANCELADO, 'cancelado'],
    [Estado.PENDIENTE, 'pendiente'],
    [Estado.IMPRESO_COMPLETO, 'pendiente'],
  ])('%s se pinta con la clase %s', (estado, clase) => {
    expect(claseXestadoPedido(estado)).toBe(clase);
  });
});

describe('estadoXstring', () => {
  it.each([
    [Estado.PENDIENTE, 'Pendiente'],
    [Estado.LISTO, 'Listo'],
    [Estado.RETIRADO, 'Retirado'],
    [Estado.CANCELADO, 'Cancelado'],
    [Estado.IMPRESO_COMPLETO, 'Impreso'],
    [Estado.IMPRESO_MITAD, 'Imprimiendo...'],
    [Estado.STOCK, 'En stock'],
  ])('traduce %s', (estado, texto) => {
    expect(estadoXstring(estado)).toBe(texto);
  });

  it('avisa cuando el estado no tiene texto propio', () => {
    expect(estadoXstring(Estado.POR_CONFIRMAR)).toBe('todavía no se resolvió este estado');
  });
});

describe('estadoPedidoXstring', () => {
  it.each([
    [Estado.PENDIENTE, 'Pendiente'],
    [Estado.LISTO, 'Listo'],
    [Estado.RETIRADO, 'Retirado'],
    [Estado.CANCELADO, 'Cancelado'],
  ])('traduce %s', (estado, texto) => {
    expect(estadoPedidoXstring(estado)).toBe(texto);
  });

  it('no inventa texto para los estados internos de los libros', () => {
    expect(estadoPedidoXstring(Estado.IMPRESO_MITAD)).toBe('todavía no se resolvió este estado');
  });
});

describe('nombreLibroXstring', () => {
  it('devuelve string vacio sin libro', () => {
    expect(nombreLibroXstring(undefined)).toBe('');
  });

  it('arma el nombre con nivel y componentes cuando existen', () => {
    expect(
      nombreLibroXstring(libro({ nombre: 'Learn', nivel: '1', componentes_texto: 'Activity Book' }))
    ).toBe('Learn - 1 - Activity Book');
  });

  it('omite las partes que el libro no tiene', () => {
    expect(nombreLibroXstring(libro({ nombre: 'Learn' }))).toBe('Learn');
    expect(nombreLibroXstring(libro({ nombre: 'Learn', nivel: '2' }))).toBe('Learn - 2');
  });
});
