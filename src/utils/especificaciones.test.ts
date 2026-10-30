import { describe, it, expect } from 'vitest';
import {
  especificacionEnumXString,
  espDefaultInicial,
  normalizarEspecificaciones,
  normalizarEspecificacionesFiltro,
  sonEspecificacionesIguales,
  transformarEspecificacinParticularATexto,
  transformarEspecificaciones,
  transformarEspecificacinesATexto,
} from './especificaciones';
import { Especificaciones } from '../modelo/Entidades/especificacion/especificacion.enum';
import { especificacionInicial } from '../modelo/Entidades/especificacion/especificacion.interface';
import { LibroProp, libroInicial } from '../modelo/Entidades/libro/libro.interface';

const libro = (adhesivos?: number): LibroProp => ({ ...libroInicial, adhesivos });

describe('transformarEspecificaciones', () => {
  it('dice si la especificacion esta en la lista', () => {
    expect(transformarEspecificaciones([Especificaciones.COLOR], Especificaciones.COLOR)).toBe(
      true
    );
    expect(transformarEspecificaciones([Especificaciones.COLOR], Especificaciones.ANILLADO)).toBe(
      false
    );
  });

  it('devuelve false cuando falta la lista o la especificacion', () => {
    expect(transformarEspecificaciones(undefined, Especificaciones.COLOR)).toBe(false);
    expect(transformarEspecificaciones([], Especificaciones.COLOR)).toBe(false);
    expect(
      transformarEspecificaciones(
        [Especificaciones.COLOR],
        undefined as unknown as Especificaciones
      )
    ).toBe(false);
  });
});

describe('transformarEspecificacinesATexto', () => {
  it('devuelve string vacio sin especificaciones', () => {
    expect(transformarEspecificacinesATexto(undefined, libro())).toBe('');
    expect(transformarEspecificacinesATexto([], libro())).toBe('');
  });

  it('traduce las especificaciones simples', () => {
    expect(
      transformarEspecificacinesATexto(
        [
          Especificaciones.ABROCHADO,
          Especificaciones.ANILLADO,
          Especificaciones.COLOR,
          Especificaciones.BLANCO_Y_NEGRO,
          Especificaciones.DOBLE_FAZ,
          Especificaciones.SIMPLE_FAZ,
          Especificaciones.SELECCION,
          Especificaciones.SUELTO,
        ],
        libro()
      )
    ).toBe(
      'abrochado, anillado, en color, en blanco y negro, doble faz, simple faz, parte seleccionada, suelto'
    );
  });

  it('cuenta los adhesivos del libro', () => {
    expect(transformarEspecificacinesATexto([Especificaciones.ADHESIVO], libro(4))).toBe(
      'con 4 adhesivo blanco brilloso'
    );
  });

  it('no dice nada de adhesivos si el libro no tiene', () => {
    expect(transformarEspecificacinesATexto([Especificaciones.ADHESIVO], libro(0))).toBe('');
  });

  it('distingue el trokelado del adhesivo comun', () => {
    expect(transformarEspecificacinesATexto([Especificaciones.TROKELADO], libro(2))).toBe(
      'con 2 adhesivo blanco brilloso trokelado'
    );
  });
});

describe('especificacionEnumXString', () => {
  it.each([
    [Especificaciones.ABROCHADO, 'abrochado'],
    [Especificaciones.ADHESIVO, 'adhesivo'],
    [Especificaciones.ANILLADO, 'anillado'],
    [Especificaciones.COLOR, 'color'],
    [Especificaciones.BLANCO_Y_NEGRO, 'blanco y negro'],
    [Especificaciones.DOBLE_FAZ, 'doble faz'],
    [Especificaciones.SIMPLE_FAZ, 'simple faz'],
    [Especificaciones.SELECCION, 'selección'],
    [Especificaciones.SUELTO, 'suelto'],
    [Especificaciones.TROKELADO, 'adhesivo trokelado'],
  ])('traduce %s', (esp, texto) => {
    expect(especificacionEnumXString(esp)).toBe(texto);
  });

  it('avisa cuando el valor no es una especificacion conocida', () => {
    expect(especificacionEnumXString('otra' as Especificaciones)).toBe('No esta');
  });
});

describe('transformarEspecificacinParticularATexto', () => {
  it('traduce el nombre de la especificacion', () => {
    expect(
      transformarEspecificacinParticularATexto({
        ...especificacionInicial,
        nombre: Especificaciones.COLOR,
      })
    ).toBe('color');
  });
});

describe('normalizarEspecificaciones (formulario)', () => {
  it('completa los grupos obligatorios cuando no hay nada elegido', () => {
    // Sin seleccion el formulario no puede guardar: se ponen los defectos.
    expect(normalizarEspecificaciones([])).toEqual([
      Especificaciones.DOBLE_FAZ,
      Especificaciones.ABROCHADO,
      Especificaciones.BLANCO_Y_NEGRO,
    ]);
  });

  it('saca repetidas', () => {
    const resultado = normalizarEspecificaciones([Especificaciones.COLOR, Especificaciones.COLOR]);

    expect(resultado).toEqual([
      Especificaciones.COLOR,
      Especificaciones.DOBLE_FAZ,
      Especificaciones.ABROCHADO,
    ]);
  });

  it('dentro de un grupo exclusivo se queda con la ultima', () => {
    expect(
      normalizarEspecificaciones([Especificaciones.COLOR, Especificaciones.BLANCO_Y_NEGRO])
    ).toEqual([
      Especificaciones.DOBLE_FAZ,
      Especificaciones.ABROCHADO,
      Especificaciones.BLANCO_Y_NEGRO,
    ]);
  });

  it('resuelve el conflicto de faz con la ultima marcada', () => {
    const resultado = normalizarEspecificaciones([
      Especificaciones.SIMPLE_FAZ,
      Especificaciones.DOBLE_FAZ,
    ]);

    expect(resultado).toContain(Especificaciones.DOBLE_FAZ);
    expect(resultado).not.toContain(Especificaciones.SIMPLE_FAZ);
  });

  it('conserva el grupo opcional de adhesivos', () => {
    expect(normalizarEspecificaciones([Especificaciones.ADHESIVO])).toEqual([
      Especificaciones.ADHESIVO,
      Especificaciones.DOBLE_FAZ,
      Especificaciones.ABROCHADO,
      Especificaciones.BLANCO_Y_NEGRO,
    ]);
  });

  it('tambien resuelve el conflicto adhesivo/trokelado', () => {
    const resultado = normalizarEspecificaciones([
      Especificaciones.ADHESIVO,
      Especificaciones.TROKELADO,
    ]);

    expect(resultado).toContain(Especificaciones.TROKELADO);
    expect(resultado).not.toContain(Especificaciones.ADHESIVO);
  });
});

describe('normalizarEspecificacionesFiltro (busqueda)', () => {
  it('devuelve una lista vacia cuando no hay filtros', () => {
    expect(normalizarEspecificacionesFiltro([])).toEqual([]);
  });

  it('no inyecta los valores por defecto: un filtro vacio no restringe', () => {
    // Si inyectara "doble faz" y "abrochado", filtrar por color devolveria
    // menos pedidos de los que corresponden.
    expect(normalizarEspecificacionesFiltro([Especificaciones.COLOR])).toEqual([
      Especificaciones.COLOR,
    ]);
  });

  it('deja convivir filtros de grupos distintos', () => {
    expect(
      normalizarEspecificacionesFiltro([Especificaciones.COLOR, Especificaciones.DOBLE_FAZ])
    ).toEqual([Especificaciones.COLOR, Especificaciones.DOBLE_FAZ]);
  });

  it('dentro de un grupo exclusivo gana el ultimo, como un radio', () => {
    expect(
      normalizarEspecificacionesFiltro([Especificaciones.COLOR, Especificaciones.BLANCO_Y_NEGRO])
    ).toEqual([Especificaciones.BLANCO_Y_NEGRO]);
  });

  it('saca del medio el valor del mismo grupo que ya estaba', () => {
    expect(
      normalizarEspecificacionesFiltro([
        Especificaciones.ANILLADO,
        Especificaciones.COLOR,
        Especificaciones.SUELTO,
      ])
    ).toEqual([Especificaciones.COLOR, Especificaciones.SUELTO]);
  });

  it('no repite un valor que ya estaba', () => {
    expect(
      normalizarEspecificacionesFiltro([Especificaciones.COLOR, Especificaciones.COLOR])
    ).toEqual([Especificaciones.COLOR]);
  });

  it('el grupo opcional tambien funciona como radio', () => {
    expect(
      normalizarEspecificacionesFiltro([Especificaciones.ADHESIVO, Especificaciones.TROKELADO])
    ).toEqual([Especificaciones.TROKELADO]);
  });
});

describe('sonEspecificacionesIguales', () => {
  it('ignora el orden', () => {
    expect(sonEspecificacionesIguales(['a', 'b'], ['b', 'a'])).toBe(true);
  });

  it('detecta listas distintas', () => {
    expect(sonEspecificacionesIguales(['a'], ['a', 'b'])).toBe(false);
    expect(sonEspecificacionesIguales(['a'], ['b'])).toBe(false);
  });

  it('dos listas vacias son iguales', () => {
    expect(sonEspecificacionesIguales([], [])).toBe(true);
  });
});

describe('espDefaultInicial', () => {
  it('es la seleccion de una copia nueva', () => {
    expect(espDefaultInicial).toEqual([
      Especificaciones.COLOR,
      Especificaciones.ANILLADO,
      Especificaciones.DOBLE_FAZ,
    ]);
  });
});
