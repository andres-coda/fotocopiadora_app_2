import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useConfiguracionApi from './useConfiguracionApi';
import { CONFIGURACION } from '../../utils/endpoint';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { formValuesConfiguracion } from '../../modelo/Entidades/configuracion/esqConfiguracion.esquema';

// El token vive en un contexto de React que aca no aporta nada: lo unico que
// importa es que useApi lo lea. Mockear el hook deja el test aislado del
// AuthProvider y de los slices que ese provider arrastra.
let token: string | null = null;
vi.mock('../../hooks/autenticacion/useAutenticacion', () => ({
  useAutenticacion: () => ({ token }),
}));

const respuestaOk = (cuerpo: unknown): Response =>
  ({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(cuerpo),
  }) as unknown as Response;

const respuestaError = (status: number, statusText: string, cuerpo: unknown): Response =>
  ({
    ok: false,
    status,
    statusText,
    json: () => Promise.resolve(cuerpo),
  }) as unknown as Response;

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  token = null;
  fetchMock = vi.fn(() => Promise.resolve(respuestaOk({})));
  vi.stubGlobal('fetch', fetchMock);
  // Los caminos de error de useApi loguean a proposito. Sin silenciarlos la
  // salida de la suite se llena de stacks y no se ve que fallo.
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const montar = () => renderHook(() => useConfiguracionApi());

const llamar = async (peticion: () => Promise<void>) => {
  await act(async () => {
    await peticion();
  });
};

const cuerpoDe = (init: RequestInit): Record<string, unknown> =>
  JSON.parse(init.body as string) as Record<string, unknown>;

describe('useConfiguracionApi: contrato de los metodos', () => {
  it('editarConfiguracion hace PUT a CONFIGURACION y omite los campos sin valor', async () => {
    const { result } = montar();
    // Formulario con huecos a proposito: '' en un desplegable y undefined en un
    // campo opcional. El back valida uuid4/int, asi que esos huecos no viajan.
    const form: formValuesConfiguracion = {
      fechaEntrega: '2026-11-05',
      horaEntrega: 14,
      idSede: '6f0f0d1e-8b52-4c6f-9f0e-2b6f0e2f8a11',
      idDatoCobro: '',
      idMsjPedidoTomado: 'a8f0f9f6-1f0a-4b5c-8f1c-0d5f4b3e2c10',
      idMsjPedidoRetirado: undefined,
      msjRetiro: true,
      msjEnvio: false,
    };

    await llamar(() => result.current.editarConfiguracion(form));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(CONFIGURACION);
    expect(init.method).toBe(httpMethod.PUT);
    expect(cuerpoDe(init)).toEqual({
      fechaEntrega: '2026-11-05',
      horaEntrega: 14,
      idSede: '6f0f0d1e-8b52-4c6f-9f0e-2b6f0e2f8a11',
      idMsjPedidoTomado: 'a8f0f9f6-1f0a-4b5c-8f1c-0d5f4b3e2c10',
      msjRetiro: true,
      msjEnvio: false,
    });
  });

  it('editarConfiguracion conserva horaEntrega 0 (medianoche)', async () => {
    const { result } = montar();

    await llamar(() => result.current.editarConfiguracion({ horaEntrega: 0 }));

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(cuerpoDe(init)).toEqual({ horaEntrega: 0 });
  });

  it('obtenerConfiguracion hace GET sin body', async () => {
    const { result } = montar();

    await llamar(() => result.current.obtenerConfiguracion());

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(CONFIGURACION);
    expect(init.method).toBe(httpMethod.GET);
    expect(init).not.toHaveProperty('body');
  });

  it('cambiarFechaEntrega manda solo la fecha en el PUT', async () => {
    const { result } = montar();

    await llamar(() => result.current.cambiarFechaEntrega({ fechaEntrega: '2026-12-01' }));

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(CONFIGURACION);
    expect(init.method).toBe(httpMethod.PUT);
    expect(cuerpoDe(init)).toEqual({ fechaEntrega: '2026-12-01' });
  });
});

describe('useConfiguracionApi: adapter de entrada', () => {
  it('aplica configuracionAdapter sobre la respuesta del back', async () => {
    fetchMock.mockResolvedValue(
      respuestaOk({
        fechaActualizacion: '2026-10-30T03:00:00.000Z',
        fechaEntrega: '2026-11-05T03:00:00.000Z',
        horaEntrega: 14,
        msjRetiro: true,
        sede: { id: 'sede-1', nombre: 'Centro', deleted: false },
      })
    );
    const { result } = montar();

    await llamar(() => result.current.obtenerConfiguracion());

    expect(result.current.responseConfiguracion).toEqual({
      fechaActualizacion: '2026-10-30T03:00:00.000Z',
      // fechaParaInput recorta el ISO a YYYY-MM-DD, que es lo que come el
      // input type="date" del formulario.
      fechaEntrega: '2026-11-05',
      horaEntrega: 14,
      msjRetiro: true,
      msjEnvio: false,
      msjRetirado: undefined,
      msjTomado: undefined,
      sede: { id: 'sede-1', deleted: false, ultAct: 'No se conoce', nombre: 'Centro' },
      datoCobrado: undefined,
    });
  });
});

describe('useConfiguracionApi: errores', () => {
  it('deja en errorFetchConfiguracion el status HTTP real', async () => {
    fetchMock.mockResolvedValue(
      respuestaError(422, 'Unprocessable Entity', {
        message: 'La hora de entrega no puede ser mayor a 23',
      })
    );
    const { result } = montar();

    await llamar(() => result.current.cambiarFechaEntrega({ fechaEntrega: '2026-12-01' }));

    expect(result.current.errorFetchConfiguracion).toBe(
      'La petición falló (HTTP 422 Unprocessable Entity): La hora de entrega no puede ser mayor a 23'
    );
    expect(result.current.responseConfiguracion).toBeNull();
  });
});
