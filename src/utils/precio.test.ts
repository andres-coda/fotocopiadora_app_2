import { describe, it, expect } from 'vitest';
import { calcularPrecio, calcularPresupuesto, presupuestoFallido } from './precio';
import { Especificaciones } from '../modelo/Entidades/especificacion/especificacion.enum';
import { libroInicial, LibroProp } from '../modelo/Entidades/libro/libro.interface';
import { PrecioAbareviatura } from '../modelo/Entidades/precio/precio.enum';
import { precioInicial, PrecioProp } from '../modelo/Entidades/precio/precio.interface';
import { ComponenteProp } from '../modelo/Entidades/libro/componente.interface';

const precio = (abreviatura: PrecioAbareviatura, importe: number): PrecioProp => ({
  ...precioInicial,
  id: abreviatura,
  nombre: abreviatura,
  abreviatura,
  importe,
});

// Importes redondos a proposito: si el test falla, es por la cuenta del modulo
// y no por un numero raro de la lista de precios.
const precios: PrecioProp[] = [
  precio(PrecioAbareviatura.BLANCO_Y_NEGRO_S_F, 10),
  precio(PrecioAbareviatura.COLOR_S_F, 20),
  precio(PrecioAbareviatura.BLANCO_Y_NEGRO_D_F, 15),
  precio(PrecioAbareviatura.COLOR_D_F, 30),
  precio(PrecioAbareviatura.ADHESIVO, 50),
  precio(PrecioAbareviatura.TROKELADO, 60),
  precio(PrecioAbareviatura.ANILLADO_1, 1000),
  precio(PrecioAbareviatura.ANILLADO_2, 2000),
  precio(PrecioAbareviatura.ANILLADO_3, 3000),
  precio(PrecioAbareviatura.ANILLADO_4, 4000),
];

const libro = (over: Partial<LibroProp> = {}): LibroProp => ({
  ...libroInicial,
  nombre: 'Learn',
  cantidadPg: 64,
  especificacionesDefecto: [],
  adhesivos: 0,
  ...over,
});

const componente = (nombre: string): ComponenteProp => ({ nombre }) as ComponenteProp;

describe('calcularPrecio: especificaciones', () => {
  it('sin especificaciones usa color, doble faz y anillado', () => {
    // 64 paginas a doble faz son 32 hojas: 32 x $30 + $1000 de anillado = $1960,
    // que se redondea hacia arriba a la centena.
    expect(calcularPrecio({ libro: libro(), precios })).toBe(2000);
  });

  it('usa las especificaciones por defecto del libro', () => {
    const conDefecto = libro({
      especificacionesDefecto: [
        Especificaciones.BLANCO_Y_NEGRO,
        Especificaciones.SIMPLE_FAZ,
        Especificaciones.SUELTO,
      ],
    });

    // 64 hojas x $10, sin anillado = $640.
    expect(calcularPrecio({ libro: conDefecto, precios })).toBe(700);
  });

  it('las especificaciones que se pasan pisan a las del libro', () => {
    const conDefecto = libro({
      especificacionesDefecto: [
        Especificaciones.BLANCO_Y_NEGRO,
        Especificaciones.SIMPLE_FAZ,
        Especificaciones.SUELTO,
      ],
    });

    expect(
      calcularPrecio({
        libro: conDefecto,
        precios,
        especificaciones: [
          Especificaciones.COLOR,
          Especificaciones.DOBLE_FAZ,
          Especificaciones.ANILLADO,
        ],
      })
    ).toBe(2000);
  });

  it('color simple faz suelto cobra todas las hojas y nada de anillado', () => {
    expect(
      calcularPrecio({
        libro: libro(),
        precios,
        especificaciones: [
          Especificaciones.COLOR,
          Especificaciones.SIMPLE_FAZ,
          Especificaciones.SUELTO,
        ],
      })
    ).toBe(1300);
  });

  it('blanco y negro simple faz usa su propia tarifa', () => {
    expect(
      calcularPrecio({
        libro: libro(),
        precios,
        especificaciones: [
          Especificaciones.BLANCO_Y_NEGRO,
          Especificaciones.SIMPLE_FAZ,
          Especificaciones.ABROCHADO,
        ],
      })
    ).toBe(700);
  });

  it('blanco y negro doble faz usa la tarifa de doble faz', () => {
    expect(
      calcularPrecio({
        libro: libro(),
        precios,
        especificaciones: [
          Especificaciones.BLANCO_Y_NEGRO,
          Especificaciones.DOBLE_FAZ,
          Especificaciones.SUELTO,
        ],
      })
    ).toBe(500);
  });
});

describe('calcularPrecio: anillado por rango de hojas', () => {
  const anilladoColor = [
    Especificaciones.COLOR,
    Especificaciones.SIMPLE_FAZ,
    Especificaciones.ANILLADO,
  ];

  it.each([
    ['hasta 100 hojas', 100, 3000],
    ['hasta 200 y pico', 150, 5000],
    ['hasta 350', 300, 9000],
    ['hasta 500', 400, 12000],
    ['mas de 500 no tiene tarifa', 600, 12000],
  ])('%s', (_caso, cantidadPg, esperado) => {
    expect(
      calcularPrecio({ libro: libro({ cantidadPg }), precios, especificaciones: anilladoColor })
    ).toBe(esperado);
  });
});

describe('calcularPrecio: adhesivos', () => {
  it('cobra los adhesivos y los suma al anillado', () => {
    expect(
      calcularPrecio({
        libro: libro({ adhesivos: 4 }),
        precios,
        especificaciones: [
          Especificaciones.COLOR,
          Especificaciones.DOBLE_FAZ,
          Especificaciones.ANILLADO,
          Especificaciones.ADHESIVO,
        ],
      })
    ).toBe(2200);
  });

  it('suma las hojas de adhesivo cuando el libro no va a adhesivo', () => {
    // Un libro con adhesivos sueltos imprime esas hojas aparte: 64 + 4.
    expect(
      calcularPrecio({
        libro: libro({ adhesivos: 4 }),
        precios,
        especificaciones: [
          Especificaciones.COLOR,
          Especificaciones.SIMPLE_FAZ,
          Especificaciones.SUELTO,
        ],
      })
    ).toBe(1400);
  });

  it('trokelado usa la tarifa de trokelado, no la de adhesivo', () => {
    expect(
      calcularPrecio({
        libro: libro({ adhesivos: 2 }),
        precios,
        especificaciones: [
          Especificaciones.COLOR,
          Especificaciones.SIMPLE_FAZ,
          Especificaciones.SUELTO,
          Especificaciones.TROKELADO,
        ],
      })
    ).toBe(1400);
  });

  it('no cobra adhesivos si el libro no tiene', () => {
    expect(
      calcularPrecio({
        libro: libro({ adhesivos: 0 }),
        precios,
        especificaciones: [
          Especificaciones.COLOR,
          Especificaciones.SIMPLE_FAZ,
          Especificaciones.SUELTO,
          Especificaciones.ADHESIVO,
        ],
      })
    ).toBe(1300);
  });
});

describe('calcularPrecio: cantidad y redondeo', () => {
  const simpleFazBn = [
    Especificaciones.BLANCO_Y_NEGRO,
    Especificaciones.SIMPLE_FAZ,
    Especificaciones.ABROCHADO,
  ];

  it('multiplica por la cantidad de ejemplares', () => {
    expect(
      calcularPrecio({ libro: libro(), precios, especificaciones: simpleFazBn, cantidad: 3 })
    ).toBe(2000);
  });

  it('redondea siempre hacia arriba a la centena', () => {
    // 640 no es multiplo de 100 y no se puede cobrar de menos.
    expect(calcularPrecio({ libro: libro(), precios, especificaciones: simpleFazBn })).toBe(700);
  });

  it('devuelve cero cuando no hay lista de precios', () => {
    expect(calcularPrecio({ libro: libro(), precios: [], especificaciones: simpleFazBn })).toBe(0);
  });
});

describe('calcularPresupuesto', () => {
  it('arma el texto con el libro, las especificaciones y el precio', () => {
    const resultado = calcularPresupuesto({
      libro: libro({
        nombre: 'Learn whit us NOW',
        nivel: '1',
        componentes: [componente('Activity Book')],
      }),
      nuevasEsp: [Especificaciones.COLOR, Especificaciones.DOBLE_FAZ, Especificaciones.SUELTO],
      precios,
    });

    expect(resultado.valor).toBe(1000);
    expect(resultado.texto).toContain('El libro Learn whit us NOW 1 Activity Book');
    expect(resultado.texto).toContain('en color, doble faz, suelto');
    expect(resultado.texto).toContain('*$1000*');
  });

  it('usa las especificaciones por defecto del libro', () => {
    const resultado = calcularPresupuesto({
      libro: libro({
        nombre: 'Learn',
        especificacionesDefecto: [
          Especificaciones.BLANCO_Y_NEGRO,
          Especificaciones.SIMPLE_FAZ,
          Especificaciones.SUELTO,
        ],
      }),
      precios,
    });

    expect(resultado.valor).toBe(700);
    expect(resultado.texto).toContain('en blanco y negro, simple faz, suelto');
  });

  it('devuelve el presupuesto fallido cuando no hay libro', () => {
    expect(calcularPresupuesto({ precios })).toBe(presupuestoFallido);
    expect(presupuestoFallido.valor).toBe(0);
  });
});
