import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import appStore from '../../../../redux/store';
import { seleccionarLibro } from '../../../../redux/state/libro.state';
import { seleccionarPropuesta } from '../../../../redux/state/propuesta.state';
import { ProveiderModalContext, useModalContext } from '../../../../contexto/contextoModal';
import { LibroProp } from '../../../../modelo/Entidades/libro/libro.interface';
import { PropuestaProp } from '../../../../modelo/Entidades/propuesta/propuesta.interface';
import { listaLibroPropuestaSeleccionable } from '../util/funcionesAdicionales';
import useBuscadorLibro from './useBuscadorLibro';

// El hook instancia `IntersectionObserver` para el scroll infinito y jsdom no
// lo trae: sin el stub revienta al montar.
class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();

  constructor(_callback: IntersectionObserverCallback, _opciones?: IntersectionObserverInit) {}
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// Se mockean las dos APIs y el debounce de la query: aca no se prueba la
// busqueda, se prueba que cerrar un modal no borre la seleccion.
vi.mock('../../../../servicio/libro/useLibrosApi', () => ({
  default: () => ({
    obtenerLibros: vi.fn(),
    obtenerLibrosBusqueda: vi.fn(),
    responseLibros: null,
    loadingLibros: false,
    errorFetchLibros: null,
  }),
}));

vi.mock('../../../../servicio/propuesta/usePropuestasApi', () => ({
  default: () => ({
    obtenerPropuestas: vi.fn(),
    obtenerPropuestaBusqueda: vi.fn(),
    responsePropuestas: null,
    loadingPropuestas: false,
    errorFetchPropuestas: null,
  }),
}));

vi.mock('../../../../hooks/buscador/useBuscadorQuery', () => ({
  default: () => ({ query: '' }),
}));

// Permite abrir y cerrar el modal desde el test con el mismo contexto que usa
// la app.
let controlModal: (abierto: boolean) => void = () => {};

const ControlModal = () => {
  const { setModal } = useModalContext();
  controlModal = setModal as (abierto: boolean) => void;
  return null;
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={appStore}>
    <MemoryRouter>
      <ProveiderModalContext>
        <ControlModal />
        {children}
      </ProveiderModalContext>
    </MemoryRouter>
  </Provider>
);

const renderBuscador = () =>
  renderHook(
    () =>
      useBuscadorLibro({
        opcionesActivas: [listaLibroPropuestaSeleccionable[0].nombre],
        valor: '',
      }),
    { wrapper }
  );

const libro = { id: 'libro-1', nombre: 'Matematica 3' } as LibroProp;
const propuesta = { id: 'propuesta-1', nombre: 'Propuesta de prueba' } as PropuestaProp;

describe('useBuscadorLibro: seleccion al cerrar un modal', () => {
  beforeEach(() => {
    controlModal = () => {};
  });

  // Regresion: el efecto de cierre de modal reseteaba tambien el libro. En
  // "Ir al libro" el boton despacha la seleccion, navega y despues cierra el
  // modal de crear libro, asi que la pagina del libro quedaba sin seleccion y
  // mostraba "No se encontro el libro seleccionado".
  it('cerrar un modal conserva el libro seleccionado', () => {
    renderBuscador();

    act(() => controlModal(true));
    act(() => {
      appStore.dispatch(seleccionarLibro(libro));
    });
    act(() => controlModal(false));

    expect(appStore.getState().libro.datoSeleccionado).toBe(libro);
  });

  // El reseteo de la propuesta si es intencional: el modal de una propuesta
  // muestra la propuesta elegida y al cerrarlo la lista no debe quedar
  // apuntando a ella.
  it('cerrar un modal suelta la propuesta seleccionada', () => {
    renderBuscador();

    act(() => controlModal(true));
    act(() => {
      appStore.dispatch(seleccionarPropuesta(propuesta));
    });
    act(() => controlModal(false));

    expect(appStore.getState().propuesta.datoSeleccionado).toBeUndefined();
  });
});
