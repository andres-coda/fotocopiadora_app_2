import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxProp } from '../../../redux/modelo/reduxContext.interface';
import { MensajeProp } from '../../../modelo/Entidades/mensaje/mensaje.interface';
import { appStore } from '../../../redux/store';
import BuscadorPaginadoCompleto from '../../../componente/buscador/buscadorPaginadoCompleto';
import Centro from '../../../componente-estilo/centro/centro';
import Modal from '../../../componente/modal/modal';
import useMensajesApi from '../../../servicio/mensaje/useMensajesApi';
import useMensajeApi from '../../../servicio/mensaje/useMensajeApi';
import useBusquedaPaginada from '../../../hooks/buscador/useBusquedaPaginada';
import { useModalContext } from '../../../contexto/contextoModal';
import {
  actualizarMensajeRedux,
  agregarMensajesBusquedaActual,
  crearBusquedaMensaje,
  resetBusquedaMensaje,
  resetSeleccionarMensaje,
} from '../../../redux/state/mensaje.state';
import MensajeCard from './componente/mensajeCard';
import MensajeCargar from './cargar/mensajeCargar';
import EliminarMensaje from './componente/eliminarMensaje';
import './mensajes.css';

const Mensajes = () => {
  const mensajeDatos: ReduxProp<MensajeProp> = useSelector((store: appStore) => store.mensaje);
  const usuario = useSelector((store: appStore) => store.sesion.usuario);
  const { obtenerMensajesBusqueda, responseMensajes, loadingMensajes, errorFetchMensajes } =
    useMensajesApi();
  const { toggleFavorito, responseMensaje } = useMensajeApi();
  const { modal } = useModalContext();
  const dispatch = useDispatch();
  const [valor, setValor] = useState<string>('');
  const [eliminarMsj, setEliminarMsj] = useState<boolean>(false);

  // El alta y la edicion siguen detras de AdminGuard. El favorito es por
  // usuario, asi que esta disponible para cualquier usuario autenticado.
  const esAdmin = usuario?.role === 'admin' || usuario?.role === 'super_admin';

  // Al cerrar el modal se limpia la seleccion, si no el formulario reabre en
  // modo edicion.
  useEffect(() => {
    if (!modal) {
      dispatch(resetSeleccionarMensaje());
      setEliminarMsj(false);
    }
  }, [modal]);

  // Igual que en el modal: la lista se actualiza apenas el back confirma.
  useEffect(() => {
    if (responseMensaje) dispatch(actualizarMensajeRedux(responseMensaje));
  }, [responseMensaje]);

  const { contenedorRef, nuevoElemento, finListaRef } = useBusquedaPaginada<MensajeProp>({
    valor,
    datosRedux: mensajeDatos,
    resetBusqueda: resetBusquedaMensaje,
    crearBusqueda: crearBusquedaMensaje,
    obtenerBusqueda: obtenerMensajesBusqueda,
    agregarBusqueda: agregarMensajesBusquedaActual,
    response: responseMensajes,
    loading: loadingMensajes,
    sortBy: 'nombre' as keyof MensajeProp,
  });

  const handleToggleFavorito = (mensaje: MensajeProp) =>
    toggleFavorito(mensaje.id, !mensaje.favorito);

  return (
    <>
      <BuscadorPaginadoCompleto
        ref={contenedorRef}
        texto="Buscar mensaje"
        valor={valor}
        setValor={setValor}
        titulo="Mensajes"
        etiquetaArriba="Al comienzo de la lista"
        etiquetaMas="Nuevo mensaje"
        handleMas={esAdmin ? () => nuevoElemento() : undefined}
      />
      <Centro
        ref={contenedorRef}
        finListaRef={finListaRef}
        vacio={!mensajeDatos.busquedaActual.datosQuery || mensajeDatos.busquedaActual.datosQuery.length === 0}
        entidad="mensajes"
        query={valor}
        error={errorFetchMensajes ?? undefined}
        loading={loadingMensajes}
      >
        {mensajeDatos.busquedaActual.datosQuery.map(mensaje => (
          <MensajeCard
            mensaje={mensaje}
            key={mensaje.id}
            puedeEditar={esAdmin}
            onToggleFavorito={handleToggleFavorito}
            eliminarMensaje={setEliminarMsj}
          />
        ))}
      </Centro>
      <Modal nuevoEstilo="modal-ancho">
        {eliminarMsj && <EliminarMensaje />}
        {!eliminarMsj && <MensajeCargar />}
      </Modal>
    </>
  );
};

export default Mensajes;
