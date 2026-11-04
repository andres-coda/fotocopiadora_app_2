import { describe, it, expect } from 'vitest';
import type { PayloadAction } from '@reduxjs/toolkit';
import { agregarPrecioSocket } from './funcionesPrecio';
import type { PrecioProp } from '../../modelo/Entidades/precio/precio.interface';
import type {
  ReduxProp,
  UltimaBusquedaProp,
  orden,
} from '../modelo/reduxContext.interface';

// `ultAct` es la fecha de ultima actualizacion que manda la API y es el orden
// por defecto del slice de precio.
const precio = (
  id: string,
  nombre: string,
  importe: number,
  ultAct = '2024-01-01T00:00:00.000Z'
): PrecioProp => ({
  id,
  nombre,
  importe,
  ultAct,
  deleted: false,
});

interface BusquedaParam {
  query?: string;
  limite?: number;
  sortBy?: keyof PrecioProp;
  sortOrder?: orden;
  datos?: PrecioProp[];
}

const crearBusqueda = ({
  query,
  limite = 20,
  sortBy = 'ultAct',
  sortOrder = 'asc',
  datos = [],
}: BusquedaParam = {}): UltimaBusquedaProp<PrecioProp> => ({
  query,
  datosQuery: [...datos],
  sortBy,
  sortOrder,
  pagina: 1,
  limite,
  total: datos.length,
});

// Cada estructura se crea con objetos propios: si compartieran referencia, un
// error en una quedaria tapado por la otra.
const crearState = (
  busquedaActual: UltimaBusquedaProp<PrecioProp>,
  datosIniciales: UltimaBusquedaProp<PrecioProp> = crearBusqueda({
    datos: busquedaActual.datosQuery,
    query: busquedaActual.query,
    limite: busquedaActual.limite,
    sortBy: busquedaActual.sortBy,
    sortOrder: busquedaActual.sortOrder,
  }),
  ultimasBusqueda: UltimaBusquedaProp<PrecioProp>[] = [
    crearBusqueda({
      datos: busquedaActual.datosQuery,
      query: busquedaActual.query,
      limite: busquedaActual.limite,
      sortBy: busquedaActual.sortBy,
      sortOrder: busquedaActual.sortOrder,
    }),
  ]
): ReduxProp<PrecioProp> => ({
  busquedaActual,
  datosIniciales,
  ultimasBusqueda,
  cargaInicial: true,
});

const accion = (payload: PrecioProp): PayloadAction<PrecioProp> => ({
  type: 'precio/agregarPrecioSocket',
  payload,
});

const ids = (datos: PrecioProp[]) => datos.map(p => p.id);

describe('agregarPrecioSocket: coincidencia con la query', () => {
  it('inserta cuando el nombre coincide sin importar mayusculas en la query', () => {
    const state = crearState(crearBusqueda({ query: 'LAPIZ' }));
    const nuevo = precio('p1', 'lapiz rojo', 100);

    agregarPrecioSocket(state, accion(nuevo));

    expect(state).toEqual(
      crearState(
        crearBusqueda({ query: 'LAPIZ', datos: [nuevo] }),
        crearBusqueda({ query: 'LAPIZ', datos: [nuevo] }),
        [crearBusqueda({ query: 'LAPIZ', datos: [nuevo] })]
      )
    );
  });

  it('inserta cuando el nombre viene en mayusculas y la query en minusculas', () => {
    const state = crearState(crearBusqueda({ query: 'lapiz' }));
    const nuevo = precio('p1', 'LAPIZ ROJO', 100);

    agregarPrecioSocket(state, accion(nuevo));

    expect(ids(state.busquedaActual.datosQuery)).toEqual(['p1']);
    expect(state.busquedaActual.total).toBe(1);
  });

  it('no inserta cuando el nombre no coincide con la query', () => {
    const state = crearState(crearBusqueda({ query: 'cuaderno' }));
    const antes = structuredClone(state);

    agregarPrecioSocket(state, accion(precio('p1', 'lapiz rojo', 100)));

    expect(state).toEqual(antes);
  });

  it('una query vacia coincide con cualquier nombre', () => {
    const state = crearState(crearBusqueda({ query: '' }));
    const nuevo = precio('p1', 'cualquier cosa', 100);

    agregarPrecioSocket(state, accion(nuevo));

    expect(ids(state.busquedaActual.datosQuery)).toEqual(['p1']);
    expect(state.busquedaActual.total).toBe(1);
  });

  it('una query indefinida coincide con cualquier nombre', () => {
    const state = crearState(crearBusqueda());
    const nuevo = precio('p1', 'cualquier cosa', 100);

    agregarPrecioSocket(state, accion(nuevo));

    expect(ids(state.busquedaActual.datosQuery)).toEqual(['p1']);
    expect(state.busquedaActual.total).toBe(1);
  });
});

describe('agregarPrecioSocket: limites y duplicados', () => {
  it('no inserta cuando la lista ya alcanzo el limite', () => {
    const datos = [precio('p1', 'lapiz rojo', 100), precio('p2', 'lapiz azul', 200)];
    const state = crearState(crearBusqueda({ limite: 2, datos }));
    const antes = structuredClone(state);

    agregarPrecioSocket(state, accion(precio('p3', 'lapiz verde', 300)));

    expect(state).toEqual(antes);
  });

  it('no inserta cuando el id ya existe y no incrementa total', () => {
    const datos = [precio('p1', 'lapiz rojo', 100)];
    const state = crearState(crearBusqueda({ datos }));
    const antes = structuredClone(state);

    agregarPrecioSocket(state, accion(precio('p1', 'lapiz duplicado', 999)));

    expect(state).toEqual(antes);
    expect(state.busquedaActual.total).toBe(1);
    expect(state.busquedaActual.datosQuery[0].nombre).toBe('lapiz rojo');
  });
});

describe('agregarPrecioSocket: orden', () => {
  it('mantiene el orden ascendente por un campo numerico', () => {
    const datos = [precio('p1', 'algo', 300), precio('p2', 'otro', 100)];
    const state = crearState(crearBusqueda({ datos, sortBy: 'importe', sortOrder: 'asc' }));

    agregarPrecioSocket(state, accion(precio('p3', 'nuevo', 200)));

    expect(ids(state.busquedaActual.datosQuery)).toEqual(['p2', 'p3', 'p1']);
    expect(state.busquedaActual.datosQuery.map(p => p.importe)).toEqual([100, 200, 300]);
  });

  it('mantiene el orden descendente por un campo numerico', () => {
    const datos = [precio('p1', 'algo', 300), precio('p2', 'otro', 100)];
    const state = crearState(crearBusqueda({ datos, sortBy: 'importe', sortOrder: 'desc' }));

    agregarPrecioSocket(state, accion(precio('p3', 'nuevo', 200)));

    expect(ids(state.busquedaActual.datosQuery)).toEqual(['p1', 'p3', 'p2']);
    expect(state.busquedaActual.datosQuery.map(p => p.importe)).toEqual([300, 200, 100]);
  });

  it('mantiene el orden ascendente por un campo de texto', () => {
    const datos = [precio('p1', 'cuaderno', 1), precio('p2', 'zapato', 2)];
    const state = crearState(crearBusqueda({ datos, sortBy: 'nombre', sortOrder: 'asc' }));

    agregarPrecioSocket(state, accion(precio('p3', 'lapiz', 3)));

    expect(state.busquedaActual.datosQuery.map(p => p.nombre)).toEqual([
      'cuaderno',
      'lapiz',
      'zapato',
    ]);
  });

  it('mantiene el orden descendente por un campo de texto', () => {
    const datos = [precio('p1', 'cuaderno', 1), precio('p2', 'zapato', 2)];
    const state = crearState(crearBusqueda({ datos, sortBy: 'nombre', sortOrder: 'desc' }));

    agregarPrecioSocket(state, accion(precio('p3', 'lapiz', 3)));

    expect(state.busquedaActual.datosQuery.map(p => p.nombre)).toEqual([
      'zapato',
      'lapiz',
      'cuaderno',
    ]);
  });
});

describe('agregarPrecioSocket: total y estructuras', () => {
  it('incrementa total en exactamente uno al insertar', () => {
    const datos = [precio('p1', 'lapiz rojo', 100)];
    const state = crearState(crearBusqueda({ datos }));

    agregarPrecioSocket(state, accion(precio('p2', 'lapiz azul', 200)));

    expect(state.busquedaActual.total).toBe(2);
    expect(state.datosIniciales.total).toBe(2);
    expect(state.ultimasBusqueda[0].total).toBe(2);
  });

  it('actualiza las tres estructuras y respeta la query y el limite de cada busqueda', () => {
    const state = crearState(
      crearBusqueda({ query: 'lapiz', limite: 20 }),
      crearBusqueda({ query: 'lapiz', limite: 20 }),
      [
        crearBusqueda({ query: 'lapiz', limite: 5 }),
        crearBusqueda({ query: 'cuaderno', limite: 5 }),
      ]
    );
    const nuevo = precio('p1', 'lapiz azul', 100);

    agregarPrecioSocket(state, accion(nuevo));

    expect(state).toEqual({
      busquedaActual: crearBusqueda({ query: 'lapiz', limite: 20, datos: [nuevo] }),
      datosIniciales: crearBusqueda({ query: 'lapiz', limite: 20, datos: [nuevo] }),
      ultimasBusqueda: [
        crearBusqueda({ query: 'lapiz', limite: 5, datos: [nuevo] }),
        crearBusqueda({ query: 'cuaderno', limite: 5 }),
      ],
      cargaInicial: true,
    });
  });

  it('no muta los arreglos originales', () => {
    const datos = [precio('p1', 'lapiz rojo', 100)];
    const state = crearState(crearBusqueda({ datos }));
    const arregloActual = state.busquedaActual.datosQuery;
    const arregloInicial = state.datosIniciales.datosQuery;
    const arregloUltimas = state.ultimasBusqueda[0].datosQuery;

    agregarPrecioSocket(state, accion(precio('p2', 'lapiz azul', 200)));

    expect(state.busquedaActual.datosQuery).not.toBe(arregloActual);
    expect(state.datosIniciales.datosQuery).not.toBe(arregloInicial);
    expect(state.ultimasBusqueda[0].datosQuery).not.toBe(arregloUltimas);
    expect(arregloActual).toHaveLength(1);
    expect(arregloInicial).toHaveLength(1);
    expect(arregloUltimas).toHaveLength(1);
    expect(arregloActual[0].id).toBe('p1');
  });
});
