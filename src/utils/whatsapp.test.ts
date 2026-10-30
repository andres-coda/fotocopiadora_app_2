import { describe, it, expect } from 'vitest';
import {
  armarMensajeRetiro,
  armarMensajeTomado,
  BASE_WHATSAPP_APP,
  BASE_WHATSAPP_WEB,
  soloDigitos,
  telefonoParaWhatsapp,
  urlWhatsapp,
} from './whatsapp';
import { Especificaciones } from '../modelo/Entidades/especificacion/especificacion.enum';
import { pedidoInicial, PedidoProp } from '../modelo/Entidades/pedido/pedido.interface';
import { PedidoLibroProp } from '../modelo/Entidades/pedido_libro/pedidoLibro.interface';
import { libroInicial } from '../modelo/Entidades/libro/libro.interface';

const libro = {
  ...libroInicial,
  nombre: 'Learn whit us NOW',
  nivel: '1',
  componentes_texto: 'Activity Book',
};

const lineaPedido = (over: Partial<PedidoLibroProp> = {}): PedidoLibroProp =>
  ({ id: 'lp', cantidad: 2, libro, especificaciones: [], ...over }) as PedidoLibroProp;

const pedido = (over: Partial<PedidoProp> = {}): PedidoProp =>
  ({ ...pedidoInicial, libroPedidos: [], ...over }) as PedidoProp;

describe('soloDigitos', () => {
  it('deja solo los digitos', () => {
    expect(soloDigitos('+54 9 11 2244-4872')).toBe('5491122444872');
  });

  it('devuelve string vacio sin telefono', () => {
    expect(soloDigitos(undefined)).toBe('');
    expect(soloDigitos('')).toBe('');
  });
});

describe('telefonoParaWhatsapp', () => {
  it('normaliza y saca el + que WhatsApp no acepta', () => {
    expect(telefonoParaWhatsapp('11 2244-4872')).toBe('5491122444872');
  });

  it('acepta un numero ya normalizado', () => {
    expect(telefonoParaWhatsapp('+54 9 11 2244-4872')).toBe('5491122444872');
  });

  it('devuelve undefined cuando el telefono no se puede normalizar', () => {
    // Un numero basura abriria un chat vacio o, peor, el de otra persona.
    expect(telefonoParaWhatsapp('11224448728')).toBeUndefined();
    expect(telefonoParaWhatsapp(undefined)).toBeUndefined();
  });
});

describe('urlWhatsapp', () => {
  it('usa la app de escritorio por defecto', () => {
    expect(urlWhatsapp({ telefono: '11 2244-4872', mensaje: 'Hola' })).toBe(
      `${BASE_WHATSAPP_APP}?phone=5491122444872&text=Hola`
    );
  });

  it('omite el text cuando no hay mensaje', () => {
    expect(urlWhatsapp({ telefono: '11 2244-4872' })).toBe(
      `${BASE_WHATSAPP_APP}?phone=5491122444872`
    );
  });

  it('omite el text cuando el mensaje es solo espacios', () => {
    expect(urlWhatsapp({ telefono: '11 2244-4872', mensaje: '   ' })).toBe(
      `${BASE_WHATSAPP_APP}?phone=5491122444872`
    );
  });

  it('codifica el mensaje para que los saltos de linea y los & no rompan la url', () => {
    const url = urlWhatsapp({ telefono: '11 2244-4872', mensaje: 'Hola!\nTotal: $18.500 & seña' });

    expect(url).toBe(
      `${BASE_WHATSAPP_APP}?phone=5491122444872&text=${encodeURIComponent('Hola!\nTotal: $18.500 & seña')}`
    );
    expect(url).not.toContain('\n');
  });

  it('acepta la base de WhatsApp Web como respaldo', () => {
    expect(urlWhatsapp({ telefono: '11 2244-4872', base: BASE_WHATSAPP_WEB })).toBe(
      `${BASE_WHATSAPP_WEB}?phone=5491122444872`
    );
  });

  it('devuelve undefined si el telefono no es valido', () => {
    expect(urlWhatsapp({ telefono: '11224448728', mensaje: 'Hola' })).toBeUndefined();
  });
});

describe('armarMensajeTomado', () => {
  it('arma encabezado, libros, importes y entrega en ese orden', () => {
    const mensaje = armarMensajeTomado({
      pedido: pedido({
        importeTotal: 18500,
        sena: 5000,
        libroPedidos: [
          lineaPedido({
            especificaciones: [Especificaciones.COLOR, Especificaciones.DOBLE_FAZ],
          }),
        ],
      }),
      encabezado: 'Pedido tomado!',
      fechaEntrega: '2026-11-02',
      horaEntrega: 18,
    });

    expect(mensaje).toBe(
      [
        'Pedido tomado!',
        'Pedido:\n- 2x Learn whit us NOW - 1 - Activity Book (Color, Doble faz)',
        'Total: $18.500\nSeña: $5.000\nSaldo: $13.500',
        'Entrega: 02/11/2026 - 18 hs',
      ].join('\n\n')
    );
  });

  it('no informa la sena cuando es cero', () => {
    // Un "Seña: $0" en el mensaje confunde al cliente.
    const mensaje = armarMensajeTomado({
      pedido: pedido({ importeTotal: 1000, sena: 0, libroPedidos: [lineaPedido()] }),
    });

    expect(mensaje).toContain('Total: $1.000\nSaldo: $1.000');
    expect(mensaje).not.toContain('Seña');
  });

  it('acepta la fecha ya convertida DD-MM-YYYY', () => {
    const mensaje = armarMensajeTomado({
      pedido: pedido({ libroPedidos: [lineaPedido()] }),
      fechaEntrega: '02-11-2026',
      horaEntrega: 9,
    });

    expect(mensaje).toContain('Entrega: 02/11/2026 - 9 hs');
  });

  it('omite el pie de entrega cuando no hay fecha ni hora', () => {
    const mensaje = armarMensajeTomado({ pedido: pedido({ libroPedidos: [lineaPedido()] }) });

    expect(mensaje).not.toContain('Entrega:');
  });

  it('omite el encabezado cuando viene vacio', () => {
    const mensaje = armarMensajeTomado({
      pedido: pedido({ libroPedidos: [lineaPedido()] }),
      encabezado: '   ',
    });

    expect(mensaje.startsWith('Pedido:')).toBe(true);
  });

  it('omite el bloque de libros cuando el pedido no tiene ninguno', () => {
    const mensaje = armarMensajeTomado({ pedido: pedido({ importeTotal: 0 }) });

    expect(mensaje).not.toContain('Pedido:');
    expect(mensaje).toContain('Total: $0');
  });

  it('traduce cada especificacion y las une con coma', () => {
    const mensaje = armarMensajeTomado({
      pedido: pedido({
        libroPedidos: [
          lineaPedido({
            especificaciones: [
              Especificaciones.BLANCO_Y_NEGRO,
              Especificaciones.SIMPLE_FAZ,
              Especificaciones.ABROCHADO,
            ],
          }),
        ],
      }),
    });

    expect(mensaje).toContain('(Blanco y negro, Simple faz, Abrochado)');
  });

  it('no deja parentesis vacios cuando el libro no tiene especificaciones', () => {
    const mensaje = armarMensajeTomado({
      pedido: pedido({ libroPedidos: [lineaPedido({ especificaciones: [] })] }),
    });

    expect(mensaje).toContain('- 2x Learn whit us NOW - 1 - Activity Book\n');
    expect(mensaje).not.toContain('()');
  });

  it('usa el importe cero cuando el pedido no lo trae', () => {
    const mensaje = armarMensajeTomado({
      pedido: pedido({ libroPedidos: [lineaPedido()] }),
    });

    expect(mensaje).toContain('Total: $0\nSaldo: $0');
  });
});

describe('armarMensajeRetiro', () => {
  it('arma encabezado y libros sin importes', () => {
    const mensaje = armarMensajeRetiro({
      pedido: pedido({
        importeTotal: 18500,
        libroPedidos: [lineaPedido({ especificaciones: [Especificaciones.ANILLADO] })],
      }),
      encabezado: 'Retirado!',
    });

    expect(mensaje).toBe(
      ['Retirado!', 'Pedido:\n- 2x Learn whit us NOW - 1 - Activity Book (Anillado)'].join('\n\n')
    );
    expect(mensaje).not.toContain('Total:');
  });

  it('devuelve string vacio si no hay encabezado ni libros', () => {
    expect(armarMensajeRetiro({ pedido: pedido() })).toBe('');
  });
});
