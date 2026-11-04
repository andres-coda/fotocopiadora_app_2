import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import usePedidoApi from './usePedidoApi';
import { PEDIDO } from '../../utils/endpoint';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { formValuesPedido } from '../../modelo/Entidades/pedido/esqPedido.esquema';
import { PedidoLibroConstruccionProp } from '../../modelo/Entidades/pedido_libro/pedidoLibro.interface';
import { Estado } from '../../modelo/Entidades/pedido_libro/estado.enum';
import { Especificaciones } from '../../modelo/Entidades/especificacion/especificacion.enum';
import { libroInicial } from '../../modelo/Entidades/libro/libro.interface';
import { SedeProp } from '../../modelo/Entidades/sede/sede.interface';
import { ClienteProp, clienteInicial } from '../../modelo/Entidades/cliente/cliente.interface';
import { ConfiguracionProp } from '../../modelo/Entidades/configuracion/configuracion.interface';
import { EmpresaProp } from '../../modelo/Entidades/empresa/empresa.interface';

// El token vive en un contexto de React que aca no aporta nada: lo unico que
// importa es que useApi lo lea. Mockear el hook deja el test aislado del
// AuthProvider y de los slices que ese provider arrastra.
let token: string | null = null;
vi.mock('../../hooks/autenticacion/useAutenticacion', () => ({
  useAutenticacion: () => ({ token }),
}));

const sedeCentro: SedeProp = { id: 'sede-1', nombre: 'Centro', deleted: false, ultAct: '' };
const sedeNorte: SedeProp = { id: 'sede-2', nombre: 'Norte', deleted: false, ultAct: '' };

interface StoreFalso {
  sede: { datos: SedeProp[] };
  miEmpresa: { dato: EmpresaProp | null };
}

let estadoFalso: StoreFalso = {
  sede: { datos: [sedeCentro, sedeNorte] },
  miEmpresa: { dato: null },
};

// El hook resuelve la sede por defecto leyendo dos selectores de react-redux.
// Se mockea useSelector contra un store falso en vez de montar el Provider
// real: montar el store arrastraria los doce slices a un test de contrato HTTP.
vi.mock('react-redux', () => ({
  useSelector: (selector: (store: StoreFalso) => unknown) => selector(estadoFalso),
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
  estadoFalso = {
    sede: { datos: [sedeCentro, sedeNorte] },
    miEmpresa: { dato: null },
  };
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

const montar = () => renderHook(() => usePedidoApi());

const llamar = async (peticion: () => Promise<void>) => {
  await act(async () => {
    await peticion();
  });
};

const cuerpoDe = (init: RequestInit): Record<string, unknown> =>
  JSON.parse(init.body as string) as Record<string, unknown>;

const empresaConSede = (sede?: SedeProp): EmpresaProp => {
  const configuracion: ConfiguracionProp = {
    msjRetiro: false,
    msjEnvio: false,
    sede,
  };
  return {
    id: 'emp-1',
    nombre: 'Fotocopiadora',
    email: 'local@foto.com',
    telefono: '+549112345678',
    ultAct: 'No se conoce',
    deleted: false,
    configuracion,
  };
};

const libroConId = (id: string) => ({ ...libroInicial, id });

const libros: PedidoLibroConstruccionProp[] = [
  {
    id: 'pl-1',
    libro: libroConId('libro-1'),
    cantidad: 3,
    especificaciones: [Especificaciones.COLOR],
    estado: Estado.PENDIENTE,
  },
  {
    id: 'pl-2',
    libro: libroConId('libro-2'),
    cantidad: 1,
    detalles: 'Anillado simple',
    especificaciones: [],
    sede: sedeCentro,
    estado: Estado.PENDIENTE,
  },
];

const formPedido: formValuesPedido = {
  nombre: 'Ana',
  telefono: '11 15 1234-5678',
  email: 'ana@mail.com',
  archivos: '2',
  anillados: '1',
  fechaEntrega: '2026-11-05',
  importeTotal: '1500.5',
  sena: '500',
};

const cliente: ClienteProp = {
  ...clienteInicial,
  id: 'cli-1',
  nombre: 'Ana',
  telefono: '+549112345678',
  email: 'ana@mail.com',
};

describe('usePedidoApi: contrato de los metodos', () => {
  it('obtenerPedidoById hace GET al id recibido', async () => {
    const { result } = montar();

    await llamar(() => result.current.obtenerPedidoById('ped-1'));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${PEDIDO}/ped-1`);
    expect(init.method).toBe(httpMethod.GET);
    expect(init).not.toHaveProperty('body');
  });

  it('crearPedido hace POST a PEDIDO y convierte a numero los campos del formulario', async () => {
    const { result } = montar();

    await llamar(() => result.current.crearPedido(formPedido, [], undefined));

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(PEDIDO);
    expect(init.method).toBe(httpMethod.POST);
    expect(cuerpoDe(init)).toMatchObject({
      fechaEntrega: '2026-11-05',
      importeTotal: 1500.5,
      sena: 500,
      anillados: 1,
      archivos: 2,
      pedidoItems: [],
    });
  });

  it('crearPedido toma la sede por defecto de la configuracion de la empresa', async () => {
    estadoFalso = {
      sede: { datos: [sedeCentro, sedeNorte] },
      miEmpresa: { dato: empresaConSede(sedeNorte) },
    };
    const { result } = montar();

    await llamar(() => result.current.crearPedido(formPedido, libros, cliente));

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = cuerpoDe(init);
    const items = body.pedidoItems as { id_sede: string }[];
    // El libro sin sede propia hereda la de la configuracion (Norte, que no es
    // la primera de la lista); el que trae sede se respeta tal cual.
    expect(items.map(i => i.id_sede)).toEqual(['sede-2', 'sede-1']);
  });

  it('crearPedido cae en la primera sede cuando la configuracion no define una', async () => {
    const { result } = montar();

    await llamar(() => result.current.crearPedido(formPedido, libros, undefined));

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const items = cuerpoDe(init).pedidoItems as { id_sede: string }[];
    expect(items.map(i => i.id_sede)).toEqual(['sede-1', 'sede-1']);
  });

  it('crearPedido sin sede disponible manda el item sin id_sede y no rompe', async () => {
    // Sin sedes en el store y sin configuracion de empresa no hay sede por
    // defecto. El item tiene que salir sin la clave id_sede (no con id_sede
    // vacio ni levantando un TypeError): el 400 del back cae en
    // errorFetchPedido por el camino de errores existente.
    estadoFalso = {
      sede: { datos: [] },
      miEmpresa: { dato: null },
    };
    const { result } = montar();

    await expect(
      llamar(() => result.current.crearPedido(formPedido, [libros[0]], undefined))
    ).resolves.toBeUndefined();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const items = cuerpoDe(init).pedidoItems as Record<string, unknown>[];
    expect(items).toHaveLength(1);
    expect(items[0]).not.toHaveProperty('id_sede');
    expect(items[0].id_sede).toBeUndefined();
  });

  it('crearPedido con cliente manda su id y no manda clienteDatos', async () => {
    const { result } = montar();

    await llamar(() => result.current.crearPedido(formPedido, [], cliente));

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = cuerpoDe(init);
    expect(body.cliente).toBe('cli-1');
    // El pedido de un cliente existente lo referencia; no lo vuelve a crear.
    expect(body).not.toHaveProperty('clienteDatos');
    expect(body).not.toHaveProperty('nombre');
    expect(body).not.toHaveProperty('telefono');
  });

  it('crearPedido sin cliente arma clienteDatos desde el formulario', async () => {
    const { result } = montar();

    await llamar(() => result.current.crearPedido(formPedido, [], undefined));

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = cuerpoDe(init);
    expect(body).not.toHaveProperty('cliente');
    expect(body.clienteDatos).toEqual({
      nombre: 'Ana',
      telefono: '+5491112345678',
      email: 'ana@mail.com',
    });
  });

  it('editarPedido hace PUT al id recibido con los items del pedido', async () => {
    estadoFalso = {
      sede: { datos: [sedeCentro, sedeNorte] },
      miEmpresa: { dato: empresaConSede(sedeNorte) },
    };
    const { result } = montar();

    await llamar(() => result.current.editarPedido(formPedido, 'ped-1', libros));

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${PEDIDO}/ped-1`);
    expect(init.method).toBe(httpMethod.PUT);
    expect(cuerpoDe(init)).toMatchObject({
      fechaEntrega: '2026-11-05',
      importeTotal: 1500.5,
      sena: 500,
      anillados: 1,
      archivos: 2,
      pedidoItems: [
        {
          cantidad: 3,
          especificaciones: [Especificaciones.COLOR],
          id_libro: 'libro-1',
          id_sede: 'sede-2',
        },
        {
          cantidad: 1,
          detalles: 'Anillado simple',
          especificaciones: [],
          id_libro: 'libro-2',
          id_sede: 'sede-1',
        },
      ],
    });
  });
});

describe('usePedidoApi: adapter de entrada', () => {
  it('aplica pedidoAdapter sobre la respuesta del back', async () => {
    fetchMock.mockResolvedValue(
      respuestaOk({
        id: 'ped-1',
        deleted: false,
        fechaCreacion: new Date(2026, 0, 10, 9, 30),
        fechaEntrega: new Date(2026, 0, 15),
        importeTotal: 1500,
        archivos: 2,
        anillados: 1,
        sena: 500,
        estado: Estado.PENDIENTE,
        cliente: {
          id: 'cli-1',
          deleted: false,
          nombre: 'Ana',
          telefono: '+549112345678',
          email: 'ana@mail.com',
        },
        items: [],
      })
    );
    const { result } = montar();

    await llamar(() => result.current.obtenerPedidoById('ped-1'));

    expect(result.current.responsePedido).toMatchObject({
      id: 'ped-1',
      fechaEntrega: '2026-01-15',
      importeTotal: 1500,
      estado: Estado.PENDIENTE,
      ultAct: '10-01-2026 - 9 : 30 hs',
      libroPedidos: [],
    });
    expect(result.current.responsePedido?.cliente.nombre).toBe('Ana');
    // El DTO de la API no tiene que filtrarse al modelo.
    expect(result.current.responsePedido).not.toHaveProperty('fechaCreacion');
    expect(result.current.responsePedido).not.toHaveProperty('items');
  });
});

describe('usePedidoApi: errores', () => {
  it('deja en errorFetchPedido el status HTTP real', async () => {
    fetchMock.mockResolvedValue(
      respuestaError(400, 'Bad Request', { message: 'La fecha de entrega es obligatoria' })
    );
    const { result } = montar();

    await llamar(() => result.current.editarPedido(formPedido, 'ped-1', []));

    expect(result.current.errorFetchPedido).toBe(
      'La petición falló (HTTP 400 Bad Request): La fecha de entrega es obligatoria'
    );
    expect(result.current.responsePedido).toBeNull();
  });
});
