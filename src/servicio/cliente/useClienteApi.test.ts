import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import useClienteApi from './useClienteApi';
import { CLIENTE, CLIENTE_ID } from '../../utils/endpoint';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { formValuesCliente } from '../../modelo/Entidades/cliente/esqCliente.esquema';

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

const montar = () => renderHook(() => useClienteApi());

const llamar = async (peticion: () => Promise<void>) => {
  await act(async () => {
    await peticion();
  });
};

const cuerpoDe = (init: RequestInit): Record<string, unknown> =>
  JSON.parse(init.body as string) as Record<string, unknown>;

const formCliente: formValuesCliente = {
  nombre: 'Ana',
  telefono: '11 15 1234-5678',
  email: 'ana@mail.com',
};

describe('useClienteApi: contrato de los metodos', () => {
  it('obtenerClienteById usa limite 6, pagina 1 y orden vacio por defecto', async () => {
    const { result } = montar();

    await llamar(() => result.current.obtenerClienteById('cli-1'));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    // La url se arma completa aunque no se pase ningun query: el back espera
    // los tres parametros siempre.
    expect(url).toBe(`${CLIENTE_ID}/cli-1?limite=6&pagina=1&orden=`);
    expect(init.method).toBe(httpMethod.GET);
    expect(init).not.toHaveProperty('body');
  });

  it('obtenerClienteById respeta orden, limite y pagina recibidos', async () => {
    const { result } = montar();

    await llamar(() => result.current.obtenerClienteById('cli-1', 'nombre', 10, 2));

    expect(fetchMock.mock.calls[0][0]).toBe(`${CLIENTE_ID}/cli-1?limite=10&pagina=2&orden=nombre`);
  });

  it('crearCliente hace POST y manda el body del adapter con el telefono normalizado', async () => {
    const { result } = montar();

    await llamar(() => result.current.crearCliente(formCliente));

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(CLIENTE);
    expect(init.method).toBe(httpMethod.POST);
    expect(cuerpoDe(init)).toEqual({
      nombre: 'Ana',
      telefono: '+5491112345678',
      email: 'ana@mail.com',
    });
  });

  it('editarCliente hace PUT al id recibido', async () => {
    const { result } = montar();

    await llamar(() => result.current.editarCliente(formCliente, 'cli-1'));

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${CLIENTE}/cli-1`);
    expect(init.method).toBe(httpMethod.PUT);
    expect(cuerpoDe(init)).toEqual({
      nombre: 'Ana',
      telefono: '+5491112345678',
      email: 'ana@mail.com',
    });
  });
});

describe('useClienteApi: adapter de entrada', () => {
  it('aplica clienteAdapter sobre la respuesta del back', async () => {
    fetchMock.mockResolvedValue(
      respuestaOk({
        id: 'cli-1',
        deleted: false,
        fechaCreacion: new Date(2026, 0, 2, 10, 30),
        nombre: 'Ana',
        telefono: '+549112345678',
        email: 'ana@mail.com',
      })
    );
    const { result } = montar();

    await llamar(() => result.current.obtenerClienteById('cli-1'));

    expect(result.current.responseCliente).toMatchObject({
      id: 'cli-1',
      nombre: 'Ana',
      telefono: '+549112345678',
      email: 'ana@mail.com',
      ultAct: '02-01-2026 - 10 : 30 hs',
      resumen: { pendiente: 0, listo: 0, retirado: 0, cancelado: 0 },
      pedidos: [],
    });
    // El DTO de la API no tiene que filtrarse al modelo.
    expect(result.current.responseCliente).not.toHaveProperty('fechaCreacion');
  });
});

describe('useClienteApi: carga en el mount', () => {
  it('con clienteId dispara el GET al montar', async () => {
    const { result } = renderHook(() => useClienteApi('cli-1'));

    await waitFor(() => expect(result.current.loadingCliente).toBe(false));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe(`${CLIENTE_ID}/cli-1?limite=6&pagina=1&orden=`);
  });

  it('sin clienteId no dispara ninguna peticion al montar', async () => {
    renderHook(() => useClienteApi());

    await act(async () => {});

    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('useClienteApi: errores', () => {
  it('deja en errorFetchCliente el status HTTP real', async () => {
    fetchMock.mockResolvedValue(
      respuestaError(404, 'Not Found', { message: 'El cliente no existe' })
    );
    const { result } = montar();

    await llamar(() => result.current.obtenerClienteById('cli-1'));

    expect(result.current.errorFetchCliente).toBe(
      'La petición falló (HTTP 404 Not Found): El cliente no existe'
    );
    expect(result.current.responseCliente).toBeNull();
  });
});
