import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  esMayorQueHoy,
  fechaParaInput,
  formatearFechaParaDB,
  formatoFecha,
  formatoHora,
  invertirFecha,
  RestarFechasAnos,
  ultFechaAdapter,
} from './calendario';

afterEach(() => {
  vi.useRealTimers();
});

describe('formatoFecha', () => {
  it('devuelve DD-MM-YYYY con dos digitos', () => {
    expect(formatoFecha({ fecha: new Date(2026, 0, 5) })).toBe('05-01-2026');
  });

  it('devuelve string vacio sin fecha', () => {
    expect(formatoFecha({})).toBe('');
  });
});

describe('formatoHora', () => {
  it('arma la hora y los minutos con el formato que se muestra en la tabla', () => {
    expect(formatoHora({ fecha: new Date(2026, 9, 30, 9, 5) })).toBe('9 : 5 hs');
  });

  it('devuelve string vacio sin fecha', () => {
    expect(formatoHora({})).toBe('');
  });
});

describe('formatearFechaParaDB', () => {
  it('deja una fecha sin hora como YYYY-MM-DD', () => {
    expect(formatearFechaParaDB('2026-11-02')).toBe('2026-11-02');
  });

  it('devuelve string vacio sin fecha', () => {
    expect(formatearFechaParaDB('')).toBe('');
  });
});

describe('fechaParaInput', () => {
  it('toma la parte de fecha del ISO completo sin correr por zona horaria', () => {
    // La columna `date` llega como 2026-10-30T03:00:00.000Z. Convertirla con
    // new Date() la pasaria al dia anterior en Argentina.
    expect(fechaParaInput('2026-10-30T03:00:00.000Z')).toBe('2026-10-30');
  });

  it('deja igual un YYYY-MM-DD', () => {
    expect(fechaParaInput('2026-10-30')).toBe('2026-10-30');
  });

  it('convierte un Date a la fecha local', () => {
    expect(fechaParaInput(new Date(2026, 0, 5))).toBe('2026-01-05');
  });

  it('devuelve string vacio con un valor invalido o ausente', () => {
    expect(fechaParaInput('no es una fecha')).toBe('');
    expect(fechaParaInput(undefined)).toBe('');
  });
});

describe('esMayorQueHoy', () => {
  it('compara contra la fecha de hoy', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 30, 12));

    expect(esMayorQueHoy('2026-10-31')).toBe(true);
    expect(esMayorQueHoy('2026-10-30')).toBe(false);
    expect(esMayorQueHoy('2026-10-29')).toBe(false);
  });

  it('devuelve false sin fecha', () => {
    expect(esMayorQueHoy(undefined)).toBe(false);
  });
});

describe('RestarFechasAnos', () => {
  it('cuenta los anios cumplidos', () => {
    expect(RestarFechasAnos({ desde: '1990-10-30', hasta: '2026-10-30' })).toBe(36);
  });

  it('no cuenta el anio si todavia no llego el dia', () => {
    expect(RestarFechasAnos({ desde: '1990-10-30', hasta: '2026-10-29' })).toBe(35);
  });

  it('no cuenta el anio si el mes todavia no llego', () => {
    expect(RestarFechasAnos({ desde: '1990-10-30', hasta: '2026-09-30' })).toBe(35);
  });

  it('toma la fecha de hoy cuando no se pasa el hasta', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 30, 12));

    expect(RestarFechasAnos({ desde: '1990-10-30' })).toBe(36);
  });

  it('exige la fecha de inicio', () => {
    expect(() => RestarFechasAnos({ desde: '' })).toThrow('La fecha del inicio es undefined');
  });
});

describe('invertirFecha', () => {
  it('pasa de YYYY-MM-DD a DD-MM-YYYY', () => {
    expect(invertirFecha('2026-11-02')).toBe('02-11-2026');
  });
});

describe('ultFechaAdapter', () => {
  it('usa la fecha de actualizacion cuando existe', () => {
    expect(
      ultFechaAdapter({
        fechaCreacion: new Date(2026, 0, 5, 9, 5),
        fechaActualizacion: new Date(2026, 9, 30, 18, 45),
      })
    ).toBe('30-10-2026 - 18 : 45 hs');
  });

  it('cae a la fecha de creacion cuando el registro nunca se actualizo', () => {
    expect(ultFechaAdapter({ fechaCreacion: new Date(2026, 0, 5, 9, 5) })).toBe(
      '05-01-2026 - 9 : 5 hs'
    );
  });

  it('no inventa una fecha cuando no hay ninguna', () => {
    expect(ultFechaAdapter({})).toBe('No se conoce');
  });
});
