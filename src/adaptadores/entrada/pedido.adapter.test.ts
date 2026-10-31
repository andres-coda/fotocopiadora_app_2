import { describe, it, expect } from 'vitest';
import { pedidoAdapter, pedidoAdapterArray } from './pedido.adapter';
import { PedidoAdapterProp } from '../../modelo/Entidades/pedido/pedido.interface';
import {
  ClienteAdapterProp,
  clienteInicial,
} from '../../modelo/Entidades/cliente/cliente.interface';
import { resumenInicial } from '../../modelo/Entidades/cliente/resumen.interface';
import { PedidoLibroAdapterProp } from '../../modelo/Entidades/pedido_libro/pedidoLibro.interface';
import { Estado } from '../../modelo/Entidades/pedido_libro/estado.enum';
import { Especificaciones } from '../../modelo/Entidades/especificacion/especificacion.enum';
import { libroInicial } from '../../modelo/Entidades/libro/libro.interface';
import { sedeInicial } from '../../modelo/Entidades/sede/sede.interface';

// Forma en que el back manda el libro: solo los campos obligatorios. El
// adapter tiene que completar el resto (materia vacia, propuesta, etc.).
const libroBackend = () => ({
  id: 'libro-1',
  nombre: 'Matematica 4',
  cantidadPg: 120,
  deleted: false,
  materia: { id: 'mat-1', nombre: 'Matematica', deleted: false },
  componentes: [],
  propuesta: [],
});

const clienteBackend = (over: Partial<ClienteAdapterProp> = {}): ClienteAdapterProp =>
  ({
    id: 'cli-1',
    deleted: false,
    nombre: 'Ana',
    telefono: '+549112345678',
    email: 'ana@mail.com',
    ...over,
  }) as ClienteAdapterProp;

const itemBackend = (over: Partial<PedidoLibroAdapterProp> = {}): PedidoLibroAdapterProp =>
  ({
    id: 'pl-1',
    idPedido: 'ped-1',
    cantidad: 3,
    estado: Estado.PENDIENTE,
    libro: libroBackend(),
    sede: { id: 'sede-1', nombre: 'Centro', deleted: false },
    especificaciones: [Especificaciones.COLOR],
    deleted: false,
    ...over,
  }) as PedidoLibroAdapterProp;

const pedidoBackend = (over: Partial<PedidoAdapterProp> = {}): PedidoAdapterProp =>
  ({
    id: 'ped-1',
    deleted: false,
    fechaCreacion: new Date(2026, 0, 10, 9, 15),
    fechaEntrega: new Date(2026, 10, 5),
    importeTotal: 1500,
    archivos: 2,
    anillados: 1,
    sena: 500,
    estado: Estado.PENDIENTE,
    cliente: clienteBackend(),
    items: [itemBackend()],
    ...over,
  }) as PedidoAdapterProp;

describe('pedido.adapter: mapeo del pedido', () => {
  it('devuelve undefined cuando no recibe pedido', () => {
    expect(pedidoAdapter(undefined)).toBeUndefined();
  });

  it('mapea id, deleted, fechaTomado y el ultAct desde la fecha de creacion', () => {
    const resultado = pedidoAdapter(pedidoBackend())!;

    expect(resultado.id).toBe('ped-1');
    expect(resultado.deleted).toBe(false);
    expect(resultado.fechaTomado).toEqual(new Date(2026, 0, 10, 9, 15));
    expect(resultado.ultAct).toBe('10-01-2026 - 9 : 15 hs');
  });

  it('prefiere fechaActualizacion para el ultAct cuando el back la manda', () => {
    const resultado = pedidoAdapter(
      pedidoBackend({ fechaActualizacion: new Date(2026, 1, 2, 14, 5) })
    )!;

    expect(resultado.ultAct).toBe('02-02-2026 - 14 : 5 hs');
  });

  it("deja ultAct en 'No se conoce' cuando no hay fechaCreacion", () => {
    const resultado = pedidoAdapter(pedidoBackend({ fechaCreacion: undefined }))!;

    expect(resultado.ultAct).toBe('No se conoce');
  });

  it('pasa importes, conteos y estado tal cual vienen del back', () => {
    const resultado = pedidoAdapter(
      pedidoBackend({
        importeTotal: 1500.5,
        archivos: 3,
        anillados: 2,
        sena: 500.25,
        estado: Estado.POR_CONFIRMAR,
      })
    )!;

    expect(resultado.importeTotal).toBe(1500.5);
    expect(resultado.archivos).toBe(3);
    expect(resultado.anillados).toBe(2);
    expect(resultado.sena).toBe(500.25);
    expect(resultado.estado).toBe(Estado.POR_CONFIRMAR);
  });

  it('convierte fechaEntrega a YYYY-MM-DD', () => {
    // formatoFecha arma DD-MM-YYYY y invertirFecha lo da vuelta, que es el
    // formato que esperan los inputs de fecha.
    expect(
      pedidoAdapter(pedidoBackend({ fechaEntrega: new Date(2026, 10, 5) }))!.fechaEntrega
    ).toBe('2026-11-05');
    expect(pedidoAdapter(pedidoBackend({ fechaEntrega: new Date(2026, 0, 9) }))!.fechaEntrega).toBe(
      '2026-01-09'
    );
  });

  it('no deja en el modelo los nombres del DTO (items, fechaCreacion)', () => {
    const resultado = pedidoAdapter(pedidoBackend())!;

    expect(resultado).toHaveProperty('libroPedidos');
    expect(resultado).not.toHaveProperty('items');
    expect(resultado).not.toHaveProperty('fechaCreacion');
    expect(resultado).not.toHaveProperty('fechaActualizacion');
  });
});

describe('pedido.adapter: cliente', () => {
  it('mapea el cliente anidado del pedido', () => {
    const resultado = pedidoAdapter(pedidoBackend())!;

    expect(resultado.cliente).toMatchObject({
      id: 'cli-1',
      deleted: false,
      nombre: 'Ana',
      telefono: '+549112345678',
      email: 'ana@mail.com',
    });
    expect(resultado.cliente.pedidos).toEqual([]);
    // Sin resumen en el back, clienteAdapter cae en el resumen inicial.
    expect(resultado.cliente.resumen).toEqual(resumenInicial);
  });

  it('cae en clienteInicial cuando el back no manda cliente', () => {
    const resultado = pedidoAdapter(pedidoBackend({ cliente: undefined }))!;

    expect(resultado.cliente).toEqual(clienteInicial);
  });
});

describe('pedido.adapter: items', () => {
  it('mapea cada item del back dentro de libroPedidos', () => {
    const resultado = pedidoAdapter(pedidoBackend())!;

    expect(resultado.libroPedidos).toHaveLength(1);
    expect(resultado.libroPedidos[0]).toMatchObject({
      id: 'pl-1',
      idPedido: 'ped-1',
      cantidad: 3,
      estado: Estado.PENDIENTE,
      especificaciones: [Especificaciones.COLOR],
      deleted: false,
      ultAct: 'No se conoce',
    });
    expect(resultado.libroPedidos[0].libro.id).toBe('libro-1');
    expect(resultado.libroPedidos[0].libro.nombre).toBe('Matematica 4');
    expect(resultado.libroPedidos[0].sede.nombre).toBe('Centro');
    // El item no trae el pedido padre: el adapter no lo inventa.
    expect(resultado.libroPedidos[0].pedido).toBeUndefined();
  });

  it('respeta el orden de los items', () => {
    const resultado = pedidoAdapter(
      pedidoBackend({
        items: [itemBackend({ id: 'pl-1' }), itemBackend({ id: 'pl-2' })],
      })
    )!;

    expect(resultado.libroPedidos.map(pl => pl.id)).toEqual(['pl-1', 'pl-2']);
  });

  it('con items vacio devuelve un pedido con libroPedidos vacio', () => {
    const resultado = pedidoAdapter(pedidoBackend({ items: [] }));

    expect(resultado).toBeDefined();
    expect(resultado!.libroPedidos).toEqual([]);
  });

  it('con items ausente devuelve un pedido con libroPedidos vacio', () => {
    const resultado = pedidoAdapter(pedidoBackend({ items: undefined }));

    expect(resultado).toBeDefined();
    expect(resultado!.libroPedidos).toEqual([]);
  });

  it('un item sin especificaciones no rompe el mapeo del pedido', () => {
    const resultado = pedidoAdapter(
      pedidoBackend({ items: [itemBackend({ especificaciones: undefined })] })
    );

    expect(resultado).toBeDefined();
    expect(resultado!.libroPedidos).toHaveLength(1);
    expect(resultado!.libroPedidos[0].id).toBe('pl-1');
    expect(resultado!.libroPedidos[0].libro.id).toBe('libro-1');
  });

  it('un item sin libro ni sede cae en los valores iniciales', () => {
    const resultado = pedidoAdapter(
      pedidoBackend({ items: [itemBackend({ libro: undefined, sede: undefined })] })
    )!;

    expect(resultado.libroPedidos[0].libro).toEqual(libroInicial);
    expect(resultado.libroPedidos[0].sede).toEqual(sedeInicial);
  });

  it('deberia dejar fechaEntrega vacia cuando el back no manda la fecha', () => {
    const resultado = pedidoAdapter(pedidoBackend({ fechaEntrega: undefined }))!;

    expect(resultado.fechaEntrega).toBe('');
  });

  it('deberia dejar especificaciones en [] cuando el item no las manda', () => {
    const resultado = pedidoAdapter(
      pedidoBackend({ items: [itemBackend({ especificaciones: undefined })] })
    )!;

    expect(resultado.libroPedidos[0].especificaciones).toEqual([]);
  });
});

describe('pedido.adapter: pedidoAdapterArray', () => {
  it('mapea cada pedido y conserva el orden', () => {
    const resultado = pedidoAdapterArray([
      pedidoBackend({ id: 'ped-1' }),
      pedidoBackend({ id: 'ped-2' }),
    ]);

    expect(resultado.map(p => p.id)).toEqual(['ped-1', 'ped-2']);
  });

  it('descarta los pedidos que no se pueden mapear', () => {
    // pedidoAdapter devuelve undefined para una entrada vacia; el array no
    // puede quedar con huecos.
    const resultado = pedidoAdapterArray([
      pedidoBackend({ id: 'ped-1' }),
      undefined as unknown as PedidoAdapterProp,
    ]);

    expect(resultado.map(p => p.id)).toEqual(['ped-1']);
  });

  it('sin datos o con array vacio devuelve []', () => {
    expect(pedidoAdapterArray(undefined)).toEqual([]);
    expect(pedidoAdapterArray([])).toEqual([]);
  });
});
