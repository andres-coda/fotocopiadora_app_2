import { useEffect } from "react";
import socket from "../../socket";

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

const useSockets = ({}: Prop) => {
  useEffect(() => {
    socket.on('connect', () => console.log('Socket conectado:', socket.id));
    socket.on('disconnect', () => console.log('Socket desconectado'));
  }, []);

  useEffect(() => {
    socket.onAny((event, ...args) => {
      console.log(`Evento recibido: ${event}`, args);
    });

    /* 
    const handlemensajeEliminar = (data: Mensaje) => {
      if(!data.id) return;

      if (data.entidad === Entidad.LIBRO) {
        // dispatch(verificarLibro(data.id)) // TODO: implementar con nuevo patrón ReduxProp
      }

      if (data.entidad === Entidad.ESPECIFICACION) {
        // dispatch(verificarEspecificacion(data.id));
      }
      if (data.entidad === Entidad.MATERIA) {
        // dispatch(verificarMateria(data.id));
      }
     
      if (data.entidad === Entidad.PEDIDO_LIBRO) {
        // dispatch(verificarPedidoLibro(data.id));
      }
     
      if (data.entidad === Entidad.PREOPUESTA) {
        // dispatch(verificarProp(data.id));
      }
    };

    socket.on(Mens.CREAR, handlemensajeCrear);
    socket.on(Mens.EDITAR, handlemensajeCrear);
    socket.on(Mens.ELIMINAR, handlemensajeEliminar)

    return () => {
      socket.off(Mens.CREAR, handlemensajeCrear);
      socket.off(Mens.EDITAR, handlemensajeCrear);
      socket.off(Mens.ELIMINAR, handlemensajeEliminar);
    };
    */
  }, []);

  return {
    /* responseObraSocial, responseConstante, responseConvenio, responseAntiguedadIndividual, responseGrupo, responseClasificacion,
    responseConcepto, responseSeccion, responseCargo, responseEmpleador, responseEmpleado, responseLiquidacion, responseLiquidacionInd,
    responseLicencia, responseSindicato, */
  }
}

export default useSockets;