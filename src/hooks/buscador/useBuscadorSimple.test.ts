import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import type { PaginadoProp } from '../../adaptadores/entrada/paginado.adapter';
import useBusquedaSimple from './useBuscadorSimple';

interface FilaTest {
  id: string;
  nombre: string;
}

// jsdom no implementa IntersectionObserver y `useFinPagina` lo instancia al
// montar: sin este stub el hook revienta antes de poder ejercitar el borrado.
class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();

  constructor(_callback: IntersectionObserverCallback, _opciones?: IntersectionObserverInit) {}
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

const limiteLetrasBusqueda = 4;

const crearPagina = (datos: FilaTest[]): PaginadoProp<FilaTest> => ({
  total: datos.length,
  limite: 20,
  pagina: 1,
  datos,
  query: '',
});

const filas = (): FilaTest[] => [
  { id: 'cliente-1', nombre: 'Uno' },
  { id: 'cliente-2', nombre: 'Dos' },
];

interface PropsTest {
  valor: string;
  response: PaginadoProp<FilaTest> | null;
}

const renderBuscador = (initialProps: PropsTest) =>
  renderHook(
    ({ valor, response }: PropsTest) =>
      useBusquedaSimple<FilaTest>({
        valor,
        obtenerBusqueda: vi.fn(),
        response,
        loading: false,
        limiteLetrasBusqueda,
      }),
    { initialProps }
  );

// El hook debouncea 300 ms con setTimeout: con timers falsos el avance es
// determinista y no depende del reloj real.
const avanzarDebounce = () =>
  act(() => {
    vi.advanceTimersByTime(300);
  });

describe('useBusquedaSimple', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // El hook loguea cada respuesta; se silencia para que la salida del test
    // muestre solo fallos.
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('publica las filas y la query cuando el valor supera el limite', () => {
    const { result, rerender } = renderBuscador({ valor: 'cliente', response: null });

    avanzarDebounce();
    rerender({ valor: 'cliente', response: crearPagina(filas()) });

    expect(result.current.datos).toBeDefined();
    expect(result.current.datos?.datosQuery).toHaveLength(2);
    expect(result.current.datos?.query).toBe('cliente');
  });

  it('limpia los datos al borrar la query aunque la respuesta siga siendo la misma', () => {
    const response = crearPagina(filas());
    const { result, rerender } = renderBuscador({ valor: 'cliente', response: null });

    avanzarDebounce();
    rerender({ valor: 'cliente', response });
    expect(result.current.datos).toBeDefined();

    // Al borrar no se pide nada, asi que la respuesta nunca cambia de
    // identidad: si el reset dependiera de `response`, los resultados viejos
    // quedarian en pantalla.
    rerender({ valor: '', response });
    avanzarDebounce();

    expect(result.current.datos).toBeUndefined();
  });

  it('no repuebla la lista si llega una respuesta tardia con la query vacia', () => {
    const { result, rerender } = renderBuscador({ valor: '', response: null });

    avanzarDebounce();
    rerender({ valor: '', response: crearPagina(filas()) });

    expect(result.current.datos).toBeUndefined();
  });
});
