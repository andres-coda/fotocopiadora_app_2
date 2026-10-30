import { describe, it, expect } from 'vitest';
import { busquedaQueryParams } from './busquedaQueryParams';

const sinFiltros = { estado: [], especificaciones: [], entrega: '', tomado: '' };

describe('busquedaQueryParams', () => {
  it('devuelve string vacio cuando no hay filtros ni orden', () => {
    expect(busquedaQueryParams(sinFiltros, [])).toBe('');
  });

  it('repite el param por cada valor en vez de armar un CSV', () => {
    expect(busquedaQueryParams({ ...sinFiltros, estado: [1, 2, 3] }, [])).toBe(
      'estado=1&estado=2&estado=3'
    );
  });

  it('usa el nombre especificacion para ese grupo', () => {
    expect(busquedaQueryParams({ ...sinFiltros, especificaciones: ['color', 'b_n'] }, [])).toBe(
      'especificacion=color&especificacion=b_n'
    );
  });

  it('omite los grupos vacios', () => {
    expect(busquedaQueryParams({ ...sinFiltros, entrega: '2026-11-02' }, [])).toBe(
      'entrega=2026-11-02'
    );
  });

  it('emite el orden como campo:direccion', () => {
    expect(busquedaQueryParams(sinFiltros, [{ campo: 'fechaEntrega', direccion: 'asc' }])).toBe(
      'orden=fechaEntrega:asc'
    );
  });

  it('mantiene el orden de los filtros y despues el del orden', () => {
    expect(
      busquedaQueryParams(
        { estado: [1], especificaciones: ['color'], entrega: '2026-11-02', tomado: '2026-10-30' },
        [
          { campo: 'nombre', direccion: 'desc' },
          { campo: 'fechaEntrega', direccion: 'asc' },
        ]
      )
    ).toBe(
      'estado=1&especificacion=color&entrega=2026-11-02&tomado=2026-10-30&orden=nombre:desc&orden=fechaEntrega:asc'
    );
  });
});
