import { describe, it, expect } from 'vitest';
import { solicitudAdapter, solicitudAdapterArray, peticionAdapter, peticionAdapterArray } from './solicitud.adapter';
import { SolicitudAdapterProp, PeticionAdapterProp } from '../../modelo/Entidades/solicitud/solicitud.interface';

describe('solicitud.adapter', () => {
  it('mapea una solicitud completa', () => {
    const back: SolicitudAdapterProp = {
      id: 's1',
      idLibroCompleto: 'lc1',
      nombreLibro: 'Libro X',
      fechaCreacion: '2026-01-01',
      fechaResolucion: null,
      idUsuario: 'u1',
      nombreUsuario: 'Juan',
      estado: 1,
      idEmpresa: 'e1',
      peticiones: [
        { id: 'p1', campo: 'nombre', valorAnterior: 'Viejo', valorNuevo: 'Nuevo', observaciones: null, estado: 1 },
      ],
    };

    const result = solicitudAdapter(back);
    expect(result).toBeDefined();
    expect(result!.id).toBe('s1');
    expect(result!.nombreLibro).toBe('Libro X');
    expect(result!.estado).toBe(1);
    expect(result!.peticiones).toHaveLength(1);
    expect(result!.peticiones[0].campo).toBe('nombre');
  });

  it('devuelve undefined si no hay solicitud', () => {
    expect(solicitudAdapter(undefined)).toBeUndefined();
  });

  it('mapea array de solicitudes', () => {
    const backs: SolicitudAdapterProp[] = [
      { id: 's1', idLibroCompleto: 'lc1', nombreLibro: 'L1', fechaCreacion: '2026-01-01', fechaResolucion: null, idUsuario: 'u1', nombreUsuario: 'U1', estado: 1, idEmpresa: 'e1', peticiones: [] },
      { id: 's2', idLibroCompleto: 'lc2', nombreLibro: 'L2', fechaCreacion: '2026-01-02', fechaResolucion: null, idUsuario: 'u2', nombreUsuario: 'U2', estado: 2, idEmpresa: 'e1', peticiones: [] },
    ];
    const result = solicitudAdapterArray(backs);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('s1');
    expect(result[1].estado).toBe(2);
  });

  it('peticionAdapter mapea peticion', () => {
    const p: PeticionAdapterProp = { id: 'p1', campo: 'nivel', valorAnterior: '1', valorNuevo: '2', observaciones: 'obs', estado: 1 };
    const result = peticionAdapter(p);
    expect(result).toBeDefined();
    expect(result!.campo).toBe('nivel');
    expect(result!.observaciones).toBe('obs');
  });

  it('peticionAdapterArray maneja undefined', () => {
    expect(peticionAdapterArray(undefined)).toEqual([]);
  });

  it('solicitudAdapterArray maneja undefined', () => {
    expect(solicitudAdapterArray(undefined)).toEqual([]);
  });
});