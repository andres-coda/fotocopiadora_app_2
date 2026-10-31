import { describe, it, expect, vi, beforeEach } from 'vitest';
import { cambiarEstadoPedidoAdapter } from './cambioEstado.adapter';
import {
  CambiarEstadoPedidoAdapterProp,
  CambioEstadoPedidoItemAdapterProp,
  ResumenGeneralAdapterProp,
} from '../../modelo/Entidades/pedido_libro/cambioEstado.interface';
import { Estado } from '../../modelo/Entidades/pedido_libro/estado.enum';

const resumenBackend = (
  over: Partial<ResumenGeneralAdapterProp> = {}
): ResumenGeneralAdapterProp => ({
  id: 'res-1',
  pendiente: 1,
  listo: 2,
  retirado: 3,
  cancelado: 4,
  ...over,
});

const itemBackend = (
  over: Partial<CambioEstadoPedidoItemAdapterProp> = {}
): CambioEstadoPedidoItemAdapterProp =>
  ({
    libro: { id: 'libro-1', resumen: resumenBackend() },
    fechaActualizacion: '2026-10-30T10:00:00.000Z',
    estado: Estado.LISTO,
    id: 42,
    idPedido: 'ped-1',
    ...over,
  }) as CambioEstadoPedidoItemAdapterProp;

const cambioBackend = (
  over: Partial<CambiarEstadoPedidoAdapterProp> = {}
): CambiarEstadoPedidoAdapterProp =>
  ({
    id: 'ped-1',
    estado: Estado.LISTO,
    fechaActualizacion: '2026-10-30T10:00:00.000Z',
    cliente: { id: 'cli-1', resumen: resumenBackend({ id: 'cli-res-1' }) },
    items: [itemBackend()],
    ...over,
  }) as CambiarEstadoPedidoAdapterProp;

beforeEach(() => {
  // cambiarEstadoItemAdapter loguea cada item; el test mira el mapeo, no la
  // consola.
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

describe('cambioEstado.adapter: estructura', () => {
  it('arma items, pedido y resumenCliente', () => {
    const resultado = cambiarEstadoPedidoAdapter(cambioBackend());

    expect(Object.keys(resultado).sort()).toEqual(['items', 'pedido', 'resumenCliente']);
  });
});

describe('cambioEstado.adapter: resumen del cliente', () => {
  it('mapea los conteos y fija ultAct y deleted', () => {
    const resultado = cambiarEstadoPedidoAdapter(cambioBackend());

    expect(resultado.resumenCliente).toEqual({
      // El id es el del cliente, no el de la fila de resumen: redux busca al
      // cliente por id para reemplazarle el resumen.
      id: 'cli-1',
      ultAct: 'No se conoce',
      deleted: false,
      pendiente: 1,
      listo: 2,
      retirado: 3,
      cancelado: 4,
    });
  });

  it('ignora el id propio del resumen y usa el del cliente', () => {
    // El fixture trae resumen.id = 'cli-res-1' a proposito: el adapter lo
    // descarta a favor de cliente.id, que es la clave que usa redux.
    const resultado = cambiarEstadoPedidoAdapter(cambioBackend());

    expect(resultado.resumenCliente.id).toBe('cli-1');
    expect(resultado.resumenCliente.id).not.toBe('cli-res-1');
  });

  it('no copia el stock del libro al resumen del cliente', () => {
    // El resumen del cliente y el stock del libro comparten campos, pero solo
    // el segundo lleva stock.
    const resultado = cambiarEstadoPedidoAdapter(
      cambioBackend({
        cliente: { id: 'cli-1', resumen: resumenBackend({ stock: 7 }) },
      })
    );

    expect(resultado.resumenCliente).not.toHaveProperty('stock');
    expect(Object.keys(resultado.resumenCliente).sort()).toEqual([
      'cancelado',
      'deleted',
      'id',
      'listo',
      'pendiente',
      'retirado',
      'ultAct',
    ]);
  });

  it('lanza si el back no manda cliente', () => {
    expect(() => cambiarEstadoPedidoAdapter(cambioBackend({ cliente: undefined }))).toThrow(
      'El cambio de estado no devolvió el resumen del cliente'
    );
  });

  it('lanza si el cliente viene sin resumen', () => {
    const sinResumen = { id: 'cli-1' } as CambiarEstadoPedidoAdapterProp['cliente'];

    expect(() => cambiarEstadoPedidoAdapter(cambioBackend({ cliente: sinResumen }))).toThrow(
      'El cambio de estado no devolvió el resumen del cliente'
    );
  });
});

describe('cambioEstado.adapter: pedido', () => {
  it('mapea id, estado y la fecha de actualizacion', () => {
    const resultado = cambiarEstadoPedidoAdapter(
      cambioBackend({
        id: 'ped-9',
        estado: Estado.RETIRADO,
        fechaActualizacion: '2026-11-01T08:00:00.000Z',
      })
    );

    expect(resultado.pedido).toEqual({
      id: 'ped-9',
      estado: Estado.RETIRADO,
      ultAct: '2026-11-01T08:00:00.000Z',
    });
  });

  it('deja ultAct undefined cuando el back no manda fechaActualizacion', () => {
    const resultado = cambiarEstadoPedidoAdapter(cambioBackend({ fechaActualizacion: undefined }));

    expect(resultado.pedido.ultAct).toBeUndefined();
    expect(resultado.pedido).toHaveProperty('ultAct');
  });
});

describe('cambioEstado.adapter: items', () => {
  it('mapea id, idPedido, estado, fecha y stock de cada item', () => {
    const resultado = cambiarEstadoPedidoAdapter(cambioBackend());

    expect(resultado.items).toHaveLength(1);
    expect(resultado.items[0]).toEqual({
      ultAct: '2026-10-30T10:00:00.000Z',
      idPedido: 'ped-1',
      id: '42',
      estado: Estado.LISTO,
      stock: {
        // Igual que el resumen del cliente: el id es el del libro, que es la
        // clave con la que redux reemplaza el stock del libro.
        id: 'libro-1',
        ultAct: 'No se conoce',
        deleted: false,
        pendiente: 1,
        listo: 2,
        retirado: 3,
        cancelado: 4,
        stock: 0,
      },
    });
  });

  it('convierte el id numerico del item a string', () => {
    const resultado = cambiarEstadoPedidoAdapter(
      cambioBackend({ items: [itemBackend({ id: 7 })] })
    );

    expect(resultado.items[0].id).toBe('7');
    expect(typeof resultado.items[0].id).toBe('string');
  });

  it('usa stock 0 cuando el resumen del libro no lo trae', () => {
    const resultado = cambiarEstadoPedidoAdapter(cambioBackend());

    expect(resultado.items[0].stock.stock).toBe(0);
  });

  it('respeta el stock del libro cuando viene', () => {
    const resultado = cambiarEstadoPedidoAdapter(
      cambioBackend({
        items: [itemBackend({ libro: { id: 'libro-1', resumen: resumenBackend({ stock: 25 }) } })],
      })
    );

    expect(resultado.items[0].stock.stock).toBe(25);
  });

  it('toma la fecha de cada item y no la del pedido', () => {
    const resultado = cambiarEstadoPedidoAdapter(
      cambioBackend({
        fechaActualizacion: '2026-11-01T08:00:00.000Z',
        items: [itemBackend({ fechaActualizacion: '2026-10-30T10:00:00.000Z' })],
      })
    );

    expect(resultado.pedido.ultAct).toBe('2026-11-01T08:00:00.000Z');
    expect(resultado.items[0].ultAct).toBe('2026-10-30T10:00:00.000Z');
  });

  it('deja ultAct undefined en el item cuando no viene la fecha', () => {
    const resultado = cambiarEstadoPedidoAdapter(
      cambioBackend({ items: [itemBackend({ fechaActualizacion: undefined })] })
    );

    expect(resultado.items[0].ultAct).toBeUndefined();
  });

  it('mapea varios items en orden', () => {
    const resultado = cambiarEstadoPedidoAdapter(
      cambioBackend({
        items: [
          itemBackend({ id: 1, libro: { id: 'libro-2', resumen: resumenBackend() } }),
          itemBackend({ id: 2, libro: { id: 'libro-3', resumen: resumenBackend() } }),
        ],
      })
    );

    expect(resultado.items.map(i => i.stock.id)).toEqual(['libro-2', 'libro-3']);
  });

  it('con items vacio devuelve []', () => {
    const resultado = cambiarEstadoPedidoAdapter(cambioBackend({ items: [] }));

    expect(resultado.items).toEqual([]);
  });

  it('con items ausente devuelve []', () => {
    const resultado = cambiarEstadoPedidoAdapter(cambioBackend({ items: undefined }));

    expect(resultado.items).toEqual([]);
  });

  it('lanza si un item no trae libro', () => {
    expect(() =>
      cambiarEstadoPedidoAdapter(cambioBackend({ items: [itemBackend({ libro: undefined })] }))
    ).toThrow('El cambio de estado no devolvió el resumen del libro');
  });

  it('lanza si el libro del item no trae resumen', () => {
    const libroSinResumen = { id: 'libro-1' } as CambioEstadoPedidoItemAdapterProp['libro'];

    expect(() =>
      cambiarEstadoPedidoAdapter(
        cambioBackend({ items: [itemBackend({ libro: libroSinResumen })] })
      )
    ).toThrow('El cambio de estado no devolvió el resumen del libro');
  });
});
