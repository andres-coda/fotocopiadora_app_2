import { describe, expect, it } from 'vitest';
import { libroFormDefault, libroFormEdit } from './esqLibro.esquema';
import { libroPrueba } from './libro.interface';

// El formulario de edicion depende de que `libroFormEdit` reciba el objeto
// `{ libro }` y no el libro suelto. Llamada como `libroFormEdit(libro)`,
// `libro` queda undefined y devuelve los valores por defecto sin fallar: el
// formulario abre vacio y los botones que resetean con `libroFormEdit()`
// revientan al desestructurar undefined.
describe('libroFormEdit', () => {
  it('con un libro devuelve los datos del libro', () => {
    const valores = libroFormEdit({ libro: libroPrueba });

    expect(valores.nombre).toBe(libroPrueba.nombre);
    expect(valores.editorial).toBe(libroPrueba.editorial);
    expect(valores.nivel).toBe(libroPrueba.nivel);
    expect(valores.materia).toBe(libroPrueba.materia.nombre);
    expect(valores.anio).toBe(libroPrueba.anio);
    expect(valores.cantidadPg).toBe(`${libroPrueba.cantidadPg}`);
    expect(valores.componentes).toBe('Activity Book');
  });

  it('sin nada devuelve los valores por defecto', () => {
    expect(libroFormEdit({})).toEqual(libroFormDefault);
  });

  // Un campo vacio tiene que llegar como vacio, nunca como el texto
  // "undefined": ese texto es truthy y pasa el min(1) de Zod.
  it('no escribe el texto undefined en los campos vacios', () => {
    const valores = libroFormEdit({
      libro: { ...libroPrueba, edicion: undefined, adhesivos: undefined },
    });

    expect(valores.edicion).not.toBe('undefined');
    expect(valores.adhesivos).not.toBe('undefined');
  });
});
