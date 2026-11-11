import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socket from '../../socket';
import { useAutenticacion } from '../autenticacion/useAutenticacion';
import { Mens } from '../../modelo/socket/enum/mens.enum';
import { EntidadDatoMap, Mensaje } from '../../modelo/socket/Socket.interface';
import { PrecioAdapterProp, PrecioProp } from '../../modelo/Entidades/precio/precio.interface';
import { ClienteAdapterProp, ClienteProp } from '../../modelo/Entidades/cliente/cliente.interface';
import { precioAdapter } from '../../adaptadores/entrada/precio.adapter';
import { clienteAdapter } from '../../adaptadores/entrada/cliente.adapter';
import {
  actualizarPrecioRedux,
  agregarPrecioSocketRedux,
  eliminarPrecioRedux,
} from '../../redux/state/precio.state';
import {
  actualizarClienteRedux,
  agregarClienteSocketRedux,
  eliminarClienteRedux,
} from '../../redux/state/cliente.state';

interface Prop {
  libro?: boolean | undefined;
  cliente?: boolean | undefined;
  especificacion?: boolean | undefined;
  materia?: boolean | undefined;
  pedido?: boolean | undefined;
  pedidoLibro?: boolean | undefined;
  precio?: boolean | undefined;
  propuesta?: boolean | undefined;
  sede?: boolean | undefined;
  componente?: boolean | undefined;
}

// El payload ya viene normalizado cuando trae `ultAct`; si llega crudo desde la
// API se pasa por el adapter de entrada.
const normalizarPrecio = (raw: unknown): PrecioProp | undefined => {
  if (!raw || typeof raw !== 'object') return undefined;

  const dato = raw as Partial<PrecioProp> & Partial<PrecioAdapterProp>;
  if (dato.ultAct && dato.nombre) return dato as PrecioProp;

  return precioAdapter(dato as PrecioAdapterProp);
};

const normalizarCliente = (raw: unknown): ClienteProp | undefined => {
  if (!raw || typeof raw !== 'object') return undefined;

  const dato = raw as Partial<ClienteProp> & Partial<ClienteAdapterProp>;
  if (dato.ultAct && dato.resumen) return dato as ClienteProp;

  return clienteAdapter(dato as ClienteAdapterProp);
};

const datoDe = (data: Mensaje): unknown => (data as unknown as { dato?: unknown }).dato;

const idDe = (data: Mensaje): string | undefined => (data as unknown as { id?: string }).id;

interface HandlersEntidad {
  crear: (data: Mensaje) => void;
  editar: (data: Mensaje) => void;
  eliminar: (data: Mensaje) => void;
}

interface HandlersEntidadProp<T extends { id?: string }> {
  entidad: string;
  normalizar: (raw: unknown) => T | undefined;
  alCrear: (dato: T) => void;
  alEditar: (dato: T) => void;
  alEliminar: (id: string) => void;
}

// El gateway emite a la sala `empresa:<idEmpresa>` del actor, asi que todo lo
// que llega aca ya es de la empresa del usuario: solo hay que filtrar entidad.
const crearHandlers = <T extends { id?: string }>({
  entidad,
  normalizar,
  alCrear,
  alEditar,
  alEliminar,
}: HandlersEntidadProp<T>): HandlersEntidad => ({
  crear: (data: Mensaje) => {
    if ((data.entidad as string) !== entidad) return;

    const dato = normalizar(datoDe(data));
    if (!dato?.id) return;

    alCrear(dato);
  },
  editar: (data: Mensaje) => {
    if ((data.entidad as string) !== entidad) return;

    const dato = normalizar(datoDe(data));
    if (!dato?.id) return;

    alEditar(dato);
  },
  eliminar: (data: Mensaje) => {
    if ((data.entidad as string) !== entidad) return;

    const id = idDe(data);
    if (!id) return;

    alEliminar(id);
  },
});

const useSockets = ({}: Prop) => {
  const dispatch = useDispatch();

  const { token } = useAutenticacion();

  // El gateway valida el JWT y une al cliente a la sala de su empresa.
  useEffect(() => {
    if (!token) {
      socket.disconnect();
      return;
    }

    socket.auth = { token };
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [token]);

  useEffect(() => {
    const onConnect = () => console.log('Socket conectado:', socket.id);
    const onDisconnect = () => console.log('Socket desconectado');

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  useEffect(() => {
    const logAny = (event: string, ...args: unknown[]) => {
      console.log(`Evento recibido: ${event}`, args);
    };

    // `Entidad` expone las claves en mayusculas ('PRECIO'); la API emite el
    // valor del mapa en minusculas ('precio'), que es lo que hay que comparar.
    const handlers: HandlersEntidad[] = [
      crearHandlers<PrecioProp>({
        entidad: EntidadDatoMap.PRECIO,
        normalizar: normalizarPrecio,
        alCrear: precio => dispatch(agregarPrecioSocketRedux(precio)),
        alEditar: precio => dispatch(actualizarPrecioRedux(precio)),
        alEliminar: id => dispatch(eliminarPrecioRedux(id)),
      }),
      crearHandlers<ClienteProp>({
        entidad: EntidadDatoMap.CLIENTE,
        normalizar: normalizarCliente,
        alCrear: cliente => dispatch(agregarClienteSocketRedux(cliente)),
        alEditar: cliente => dispatch(actualizarClienteRedux(cliente)),
        alEliminar: id => dispatch(eliminarClienteRedux(id)),
      }),
    ];

    socket.onAny(logAny);
    handlers.forEach(handler => {
      socket.on(Mens.CREAR, handler.crear);
      socket.on(Mens.EDITAR, handler.editar);
      socket.on(Mens.ELIMINAR, handler.eliminar);
    });

    return () => {
      socket.offAny(logAny);
      handlers.forEach(handler => {
        socket.off(Mens.CREAR, handler.crear);
        socket.off(Mens.EDITAR, handler.editar);
        socket.off(Mens.ELIMINAR, handler.eliminar);
      });
    };
  }, [dispatch]);

  return {};
};

export default useSockets;
