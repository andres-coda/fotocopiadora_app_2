import { useDispatch, useSelector } from "react-redux";
import Texto from "../../../../componente-estilo/texto/texto"
import { useModalContext } from "../../../../contexto/contextoModal";
import { MensajeProp } from "../../../../modelo/Entidades/mensaje/mensaje.interface";
import { appStore } from "../../../../redux/store";
import Cargando from "../../../../componente/cargando/cargando";
import Botonera from "../../../../componente-estilo/botonera/botonera";
import Boton from "../../../../componente-estilo/boton/boton";
import Eliminar from '../../../../assets/deleted.svg?react'
import Atras from '../../../../assets/arrow.svg?react'
import { eliminarMensajeRedux } from "../../../../redux/state/mensaje.state";
import CartelExito from "../../../../componente/cartelExito/cartelExito";
import useMensajeApi from "../../../../servicio/mensaje/useMensajeApi";

const EliminarMensaje = () => {
  const mensaje: MensajeProp | undefined = useSelector((store: appStore) => store.mensaje.datoSeleccionado);
  const { eliminarMensaje, responseMensaje, errorFetchMensaje, loadingMensaje } = useMensajeApi();
  const { setModal } = useModalContext();
  const dispatch = useDispatch();

  // La baja es fisica: el back DELETE borra la fila (no hay deleted).
  const eliminarMensajeDelRedux = () => {
    if (mensaje)
      dispatch(eliminarMensajeRedux(mensaje.id));
    setModal(false);
  }

  if (loadingMensaje || !mensaje) return <Cargando />
  if (errorFetchMensaje) return <Texto texto={errorFetchMensaje} error chica />
  if (responseMensaje) return <CartelExito mensaje={`El mensaje ---[ ${mensaje.nombre} ]--- fue eliminado con exito`} onCerrar={eliminarMensajeDelRedux} delay={3000} />

  return (
    <div>
      <div className="eliminar-libro">
        <Texto texto={`Seguro que desea eliminar el mensaje`} centrado mediana />
        <Texto texto={`---[ ${mensaje.nombre} ]---`} chica centrado />
        <Botonera>
          <Boton icono={<Atras />} secundario onClick={() => setModal(false)} nuevoEstilo='btn-icono-mediano' titulo="Atras" />
          <Boton icono={<Eliminar />} onClick={() => eliminarMensaje(mensaje.id)} nuevoEstilo='btn-icono-mediano' titulo="Eliminar mensaje" />
        </Botonera>
      </div>
    </div>
  )
}

export default EliminarMensaje
