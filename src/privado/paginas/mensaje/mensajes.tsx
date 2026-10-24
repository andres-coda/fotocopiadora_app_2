import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxProp } from '../../../redux/modelo/reduxContext.interface';
import { MensajeProp } from '../../../modelo/Entidades/mensaje/mensaje.interface';
import { appStore } from '../../../redux/store';
import BuscadorPaginadoCompleto from '../../../componente/buscador/buscadorPaginadoCompleto';
import Centro from '../../../componente-estilo/centro/centro';
import Texto from '../../../componente-estilo/texto/texto';
import TextoVacio from '../../../componente/Textos/textoVacio';
import Cargando from '../../../componente/cargando/cargando';
import Modal from '../../../componente/modal/modal';
import useMensajesApi from '../../../servicio/mensaje/useMensajesApi';
import useBusquedaPaginada from '../../../hooks/buscador/useBusquedaPaginada';
import { useModalContext } from '../../../contexto/contextoModal';
import {
  agregarMensajesBusquedaActual,
  crearBusquedaMensaje,
  resetBusquedaMensaje,
  resetSeleccionarMensaje,
} from '../../../redux/state/mensaje.state';
import MensajeCard from './componente/mensajeCard';
import MensajeCargar from './cargar/mensajeCargar';
import './mensajes.css';

const Mensajes = () => {
  const mensajeDatos: ReduxProp<MensajeProp> = useSelector((store: appStore) => store.mensaje);
  const usuario = useSelector((store: appStore) => store.sesion.usuario);
  const { obtenerMensajesBusqueda, responseMensajes, loadingMensajes, errorFetchMensajes } =
    useMensajesApi();
  const { modal } = useModalContext();
  const dispatch = useDispatch();
  const [valor, setValor] = useState<string>('');

  // POST y PUT de mensaje estan detras de AdminGuard: el alta y la edicion solo
  // se ofrecen a admin.
  const esAdmin = usuario?.role === 'admin' || usuario?.role === 'super_admin';

  // Al cerrar el modal se limpia la seleccion, si no el formulario reabre en
  // modo edicion.
  useEffect(() => {
    if (!modal) dispatch(resetSeleccionarMensaje());
  }, [modal]);

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

  const { datosQuery: mensajes, pagina, limite, total } = mensajeDatos.busquedaActual;
  const hayMas = pagina * limite < total;

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
      <Centro ref={contenedorRef} nuevoEstilo="centro-mensaje">
        {errorFetchMensajes && <Texto texto={errorFetchMensajes} error chica />}
        {mensajes.length > 0 ? (
          mensajes.map(mensaje => (
            <MensajeCard mensaje={mensaje} key={mensaje.id} puedeEditar={esAdmin} />
          ))
        ) : loadingMensajes ? (
          <Cargando />
        ) : (
          <TextoVacio entidad="mensajes" filtro={valor.length >= 3} />
        )}
        <div ref={finListaRef} className="mensajes-pie" style={{ gridColumn: '1 / -1' }}>
          {loadingMensajes && mensajes.length > 0 && <Cargando />}
          {!loadingMensajes && !hayMas && mensajes.length > 0 && (
            <Texto texto="Fin de la lista" chica sombra centrado />
          )}
        </div>
      </Centro>
      <Modal nuevoEstilo="modal-ancho">
        <MensajeCargar />
      </Modal>
    </>
  );
};

export default Mensajes;
