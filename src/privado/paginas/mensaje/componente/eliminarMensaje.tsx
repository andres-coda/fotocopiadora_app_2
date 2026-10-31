import { useSelector } from 'react-redux';
import { MensajeProp } from '../../../../modelo/Entidades/mensaje/mensaje.interface';
import { appStore } from '../../../../redux/store';
import useMensajeDeleteApi from '../../../../servicio/mensaje/useMensajeDeleteApi';
import EliminarElemento from '../../../../componente-estilo/eliminar/eliminarElemento';
import { eliminarMensajeRedux } from '../../../../redux/state/mensaje.state';

const tituloEliminarMensaje = 'Eliminar mensaje';

const volantaEliminarMensaje = (mensaje: string | undefined): string | undefined => {
  if (!mensaje || mensaje === '') return undefined;
  return `¿Desea confirmar la eliminación del mensaje ---[ ${mensaje} ]--- ?`;
};

const textoEliminarMensaje = (mensaje: string | undefined): string | undefined => {
  if (!mensaje || mensaje === '') return undefined;
  return `Al eliminar el mensaje ---[ ${mensaje} ]--- también se borrara de la lista de favoritos de los trabajadores que así lo tengan.`;
};

const msjExitoEliminarMensaje = (mensaje: string | undefined): string | undefined => {
  if (!mensaje || mensaje === '') return undefined;
  return `El mensaje ---[ ${mensaje} ]--- fue eliminado con exito`;
};

const EliminarMensaje = () => {
  const mensaje: MensajeProp | undefined = useSelector(
    (store: appStore) => store.mensaje.datoSeleccionado
  );
  const {
    eliminarMensaje: eliminar,
    responseMensaje,
    errorFetchMensaje,
    loadingMensaje,
  } = useMensajeDeleteApi();

  return (
    <EliminarElemento
      titulo={tituloEliminarMensaje}
      volanta={volantaEliminarMensaje(mensaje?.nombre)}
      entidad="mensaje"
      texto={textoEliminarMensaje(mensaje?.nombre)}
      msjExito={msjExitoEliminarMensaje(mensaje?.nombre)}
      eliminarElemento={eliminar}
      loading={loadingMensaje}
      errorFetch={errorFetchMensaje}
      response={responseMensaje}
      elemento={mensaje}
      eliminarElementoRedux={eliminarMensajeRedux}
    />
  );
};

export default EliminarMensaje;
