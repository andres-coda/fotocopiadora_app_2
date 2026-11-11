import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { createElement } from 'react';
import type { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import useSockets from './useSockets';
import socket from '../../socket';
import { precioSlice } from '../../redux/state/precio.state';
import { clienteSlice } from '../../redux/state/cliente.state';
import { Mens } from '../../modelo/socket/enum/mens.enum';
import type { PrecioProp } from '../../modelo/Entidades/precio/precio.interface';
import type { ClienteProp } from '../../modelo/Entidades/cliente/cliente.interface';
import { resumenInicial } from '../../modelo/Entidades/cliente/resumen.interface';
import type {
  ReduxProp,
  UltimaBusquedaProp,
} from '../../redux/modelo/reduxContext.interface';

// `token` se lee desde el factory para poder cambiarlo entre tests sin
// reimportar el hook.
let token: string | null = null;
vi.mock('../autenticacion/useAutenticacion', () => ({
  useAutenticacion: () => ({ token }),
}));

// `setupTests.ts` mockea `src/socket.ts` con on/off/onAny/offAny/emit/
// connect/disconnect. Se tipa aca para poder inspeccionar las llamadas.
interface SocketMock {
  on: Mock;
  off: Mock;
  onAny: Mock;
  offAny: Mock;
  emit: Mock;
  disconnect: Mock;
  connect: Mock;
  auth?: Record<string, unknown>;
  id?: string;
}

const socketMock = socket as unknown as SocketMock;

const precio = (id: string, nombre: string, importe: number): PrecioProp => ({
  id,
  nombre,
  importe,
  ultAct: '2024-01-01T00:00:00.000Z',
  deleted: false,
});

const crearBusqueda = <T,>(
  datos: T[] = [],
  query?: string
): UltimaBusquedaProp<T> => ({
  query,
  datosQuery: [...datos],
  sortBy: 'ultAct' as keyof T,
  sortOrder: 'asc',
  pagina: 1,
  limite: 20,
  total: datos.length,
});

const crearState = <T,>(busquedaActual: T[] = []): ReduxProp<T> => ({
  busquedaActual: crearBusqueda(busquedaActual),
  datosIniciales: crearBusqueda(busquedaActual),
  ultimasBusqueda: [crearBusqueda(busquedaActual)],
  datoSeleccionado: undefined,
  cargaInicial: true,
});

const crearStore = (state: ReduxProp<PrecioProp> = crearState<PrecioProp>()) =>
  configureStore({
    reducer: { precio: precioSlice.reducer },
    preloadedState: { precio: state },
  });

const cliente = (
  id: string,
  nombre: string,
  telefono?: string
): ClienteProp => ({
  id,
  nombre,
  telefono,
  ultAct: '2024-01-01T00:00:00.000Z',
  deleted: false,
  resumen: resumenInicial,
  pedidos: [],
});

const crearStoreCliente = (state: ReduxProp<ClienteProp> = crearState<ClienteProp>()) =>
  configureStore({
    reducer: { cliente: clienteSlice.reducer },
    preloadedState: { cliente: state },
  });

type Store = ReturnType<typeof crearStore> | ReturnType<typeof crearStoreCliente>;

const montar = (store: Store) =>
  renderHook(() => useSockets({}), {
    wrapper: ({ children }: { children: ReactNode }) =>
      createElement(Provider, { store: store as ReturnType<typeof crearStore>, children }),
  });

// Los handlers se registran con `socket.on(evento, handler)`: se buscan en las
// llamadas del mock en lugar de asumir el orden de registro. Puede haber mas de
// uno por evento (una entidad por handler), asi que se invocan todos.
const handlersDe = (evento: string) =>
  socketMock.on.mock.calls
    .filter(([registrado]) => registrado === evento)
    .map(([, handler]) => handler as (payload: unknown) => void);

const emitir = (evento: string, payload: unknown) => {
  act(() => {
    handlersDe(evento).forEach(handler => handler(payload));
  });
};

const ids = (datos: PrecioProp[]) => datos.map(p => p.id);

beforeEach(() => {
  token = null;
  socketMock.auth = undefined;
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

describe('useSockets: conexion', () => {
  it('con token conecta y le pasa el token al socket', () => {
    token = 'jwt-123';

    montar(crearStore());

    expect(socketMock.connect).toHaveBeenCalledTimes(1);
    expect(socketMock.auth).toEqual({ token: 'jwt-123' });
  });

  it('sin token no conecta y desconecta', () => {
    montar(crearStore());

    expect(socketMock.connect).not.toHaveBeenCalled();
    expect(socketMock.disconnect).toHaveBeenCalled();
  });

  it('al desmontar desconecta', () => {
    token = 'jwt-123';
    const { unmount } = montar(crearStore());

    unmount();

    expect(socketMock.disconnect).toHaveBeenCalled();
  });
});

describe('useSockets: evento create', () => {
  it('agrega el precio nuevo a las tres estructuras del store', () => {
    const store = crearStore();
    montar(store);
    const nuevo = precio('p3', 'grapado', 150);

    emitir(Mens.CREAR, { mensaje: Mens.CREAR, entidad: 'precio', dato: nuevo });

    const { precio: estado } = store.getState();
    expect(ids(estado.busquedaActual.datosQuery)).toEqual(['p3']);
    expect(ids(estado.datosIniciales.datosQuery)).toEqual(['p3']);
    expect(ids(estado.ultimasBusqueda[0].datosQuery)).toEqual(['p3']);
    expect(estado.busquedaActual.datosQuery[0]).toEqual(nuevo);
    expect(estado.busquedaActual.total).toBe(1);
  });

  it('ignora entidades que no son precio', () => {
    const store = crearStore();
    montar(store);
    const antes = structuredClone(store.getState().precio);

    emitir(Mens.CREAR, {
      mensaje: Mens.CREAR,
      entidad: 'cliente',
      dato: { id: 'c1', nombre: 'Ana' },
    });

    expect(store.getState().precio).toEqual(antes);
  });
});

describe('useSockets: evento updeate', () => {
  it('actualiza el precio existente en la busqueda actual', () => {
    const original = precio('p1', 'lapiz', 100);
    const store = crearStore(crearState([original]));
    montar(store);
    const editado = precio('p1', 'lapiz premium', 250);

    emitir(Mens.EDITAR, { mensaje: Mens.EDITAR, entidad: 'precio', dato: editado });

    const { precio: estado } = store.getState();
    expect(estado.busquedaActual.datosQuery).toHaveLength(1);
    expect(estado.busquedaActual.datosQuery[0]).toEqual(editado);
    expect(estado.datosIniciales.datosQuery[0].nombre).toBe('lapiz premium');
    expect(estado.ultimasBusqueda[0].datosQuery[0].importe).toBe(250);
  });
});

describe('useSockets: evento deleted', () => {
  it('elimina el precio por id de la busqueda actual', () => {
    const store = crearStore(crearState([precio('p1', 'lapiz', 100), precio('p2', 'goma', 50)]));
    montar(store);

    emitir(Mens.ELIMINAR, { mensaje: Mens.ELIMINAR, entidad: 'precio', id: 'p1' });

    const { precio: estado } = store.getState();
    expect(ids(estado.busquedaActual.datosQuery)).toEqual(['p2']);
    expect(ids(estado.datosIniciales.datosQuery)).toEqual(['p2']);
    expect(ids(estado.ultimasBusqueda[0].datosQuery)).toEqual(['p2']);
  });
});

describe('useSockets: cliente', () => {
  const idsCliente = (datos: ClienteProp[]) => datos.map(c => c.id);

  it('agrega el cliente nuevo a las tres estructuras del store', () => {
    const store = crearStoreCliente();
    montar(store);

    emitir(Mens.CREAR, {
      mensaje: Mens.CREAR,
      entidad: 'cliente',
      dato: {
        id: 'c1',
        nombre: 'Ana',
        telefono: '+5491100000001',
        deleted: false,
        fechaCreacion: '2024-01-02T00:00:00.000Z',
        resumen: { pendiente: 0, listo: 0, retirado: 0, cancelado: 0 },
      },
    });

    const { cliente: estado } = store.getState();
    expect(idsCliente(estado.busquedaActual.datosQuery)).toEqual(['c1']);
    expect(idsCliente(estado.datosIniciales.datosQuery)).toEqual(['c1']);
    expect(idsCliente(estado.ultimasBusqueda[0].datosQuery)).toEqual(['c1']);
    expect(estado.busquedaActual.datosQuery[0].nombre).toBe('Ana');
    expect(estado.busquedaActual.total).toBe(1);
  });

  it('no agrega un cliente que no coincide con la busqueda activa', () => {
    const store = crearStoreCliente({
      ...crearState<ClienteProp>(),
      busquedaActual: { ...crearBusqueda<ClienteProp>(), query: 'gomez' },
    });
    montar(store);

    emitir(Mens.CREAR, {
      mensaje: Mens.CREAR,
      entidad: 'cliente',
      dato: { id: 'c1', nombre: 'Ana Perez', deleted: false },
    });

    expect(store.getState().cliente.busquedaActual.datosQuery).toHaveLength(0);
  });

  it('actualiza el cliente existente al recibir updeate', () => {
    const store = crearStoreCliente(crearState([cliente('c1', 'Ana')]));
    montar(store);

    emitir(Mens.EDITAR, {
      mensaje: Mens.EDITAR,
      entidad: 'cliente',
      dato: { id: 'c1', nombre: 'Ana Gomez', telefono: '+5491100000002', deleted: false },
    });

    const { cliente: estado } = store.getState();
    expect(estado.busquedaActual.datosQuery).toHaveLength(1);
    expect(estado.busquedaActual.datosQuery[0].nombre).toBe('Ana Gomez');
    expect(estado.datosIniciales.datosQuery[0].telefono).toBe('+5491100000002');
    expect(estado.ultimasBusqueda[0].datosQuery[0].nombre).toBe('Ana Gomez');
  });

  it('elimina el cliente por id en las tres estructuras', () => {
    const store = crearStoreCliente(crearState([cliente('c1', 'Ana'), cliente('c2', 'Pedro')]));
    montar(store);

    emitir(Mens.ELIMINAR, { mensaje: Mens.ELIMINAR, entidad: 'cliente', id: 'c1' });

    const { cliente: estado } = store.getState();
    expect(idsCliente(estado.busquedaActual.datosQuery)).toEqual(['c2']);
    expect(idsCliente(estado.datosIniciales.datosQuery)).toEqual(['c2']);
    expect(idsCliente(estado.ultimasBusqueda[0].datosQuery)).toEqual(['c2']);
  });
});

describe('useSockets: payloads invalidos', () => {
  it('ignora un dato que no se puede normalizar sin lanzar', () => {
    const store = crearStore();
    montar(store);
    const antes = structuredClone(store.getState().precio);

    expect(() =>
      emitir(Mens.CREAR, { mensaje: Mens.CREAR, entidad: 'precio', dato: null })
    ).not.toThrow();

    expect(store.getState().precio).toEqual(antes);
  });
});
