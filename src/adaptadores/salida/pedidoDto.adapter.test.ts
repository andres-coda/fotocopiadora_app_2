import { describe, it, expect } from 'vitest';
import { pedidoDtoAdapter } from './pedidoDto.adapter';
import { formValuesPedido } from '../../modelo/Entidades/pedido/esqPedido.esquema';
import { PedidoLibroConstruccionProp } from '../../modelo/Entidades/pedido_libro/pedidoLibro.interface';
import { Estado } from '../../modelo/Entidades/pedido_libro/estado.enum';
import { Especificaciones } from '../../modelo/Entidades/especificacion/especificacion.enum';
import { libroInicial } from '../../modelo/Entidades/libro/libro.interface';
import { SedeProp } from '../../modelo/Entidades/sede/sede.interface';
import { ClienteProp, clienteInicial } from '../../modelo/Entidades/cliente/cliente.interface';

const sedeNorte: SedeProp = { id: 'sede-2', nombre: 'Norte', deleted: false, ultAct: '' };
const sedeCentro: SedeProp = { id: 'sede-1', nombre: 'Centro', deleted: false, ultAct: '' };

const formPedido: formValuesPedido = {
  nombre: 'Ana',
  telefono: '11 15 1234-5678',
  email: 'ana@mail.com',
  archivos: '2',
  anillados: '1',
  fechaEntrega: '2026-11-05',
  importeTotal: '1500.5',
  sena: '500',
};

const libroConId = (id: string) => ({ ...libroInicial, id });

const libros: PedidoLibroConstruccionProp[] = [
  {
    id: 'pl-1',
    libro: libroConId('libro-1'),
    cantidad: 3,
    especificaciones: [Especificaciones.COLOR],
    estado: Estado.PENDIENTE,
  },
  {
    id: 'pl-2',
    libro: libroConId('libro-2'),
    cantidad: 1,
    detalles: 'Anillado simple',
    especificaciones: [Especificaciones.ANILLADO, Especificaciones.DOBLE_FAZ],
    sede: sedeCentro,
    estado: Estado.PENDIENTE,
  },
];

const cliente: ClienteProp = {
  ...clienteInicial,
  id: 'cli-1',
  nombre: 'Ana',
  telefono: '+549112345678',
  email: 'ana@mail.com',
};

describe('pedidoDto.adapter', () => {
  it('con cliente manda su id y deja clienteDatos afuera del body', () => {
    const dto = pedidoDtoAdapter({
      p: formPedido,
      librosPedidos: libros,
      sede: sedeNorte,
      cliente,
    });

    expect(dto.cliente).toBe('cli-1');
    // El pedido de un cliente existente lo referencia; no lo vuelve a crear.
    expect(dto.clienteDatos).toBeUndefined();
    expect(JSON.stringify(dto)).not.toContain('clienteDatos');
  });

  it('sin cliente arma clienteDatos desde el formulario y deja cliente afuera', () => {
    const dto = pedidoDtoAdapter({ p: formPedido, librosPedidos: libros, sede: sedeNorte });

    expect(dto.cliente).toBeUndefined();
    expect(dto.clienteDatos).toEqual({
      nombre: 'Ana',
      telefono: '+5491112345678',
      email: 'ana@mail.com',
    });
    expect(JSON.stringify(dto)).not.toContain('"cliente"');
  });

  it('convierte a numero los importes y los conteos que el formulario da como texto', () => {
    const dto = pedidoDtoAdapter({ p: formPedido, librosPedidos: [], sede: sedeNorte });

    expect(dto.importeTotal).toBe(1500.5);
    expect(dto.sena).toBe(500);
    expect(dto.archivos).toBe(2);
    expect(dto.anillados).toBe(1);
    expect(typeof dto.importeTotal).toBe('number');
  });

  it('sin libros deja pedidoItems como array vacio', () => {
    expect(pedidoDtoAdapter({ p: formPedido, sede: sedeNorte }).pedidoItems).toEqual([]);
    expect(
      pedidoDtoAdapter({ p: formPedido, librosPedidos: [], sede: sedeNorte }).pedidoItems
    ).toEqual([]);
  });

  it('arma cada item con la sede recibida y respeta la sede propia del libro', () => {
    const dto = pedidoDtoAdapter({ p: formPedido, librosPedidos: libros, sede: sedeNorte });

    expect(dto.pedidoItems).toEqual([
      {
        cantidad: 3,
        especificaciones: [Especificaciones.COLOR],
        id_libro: 'libro-1',
        // Sin sede propia hereda la del pedido (Norte).
        id_sede: 'sede-2',
      },
      {
        cantidad: 1,
        detalles: 'Anillado simple',
        especificaciones: [Especificaciones.ANILLADO, Especificaciones.DOBLE_FAZ],
        id_libro: 'libro-2',
        id_sede: 'sede-1',
      },
    ]);
  });

  it('no filtra las claves del formulario que el DTO no debe mandar', () => {
    const dto = pedidoDtoAdapter({ p: formPedido, librosPedidos: [], sede: sedeNorte });

    expect(Object.keys(dto).sort()).toEqual([
      'anillados',
      'archivos',
      'cliente',
      'clienteDatos',
      'fechaEntrega',
      'importeTotal',
      'pedidoItems',
      'sena',
    ]);
    // `p` trae nombre/telefono/email, pero a nivel pedido no se mandan.
    expect(dto).not.toHaveProperty('nombre');
    expect(dto).not.toHaveProperty('telefono');
    expect(dto).not.toHaveProperty('email');
  });
});
