import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import socket from '../../socket';
import { useAutenticacion } from '../autenticacion/useAutenticacion';
import { Mens } from '../../modelo/socket/enum/mens.enum';
import { Mensaje } from '../../modelo/socket/Socket.interface';
import { PrecioAdapterProp, PrecioProp } from '../../modelo/Entidades/precio/precio.interface';
import { precioAdapter } from '../../adaptadores/entrada/precio.adapter';
import {
  actualizarPrecioRedux,
  agregarPrecioSocketRedux,
  eliminarPrecioRedux,
} from '../../redux/state/precio.state';

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

// La API emite la entidad en minusculas ('precio'); el tipo local la declara en mayusculas.
const ENTIDAD_PRECIO = 'precio';

const normalizarPrecio = (raw: unknown): PrecioProp | undefined => {
  if (!raw || typeof raw !== 'object') return undefined;

  const dato = raw as Partial<PrecioProp> & Partial<PrecioAdapterProp>;
  if (dato.ultAct && dato.nombre) return dato as PrecioProp;

  return precioAdapter(dato as PrecioAdapterProp);
};

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

    const handleCrear = (data: Mensaje) => {
      if ((data.entidad as string) !== ENTIDAD_PRECIO) return;

      const precio = normalizarPrecio((data as unknown as { dato?: unknown }).dato);
      if (!precio?.id) return;

      dispatch(agregarPrecioSocketRedux(precio));
    };

    const handleEditar = (data: Mensaje) => {
      if ((data.entidad as string) !== ENTIDAD_PRECIO) return;

      const precio = normalizarPrecio((data as unknown as { dato?: unknown }).dato);
      if (!precio?.id) return;

      dispatch(actualizarPrecioRedux(precio));
    };

    const handleEliminar = (data: Mensaje) => {
      if ((data.entidad as string) !== ENTIDAD_PRECIO) return;

      const id = (data as unknown as { id?: string }).id;
      if (!id) return;

      dispatch(eliminarPrecioRedux(id));
    };

    socket.onAny(logAny);
    socket.on(Mens.CREAR, handleCrear);
    socket.on(Mens.EDITAR, handleEditar);
    socket.on(Mens.ELIMINAR, handleEliminar);

    return () => {
      socket.offAny(logAny);
      socket.off(Mens.CREAR, handleCrear);
      socket.off(Mens.EDITAR, handleEditar);
      socket.off(Mens.ELIMINAR, handleEliminar);
    };
  }, [dispatch]);

  return {};
};

export default useSockets;
