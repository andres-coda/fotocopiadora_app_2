import { describe, it, expect, vi } from 'vitest';
import { paginadoAdapter, PaginadoAdapterProp } from './paginado.adapter';

const adaptadorIdentidad = (d?: number) => d;

describe('paginado.adapter: coercion de la paginacion', () => {
  it('convierte total, limite y pagina a numero cuando el back manda strings', () => {
    // El back los serializa como string (vienen de @Query) y el consumidor
    // hace `pagina + 1`: sin convertir, "2" + 1 === "21".
    const back = {
      total: '5',
      limite: '10',
      pagina: '2',
      datos: [],
    } as unknown as PaginadoAdapterProp<number>;

    const resultado = paginadoAdapter(back, adaptadorIdentidad);

    expect(resultado.total).toBe(5);
    expect(resultado.limite).toBe(10);
    expect(resultado.pagina).toBe(2);
    expect(typeof resultado.total).toBe('number');
    expect(typeof resultado.limite).toBe('number');
    expect(typeof resultado.pagina).toBe('number');
    expect(resultado.pagina + 1).toBe(3);
  });

  it('deja los numeros como estan', () => {
    const resultado = paginadoAdapter<number, number>(
      { total: 5, limite: 10, pagina: 2, datos: [] },
      adaptadorIdentidad
    );

    expect(resultado).toEqual({ total: 5, limite: 10, pagina: 2, datos: [] });
  });

  it('usa 0, 20 y 1 cuando faltan total, limite y pagina', () => {
    const resultado = paginadoAdapter<number, number>({ datos: [] }, adaptadorIdentidad);

    expect(resultado.total).toBe(0);
    expect(resultado.limite).toBe(20);
    expect(resultado.pagina).toBe(1);
  });

  it('respeta el 0 explicito en vez de tratarlo como ausente', () => {
    const resultado = paginadoAdapter<number, number>(
      { total: 0, limite: 0, pagina: 0, datos: [] },
      adaptadorIdentidad
    );

    expect(resultado.total).toBe(0);
    expect(resultado.limite).toBe(0);
    expect(resultado.pagina).toBe(0);
  });
});

describe('paginado.adapter: datos', () => {
  it('mapea los datos con el adapter recibido y respeta el orden', () => {
    const adapter = vi.fn((d?: number) => (d === undefined ? undefined : d * 10));

    const resultado = paginadoAdapter<number, number>(
      { total: 3, limite: 3, pagina: 1, datos: [1, 2, 3] },
      adapter
    );

    expect(resultado.datos).toEqual([10, 20, 30]);
    expect(adapter).toHaveBeenCalledTimes(3);
    expect(adapter).toHaveBeenNthCalledWith(1, 1);
    expect(adapter).toHaveBeenNthCalledWith(2, 2);
    expect(adapter).toHaveBeenNthCalledWith(3, 3);
  });

  it('descarta los elementos cuyo adapter devuelve undefined', () => {
    const adapter = (d?: number) => (d === 2 ? undefined : d);

    const resultado = paginadoAdapter<number, number>(
      { total: 3, limite: 3, pagina: 1, datos: [1, 2, 3] },
      adapter
    );

    expect(resultado.datos).toEqual([1, 3]);
  });

  it('descarta los elementos cuyo adapter devuelve null', () => {
    // El adapter no declara null, pero un adaptador que lo devuelva no puede
    // colar el hueco dentro de datos.
    const adapter = ((d?: number) => (d === 2 ? null : d)) as unknown as (
      d?: number
    ) => number | undefined;

    const resultado = paginadoAdapter<number, number>(
      { total: 3, limite: 3, pagina: 1, datos: [1, 2, 3] },
      adapter
    );

    expect(resultado.datos).toEqual([1, 3]);
  });

  it('con datos vacio devuelve [] y no llama al adapter', () => {
    const adapter = vi.fn(adaptadorIdentidad);

    const resultado = paginadoAdapter<number, number>({ datos: [] }, adapter);

    expect(resultado.datos).toEqual([]);
    expect(adapter).not.toHaveBeenCalled();
  });

  it('deberia conservar valores falsy devueltos por el adapter', () => {
    const resultado = paginadoAdapter<number, number>(
      { total: 3, limite: 3, pagina: 1, datos: [0, 1, 2] },
      adaptadorIdentidad
    );

    expect(resultado.datos).toEqual([0, 1, 2]);
  });
});
