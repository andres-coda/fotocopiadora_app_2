import { describe, it, expect } from 'vitest';
import {
  estadoFinalPedido,
  estadosPedidoParaDesplegable,
  estadosParaDesplegable,
  pasarEstadoDesplegable,
} from './estado';
import { Estado } from '../modelo/Entidades/pedido_libro/estado.enum';
import { pedidoInicial, PedidoProp } from '../modelo/Entidades/pedido/pedido.interface';
import {
  PedidoLibroProp,
  pedidoLibroInicial,
} from '../modelo/Entidades/pedido_libro/pedidoLibro.interface';

const pedidoCon = (...estados: Estado[]): PedidoProp => ({
  ...pedidoInicial,
  libroPedidos: estados.map((estado, i): PedidoLibroProp => ({
    ...pedidoLibroInicial,
    id: `lp${i}`,
    estado,
  })),
});

describe('estadoFinalPedido', () => {
  it('devuelve construccion cuando no hay pedido', () => {
    expect(estadoFinalPedido(undefined)).toBe(Estado.CONSTRUCCION);
  });

  it('devuelve construccion cuando el pedido no tiene libros', () => {
    expect(estadoFinalPedido(pedidoCon())).toBe(Estado.CONSTRUCCION);
  });

  it('se queda con el estado mas atrasado de los libros', () => {
    // Un pedido con un libro listo y otro pendiente sigue pendiente: hay algo
    // que el cliente todavia no puede retirar entero.
    expect(estadoFinalPedido(pedidoCon(Estado.LISTO, Estado.PENDIENTE))).toBe(Estado.PENDIENTE);
  });

  it('impreso vale mas que listo', () => {
    expect(estadoFinalPedido(pedidoCon(Estado.LISTO, Estado.IMPRESO_MITAD))).toBe(
      Estado.IMPRESO_MITAD
    );
  });

  it('retirado pesa mas que cancelado', () => {
    expect(estadoFinalPedido(pedidoCon(Estado.CANCELADO, Estado.RETIRADO))).toBe(Estado.RETIRADO);
  });

  it('stock no le gana a construccion', () => {
    expect(estadoFinalPedido(pedidoCon(Estado.STOCK))).toBe(Estado.CONSTRUCCION);
  });

  it('devuelve el unico estado cuando hay un solo libro', () => {
    expect(estadoFinalPedido(pedidoCon(Estado.LISTO))).toBe(Estado.LISTO);
  });
});

describe('pasarEstadoDesplegable', () => {
  it('arma las opciones desde los estados de pedido', () => {
    expect(pasarEstadoDesplegable(estadosPedidoParaDesplegable)).toEqual([
      { value: String(Estado.PENDIENTE), label: 'Pendiente' },
      { value: String(Estado.LISTO), label: 'Listo' },
      { value: String(Estado.RETIRADO), label: 'Retirado' },
      { value: String(Estado.CANCELADO), label: 'Cancelado' },
    ]);
  });

  it('acepta la lista de libros como respaldo', () => {
    const opciones = pasarEstadoDesplegable(undefined, estadosParaDesplegable);

    expect(opciones).toHaveLength(estadosParaDesplegable.length);
    expect(opciones[0]).toEqual({ value: String(Estado.PENDIENTE), label: 'Pendiente' });
  });

  it('prioriza la lista de pedidos cuando vienen las dos', () => {
    const opciones = pasarEstadoDesplegable(estadosPedidoParaDesplegable, estadosParaDesplegable);

    expect(opciones).toHaveLength(estadosPedidoParaDesplegable.length);
  });

  it('devuelve una lista vacia sin ninguna de las dos', () => {
    expect(pasarEstadoDesplegable()).toEqual([]);
  });
});

describe('estadosPedidoParaDesplegable', () => {
  it('solo ofrece los estados que el operador puede elegir a mano', () => {
    expect(estadosPedidoParaDesplegable.map(e => e.clave)).toEqual([
      Estado.PENDIENTE,
      Estado.LISTO,
      Estado.RETIRADO,
      Estado.CANCELADO,
    ]);
  });
});
