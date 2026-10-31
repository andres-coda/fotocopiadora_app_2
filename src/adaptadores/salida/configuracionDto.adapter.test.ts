import { describe, it, expect } from 'vitest';
import { configEntregaDtoAdapter, configuracionDtoAdapter } from './configuracionDto.adapter';
import {
  configuracionFormDefault,
  formValuesConfigEntrega,
  formValuesConfiguracion,
} from '../../modelo/Entidades/configuracion/esqConfiguracion.esquema';

const formCompleto: formValuesConfiguracion = {
  fechaEntrega: '2026-11-05',
  horaEntrega: 14,
  idSede: '6f0f0d1e-8b52-4c6f-9f0e-2b6f0e2f8a11',
  idDatoCobro: 'c1a1b2c3-d4e5-4f60-8a7b-9c0d1e2f3a4b',
  idMsjPedidoTomado: 'a8f0f9f6-1f0a-4b5c-8f1c-0d5f4b3e2c10',
  idMsjPedidoRetirado: 'b7e0e8a5-0e9b-4a4d-9e0f-1c4e3b2a1f00',
  msjRetiro: true,
  msjEnvio: false,
};

describe('configuracionDto.adapter', () => {
  describe('configuracionDtoAdapter', () => {
    it('mapea los ocho campos cuando el formulario viene completo', () => {
      const dto = configuracionDtoAdapter(formCompleto);

      expect(dto).toEqual({
        fechaEntrega: '2026-11-05',
        horaEntrega: 14,
        idSede: '6f0f0d1e-8b52-4c6f-9f0e-2b6f0e2f8a11',
        idDatoCobro: 'c1a1b2c3-d4e5-4f60-8a7b-9c0d1e2f3a4b',
        idMsjPedidoTomado: 'a8f0f9f6-1f0a-4b5c-8f1c-0d5f4b3e2c10',
        idMsjPedidoRetirado: 'b7e0e8a5-0e9b-4a4d-9e0f-1c4e3b2a1f00',
        msjRetiro: true,
        msjEnvio: false,
      });
    });

    it('omite los strings vacios del formulario por defecto', () => {
      // El back valida @IsUUID('4') y @IsInt(): un '' o un null en esos campos
      // hace rechazar el PUT entero.
      const dto = configuracionDtoAdapter(configuracionFormDefault);

      expect(dto).toEqual({ msjRetiro: false, msjEnvio: false });
      expect(Object.keys(dto)).not.toContain('idSede');
      expect(Object.keys(dto)).not.toContain('fechaEntrega');
    });

    it('conserva horaEntrega 0 porque es una hora valida', () => {
      // Si se usara un chequeo de truthiness, la medianoche se perderia.
      const dto = configuracionDtoAdapter({ ...configuracionFormDefault, horaEntrega: 0 });

      expect(dto.horaEntrega).toBe(0);
    });

    it('manda los booleanos aunque vengan en false', () => {
      const dto = configuracionDtoAdapter({ msjRetiro: false, msjEnvio: false });

      expect(dto).toEqual({ msjRetiro: false, msjEnvio: false });
    });

    it('no manda PK ni fechaActualizacion, que los maneja el back', () => {
      const dto = configuracionDtoAdapter(formCompleto);

      expect(Object.keys(dto).sort()).toEqual([
        'fechaEntrega',
        'horaEntrega',
        'idDatoCobro',
        'idMsjPedidoRetirado',
        'idMsjPedidoTomado',
        'idSede',
        'msjEnvio',
        'msjRetiro',
      ]);
    });
  });

  describe('configEntregaDtoAdapter', () => {
    it('manda solo la fecha de entrega', () => {
      const form: formValuesConfigEntrega = { fechaEntrega: '2026-12-01' };

      const dto = configEntregaDtoAdapter(form);

      expect(dto).toEqual({ fechaEntrega: '2026-12-01' });
      expect(Object.keys(dto)).toEqual(['fechaEntrega']);
    });

    it('devuelve un objeto vacio cuando no hay fecha', () => {
      expect(configEntregaDtoAdapter({ fechaEntrega: '' })).toEqual({});
      expect(configEntregaDtoAdapter({})).toEqual({});
    });
  });
});
