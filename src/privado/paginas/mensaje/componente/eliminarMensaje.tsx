import { useSelector } from "react-redux";
import { MensajeProp } from "../../../../modelo/Entidades/mensaje/mensaje.interface";
import { appStore } from "../../../../redux/store";
import useMensajeDeleteApi from "../../../../servicio/mensaje/useMensajeDeleteApi";
import EliminarElemento from "../../../../componente-estilo/eliminar/eliminarElemento";
import { eliminarMensajeRedux } from "../../../../redux/state/mensaje.state";

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
      articulo="el"
      entidad="mensaje"
      texto={`${mensaje?.nombre}`}
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
