import { describe, it, expect } from 'vitest';
import {
  libroDtoAdapter,
  libroEmpresaEditarDtoAdapter,
  libroExtraDtoAdapter,
  libroPrincipalDtoAdapter,
} from './libroDto.adapter';
import { Especificaciones } from '../../modelo/Entidades/especificacion/especificacion.enum';
import { formValuesLibro } from '../../modelo/Entidades/libro/esqLibro.esquema';

const especificaciones = [Especificaciones.ANILLADO, Especificaciones.COLOR];

const data: formValuesLibro = {
  nombre: 'Matemática 3',
  materia: 'Matemática',
  editorial: 'Santillana',
  nivel: '3',
  componentes: 'Libro, Cuadernillo,, Anexo',
  cantidadPg: '64',
  adhesivos: '4',
  detalles_impresion: 'Anillado',
  descripcion: 'Tapa blanda',
  edicion: '2',
  anio: '2024',
  autor: 'Pérez',
  img: 'portada.png',
};

describe('libroDto.adapter', () => {
  describe('libroExtraDtoAdapter', () => {
    it('mapea los datos extras y convierte la edicion a numero', () => {
      const dto = libroExtraDtoAdapter(data);

      expect(dto).toEqual({
        descripcion: 'Tapa blanda',
        autor: 'Pérez',
        edicion: 2,
        anio: '2024',
        img: 'portada.png',
      });
    });

    it('solo manda los cinco campos del grupo extra', () => {
      const dto = libroExtraDtoAdapter(data);

      expect(Object.keys(dto).sort()).toEqual(['anio', 'autor', 'descripcion', 'edicion', 'img']);
    });

    it('no deberia mandar edicion como null cuando el formulario no la trae', () => {
      const dto = libroExtraDtoAdapter({ ...data, edicion: undefined });

      expect(JSON.stringify(dto)).not.toContain('"edicion":null');
    });
  });

  describe('libroEmpresaEditarDtoAdapter', () => {
    it('mapea cantidad de paginas, adhesivos y detalle de impresion', () => {
      const dto = libroEmpresaEditarDtoAdapter({ data, especificaciones });

      expect(dto).toEqual({
        cantidadPg: 64,
        adhesivos: 4,
        especificacionesDefecto: especificaciones,
        detalle_impresion: 'Anillado',
      });
    });

    it('renombra detalles_impresion a detalle_impresion y no manda el nombre viejo', () => {
      const dto = libroEmpresaEditarDtoAdapter({ data, especificaciones });

      expect(dto).not.toHaveProperty('detalles_impresion');
      expect(Object.keys(dto).sort()).toEqual([
        'adhesivos',
        'cantidadPg',
        'detalle_impresion',
        'especificacionesDefecto',
      ]);
    });

    it('no deberia mandar adhesivos como null cuando el formulario no los trae', () => {
      const dto = libroEmpresaEditarDtoAdapter({
        data: { ...data, adhesivos: undefined },
        especificaciones,
      });

      expect(JSON.stringify(dto)).not.toContain('"adhesivos":null');
    });
  });

  describe('libroPrincipalDtoAdapter', () => {
    it('mapea nombre, nivel, editorial y materia', () => {
      const dto = libroPrincipalDtoAdapter(data, data);

      expect(dto).toMatchObject({
        nombre: 'Matemática 3',
        nivel: '3',
        editorial: 'Santillana',
        materia: 'Matemática',
      });
    });

    it('parte los componentes por coma, limpia espacios y descarta los vacios', () => {
      const dto = libroPrincipalDtoAdapter(data, data);

      expect(dto.componentes).toEqual(['Libro', 'Cuadernillo', 'Anexo']);
    });

    it('devuelve componentes vacio cuando el campo no viene o esta vacio', () => {
      // El campo es libre: sin componentes el libro se manda sin ellos en vez
      // de con un string vacio que el back no sabe interpretar.
      expect(libroPrincipalDtoAdapter(data, { componentes: undefined }).componentes).toEqual([]);
      expect(libroPrincipalDtoAdapter(data, { componentes: '' }).componentes).toEqual([]);
      expect(libroPrincipalDtoAdapter(data, { componentes: ' , , ' }).componentes).toEqual([]);
    });
  });

  describe('libroDtoAdapter', () => {
    it('combina los tres grupos en un unico body', () => {
      const dto = libroDtoAdapter({ data, especificaciones });

      expect(dto).toEqual({
        descripcion: 'Tapa blanda',
        autor: 'Pérez',
        edicion: 2,
        anio: '2024',
        img: 'portada.png',
        cantidadPg: 64,
        adhesivos: 4,
        especificacionesDefecto: especificaciones,
        detalle_impresion: 'Anillado',
        nombre: 'Matemática 3',
        nivel: '3',
        editorial: 'Santillana',
        materia: 'Matemática',
        componentes: ['Libro', 'Cuadernillo', 'Anexo'],
      });
    });

    it('no filtra claves del formulario que el DTO no debe mandar', () => {
      const dto = libroDtoAdapter({ data, especificaciones });

      expect(Object.keys(dto).sort()).toEqual([
        'adhesivos',
        'anio',
        'autor',
        'cantidadPg',
        'componentes',
        'descripcion',
        'detalle_impresion',
        'edicion',
        'editorial',
        'especificacionesDefecto',
        'img',
        'materia',
        'nivel',
        'nombre',
      ]);
    });
  });
});
