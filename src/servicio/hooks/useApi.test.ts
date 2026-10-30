import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useApi, { HttpApiError } from './useApi';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';

// El token vive en un contexto de React que aca no aporta nada: lo unico que
// importa es que useApi lo lea y lo mande. Mockear el hook deja el test
// aislado del AuthProvider y de los trece slices que importa ese provider.
let token: string | null = null;
vi.mock('../../hooks/autenticacion/useAutenticacion', () => ({
  useAutenticacion: () => ({ token }),
}));

const URL = 'http://localhost:3000/cliente';

const respuestaOk = (cuerpo: unknown): Response =>
  ({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(cuerpo),
    blob: () => Promise.resolve(new Blob(['x'])),
  }) as unknown as Response;

const respuestaError = (status: number, statusText: string, cuerpo?: unknown): Response =>
  ({
    ok: false,
    status,
    statusText,
    json: () =>
      cuerpo === undefined ? Promise.reject(new Error('no es json')) : Promise.resolve(cuerpo),
  }) as unknown as Response;

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  token = null;
  fetchMock = vi.fn(() => Promise.resolve(respuestaOk({})));
  vi.stubGlobal('fetch', fetchMock);
  // Los caminos de error usan console.error/console.log a proposito. Sin esto
  // la salida de la suite se llena de stacks y no se ve que fallo.
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

const montar = () => renderHook(() => useApi<unknown>({}));

const llamar = async (fetchData: (p: object) => Promise<void>, props: object) => {
  await act(async () => {
    await fetchData(props);
  });
};

describe('useApi: armado de la peticion', () => {
  it('hace GET a la url recibida con Content-Type json', async () => {
    const { result } = montar();
    await llamar(result.current.fetchData, { url: URL });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(URL);
    expect(init.method).toBe(httpMethod.GET);
    expect(init.headers).toEqual({ 'Content-Type': 'application/json' });
  });

  it('no manda Authorization cuando no hay token', async () => {
    const { result } = montar();
    await llamar(result.current.fetchData, { url: URL });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(init.headers).not.toHaveProperty('Authorization');
  });

  it('manda Authorization: Bearer cuando hay token', async () => {
    token = 'abc.123';
    const { result } = montar();
    await llamar(result.current.fetchData, { url: URL });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(init.headers).toEqual({
      'Content-Type': 'application/json',
      Authorization: 'Bearer abc.123',
    });
  });

  it('prefiere la url del parametro sobre urlGet', async () => {
    const { result } = renderHook(() =>
      useApi<unknown>({ urlGet: 'http://localhost:3000/por-defecto' })
    );
    await llamar(result.current.fetchData, { url: URL });

    expect(fetchMock.mock.calls[0][0]).toBe(URL);
  });

  it('usa urlGet cuando no se pasa url', async () => {
    const { result } = renderHook(() =>
      useApi<unknown>({ urlGet: 'http://localhost:3000/por-defecto' })
    );
    await llamar(result.current.fetchData, {});

    expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:3000/por-defecto');
  });

  it('manda el body y el metodo recibidos', async () => {
    const { result } = montar();
    await llamar(result.current.fetchData, {
      url: URL,
      methodo: httpMethod.POST,
      bodyData: JSON.stringify({ nombre: 'Ana' }),
    });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe(httpMethod.POST);
    expect(init.body).toBe('{"nombre":"Ana"}');
  });

  it('no manda body cuando no se pasa', async () => {
    const { result } = montar();
    await llamar(result.current.fetchData, { url: URL });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(init).not.toHaveProperty('body');
  });

  it('lanza si no hay ninguna url', async () => {
    const { result } = montar();

    await expect(result.current.fetchData({})).rejects.toThrow('No hay url en el pedido');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('useApi: adaptadores', () => {
  it('aplica el adapter y deja el resultado en response', async () => {
    fetchMock.mockResolvedValue(respuestaOk({ id: '1', nombre: 'Ana' }));
    const { result } = montar();

    await llamar(result.current.fetchData, {
      url: URL,
      adapter: (data: { nombre: string }) => data.nombre,
    });

    expect(result.current.response).toBe('Ana');
  });

  it('prefiere el adapter del parametro sobre adapterGet', async () => {
    const adapterGet = vi.fn((data: { nombre: string }) => `get:${data.nombre}`);
    const adapter = vi.fn((data: { nombre: string }) => `call:${data.nombre}`);
    fetchMock.mockResolvedValue(respuestaOk({ nombre: 'Ana' }));

    const { result } = renderHook(() => useApi<string>({ adapterGet }));
    await llamar(result.current.fetchData, { url: URL, adapter });

    expect(result.current.response).toBe('call:Ana');
    expect(adapterGet).not.toHaveBeenCalled();
  });

  it('usa adapterGet cuando la llamada no pasa adapter', async () => {
    const { result } = renderHook(() =>
      useApi<string>({ adapterGet: (data: { nombre: string }) => `get:${data.nombre}` })
    );
    fetchMock.mockResolvedValue(respuestaOk({ nombre: 'Ana' }));

    await llamar(result.current.fetchData, { url: URL });

    expect(result.current.response).toBe('get:Ana');
  });

  it('sin adapter devuelve el json crudo', async () => {
    fetchMock.mockResolvedValue(respuestaOk({ a: 1 }));
    const { result } = montar();

    await llamar(result.current.fetchData, { url: URL });

    expect(result.current.response).toEqual({ a: 1 });
  });

  it('con blob:true lee blob() y nunca llama a json()', async () => {
    const json = vi.fn();
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json,
      blob: () => Promise.resolve(new Blob(['pdf'])),
    } as unknown as Response);

    const { result } = renderHook(() => useApi<Blob>({ blob: true }));
    await llamar(result.current.fetchData, { url: URL });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe(httpMethod.GET);
    expect(json).not.toHaveBeenCalled();
    expect(result.current.response).toBeInstanceOf(Blob);
  });
});

describe('useApi: errores', () => {
  it('arma errorFetch con status, statusText y el message del back', async () => {
    fetchMock.mockResolvedValue(
      respuestaError(422, 'Unprocessable Entity', { message: 'El telefono ya existe' })
    );
    const { result } = montar();

    await llamar(result.current.fetchData, { url: URL });

    expect(result.current.errorFetch).toBe(
      'La petición falló (HTTP 422 Unprocessable Entity): El telefono ya existe'
    );
    expect(result.current.response).toBeNull();
  });

  it('usa el mensaje por defecto cuando el error no trae json', async () => {
    fetchMock.mockResolvedValue(respuestaError(500, 'Internal Server Error'));
    const { result } = montar();

    await llamar(result.current.fetchData, { url: URL });

    expect(result.current.errorFetch).toBe(
      'La petición falló (HTTP 500 Internal Server Error): La petición falló'
    );
  });

  it('reporta el error de red con nombre y mensaje', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));
    const { result } = montar();

    await llamar(result.current.fetchData, { url: URL });

    expect(result.current.errorFetch).toContain(
      'Error al intentar comunicarse con la base de datos'
    );
    expect(result.current.errorFetch).toContain('TypeError');
    expect(result.current.errorFetch).toContain('Failed to fetch');
  });

  it('una peticion abortada no deja error ni respuesta', async () => {
    // Se arma el error con `Error` y `name: 'AbortError'` en vez de con
    // `new DOMException(...)`: en jsdom el DOMException vive en otro realm y
    // `instanceof Error` da false, cosa que no pasa en el navegador ni en el
    // WebView, donde la app corre de verdad. El contrato que importa es el
    // `name`.
    const abortado = Object.assign(new Error('abortado'), { name: 'AbortError' });
    fetchMock.mockRejectedValue(abortado);
    const { result } = montar();

    await llamar(result.current.fetchData, { url: URL });

    expect(result.current.errorFetch).toBeNull();
    expect(result.current.response).toBeNull();
    expect(console.log).toHaveBeenCalledWith('Petición abortada');
  });

  it('HttpApiError conserva status y statusText', () => {
    const error = new HttpApiError(404, 'Not Found', 'no existe');

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('HttpApiError');
    expect(error.status).toBe(404);
    expect(error.statusText).toBe('Not Found');
    expect(error.message).toBe('no existe');
  });
});

describe('useApi: estado', () => {
  it('loading pasa a true mientras espera y vuelve a false al terminar', async () => {
    let resolver: (valor: Response) => void = () => {};
    fetchMock.mockReturnValue(
      new Promise<Response>(resolve => {
        resolver = resolve;
      })
    );

    const { result } = montar();
    let enCurso: Promise<void> = Promise.resolve();

    await act(async () => {
      enCurso = result.current.fetchData({ url: URL });
    });
    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolver(respuestaOk({ ok: true }));
      await enCurso;
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.response).toEqual({ ok: true });
  });

  it('loading vuelve a false tambien cuando la peticion falla', async () => {
    fetchMock.mockResolvedValue(respuestaError(400, 'Bad Request', { message: 'mal' }));
    const { result } = montar();

    await llamar(result.current.fetchData, { url: URL });

    expect(result.current.loading).toBe(false);
  });

  it('limpia la respuesta anterior al arrancar una peticion nueva', async () => {
    const { result } = montar();
    await llamar(result.current.fetchData, { url: URL });
    expect(result.current.response).toEqual({});

    // La segunda queda colgada a proposito: lo que se mira es el estado
    // inmediatamente despues de dispararla, no su resultado.
    fetchMock.mockReturnValue(new Promise<Response>(() => {}));
    await act(async () => {
      void result.current.fetchData({ url: URL });
    });

    expect(result.current.response).toBeNull();
  });

  it('borra la respuesta a los 3 segundos', async () => {
    vi.useFakeTimers();
    const { result } = montar();

    await llamar(result.current.fetchData, { url: URL });
    expect(result.current.response).toEqual({});

    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.response).toBeNull();
  });

  it('con blob:true no programa el borrado a los 3 segundos', async () => {
    vi.useFakeTimers();
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      blob: () => Promise.resolve(new Blob(['pdf'])),
    } as unknown as Response);

    const { result } = renderHook(() => useApi<Blob>({ blob: true }));
    await llamar(result.current.fetchData, { url: URL });
    const descarga = result.current.response;

    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.response).toBe(descarga);
  });
});
