import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useApiPaginado from './useApiPaginado';

let token: string | null = null;
vi.mock('../../hooks/autenticacion/useAutenticacion', () => ({
  useAutenticacion: () => ({ token }),
}));

const URL = 'http://localhost:3000/cliente?pagina=1';

const respuestaOk = (cuerpo: unknown): Response =>
  ({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(cuerpo),
    blob: () => Promise.resolve(new Blob(['x'])),
  }) as unknown as Response;

const respuestaError = (status: number, statusText: string, cuerpo: unknown): Response =>
  ({
    ok: false,
    status,
    statusText,
    json: () => Promise.resolve(cuerpo),
  }) as unknown as Response;

interface Diferida {
  promesa: Promise<Response>;
  resolver: (valor: Response) => void;
}

const diferida = (): Diferida => {
  let resolver: (valor: Response) => void = () => {};
  const promesa = new Promise<Response>(resolve => {
    resolver = resolve;
  });
  return { promesa, resolver };
};

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  token = null;
  fetchMock = vi.fn(() => Promise.resolve(respuestaOk({ datos: [] })));
  vi.stubGlobal('fetch', fetchMock);
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const nombre = (dato?: { nombre: string }) => dato?.nombre;

const montar = () =>
  renderHook(() => useApiPaginado<{ nombre: string }, string>({ adapterGet: nombre }));

describe('useApiPaginado: adapter', () => {
  it('convierte total, limite y pagina a numero', async () => {
    // El back los manda como string porque vienen de @Query, y
    // useBusquedaPaginada hace `pagina + 1`.
    fetchMock.mockResolvedValue(
      respuestaOk({ total: '37', limite: '20', pagina: '2', datos: [{ nombre: 'Ana' }] })
    );
    const { result } = montar();

    await act(async () => {
      await result.current.fetchData({ url: URL, adapter: nombre });
    });

    expect(result.current.response).toEqual({
      total: 37,
      limite: 20,
      pagina: 2,
      datos: ['Ana'],
    });
  });

  it('usa los valores por defecto cuando el back no los manda', async () => {
    fetchMock.mockResolvedValue(respuestaOk({ datos: [] }));
    const { result } = montar();

    await act(async () => {
      await result.current.fetchData({ url: URL, adapter: nombre });
    });

    expect(result.current.response).toEqual({ total: 0, limite: 20, pagina: 1, datos: [] });
  });

  it('descarta los items que el adapter no puede convertir', async () => {
    // Un item sin nombre no puede llegar a la lista: si se colara, la UI
    // renderiza una fila vacia.
    fetchMock.mockResolvedValue(
      respuestaOk({ total: 2, limite: 20, pagina: 1, datos: [{ nombre: 'Ana' }, {}] })
    );
    const { result } = montar();

    await act(async () => {
      await result.current.fetchData({ url: URL, adapter: nombre });
    });

    expect(result.current.response?.datos).toEqual(['Ana']);
  });
});

describe('useApiPaginado: carreras', () => {
  it('aborta la peticion anterior al arrancar otra', async () => {
    const primera = diferida();
    const segunda = diferida();
    fetchMock.mockReturnValueOnce(primera.promesa).mockReturnValueOnce(segunda.promesa);

    const { result } = montar();
    await act(async () => {
      void result.current.fetchData({ url: URL, adapter: nombre });
    });
    const senalPrimera = (fetchMock.mock.calls[0][1] as RequestInit).signal as AbortSignal;
    expect(senalPrimera.aborted).toBe(false);

    await act(async () => {
      void result.current.fetchData({ url: URL, adapter: nombre });
    });

    expect(senalPrimera.aborted).toBe(true);
  });

  it('una respuesta vieja no pisa a la vigente', async () => {
    const primera = diferida();
    const segunda = diferida();
    fetchMock.mockReturnValueOnce(primera.promesa).mockReturnValueOnce(segunda.promesa);

    const { result } = montar();
    await act(async () => {
      void result.current.fetchData({ url: URL, adapter: nombre });
    });
    await act(async () => {
      void result.current.fetchData({ url: URL, adapter: nombre });
    });

    // Llega primero la segunda y despues la primera: la vieja tiene que
    // ignorarse aunque el fetch la haya resuelto bien.
    await act(async () => {
      segunda.resolver(
        respuestaOk({ total: 1, limite: 20, pagina: 1, datos: [{ nombre: 'nueva' }] })
      );
      await segunda.promesa;
    });
    await act(async () => {
      primera.resolver(
        respuestaOk({ total: 1, limite: 20, pagina: 1, datos: [{ nombre: 'vieja' }] })
      );
      await primera.promesa;
    });

    expect(result.current.response?.datos).toEqual(['nueva']);
  });

  it('una respuesta vieja tampoco deja loading colgado', async () => {
    const primera = diferida();
    const segunda = diferida();
    fetchMock.mockReturnValueOnce(primera.promesa).mockReturnValueOnce(segunda.promesa);

    const { result } = montar();
    await act(async () => {
      void result.current.fetchData({ url: URL, adapter: nombre });
    });
    await act(async () => {
      void result.current.fetchData({ url: URL, adapter: nombre });
    });
    await act(async () => {
      segunda.resolver(respuestaOk({ datos: [] }));
      await segunda.promesa;
    });
    await act(async () => {
      primera.resolver(respuestaOk({ datos: [] }));
      await primera.promesa;
    });

    expect(result.current.loading).toBe(false);
  });
});

describe('useApiPaginado: errores y estado', () => {
  it('error http deja errorFetch con el mensaje del back', async () => {
    fetchMock.mockResolvedValue(respuestaError(400, 'Bad Request', { message: 'filtro invalido' }));
    const { result } = montar();

    await act(async () => {
      await result.current.fetchData({ url: URL, adapter: nombre });
    });

    expect(result.current.errorFetch).toContain('filtro invalido');
    expect(result.current.response).toBeNull();
  });

  it('lanza si no hay url', async () => {
    const { result } = renderHook(() =>
      useApiPaginado<{ nombre: string }, string>({ adapterGet: nombre })
    );

    await expect(result.current.fetchData({ adapter: nombre })).rejects.toThrow(
      'No hay url en el pedido'
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('loading pasa a true mientras espera y vuelve a false al terminar', async () => {
    const pendiente = diferida();
    fetchMock.mockReturnValue(pendiente.promesa);
    const { result } = montar();

    await act(async () => {
      void result.current.fetchData({ url: URL, adapter: nombre });
    });
    expect(result.current.loading).toBe(true);

    await act(async () => {
      pendiente.resolver(respuestaOk({ datos: [] }));
      await pendiente.promesa;
    });
    expect(result.current.loading).toBe(false);
  });
});
