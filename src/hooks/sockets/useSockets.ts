import { useEffect } from "react";
import { useDispatch } from "react-redux";
import socket from "../../socket";
import { Entidad, Mensaje } from "../../modelo/socket/Socket.interface";
import { verificarLibro } from "../../redux/state/libro.state";
import { verificarEspecificacion } from "../../redux/state/especificacion.state";
import { verificarMateria } from "../../redux/state/materia.state";
import { verificarPedido } from "../../redux/state/pedido.state";
import { verificarPedidoLibro } from "../../redux/state/pedido_libro.state";
import { verificarComponente } from "../../redux/state/componente.state";
import { Mens } from "../../modelo/socket/enum/mens.enum";

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

const useSockets = ({
/*   libro = undefined,
  cliente = undefined,
  especificacion = undefined,
  materia = undefined,
  pedido = undefined,
  pedidoLibro = undefined,
  precio = undefined,
  sede = undefined,
  componente = undefined,
 // propuesta = undefined */
}: Prop) => {
/*   const { obtenerLibroById, responseLibro } = useLibroApi();
  const { obtenerClienteById, responseCliente } = useClienteApi()
  const { obtenerEspecificacionById, responseEspecificacion } = useEspecificacionApi()
  const { obtenerMateriaById, responseMateria } = useMateriaApi();
  const { obtenerPedidoById, responsePedido } = usePedidoApi();
  const { obtenerPedidoLibroById, responsePedidoLibro } = usePedidoLibroApi();
  const { obtenerPrecioById, responsePrecio } = usePrecioApi();
  const { obtenerSedeById, responseSede } = useSedeApi();
  const { obtenerComponenteById, responseComponente } = useComponenteApi();
 */
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => console.log('Socket conectado:', socket.id));
    socket.on('disconnect', () => console.log('Socket desconectado'));
  }, []);

  useEffect(() => {
    socket.onAny((event, ...args) => {
      console.log(`Evento recibido: ${event}`, args);
    });

    const handlemensajeEliminar = (data: Mensaje) => {
      if(!data.id) return;

      if (data.entidad === Entidad.LIBRO) {
        dispatch(verificarLibro(data.id))
      }

      if (data.entidad === Entidad.ESPECIFICACION) {
        dispatch(verificarEspecificacion(data.id));
      }
      if (data.entidad === Entidad.MATERIA) {
        dispatch(verificarMateria(data.id));
      }
      if (data.entidad === Entidad.PEDIDO) {
        dispatch(verificarPedido(data.id));
      }
      if (data.entidad === Entidad.PEDIDO_LIBRO) {
        dispatch(verificarPedidoLibro(data.id));
      }
      if (data.entidad === Entidad.COMPONENTE) {
        dispatch(verificarComponente(data.id));
      }
      /* if (data.entidad === Entidad.PREOPUESTA) {
        dispatch(verificarProp(data.id));
      } */
    };


    /* socket.on(Mens.CREAR, handlemensajeCrear);
    socket.on(Mens.EDITAR, handlemensajeCrear); */
    socket.on(Mens.ELIMINAR, handlemensajeEliminar)

    return () => {
      /* socket.off(Mens.CREAR, handlemensajeCrear); // ✅ limpia correctamente
      socket.off(mens.EDITAR, handlemensajeCrear); */
      socket.off(Mens.ELIMINAR, handlemensajeEliminar);
    };
  }, []);

  return {
    /* responseObraSocial, responseConstante, responseConvenio, responseAntiguedadIndividual, responseGrupo, responseClasificacion,
    responseConcepto, responseSeccion, responseCargo, responseEmpleador, responseEmpleado, responseLiquidacion, responseLiquidacionInd,
    responseLicencia, responseSindicato, */
  }
}

export default useSockets;