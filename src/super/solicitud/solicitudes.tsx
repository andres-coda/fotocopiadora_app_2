import useSolicitudesApi from '../../servicio/solicitud/useSolicitudesApi';
import Centro from '../../componente-estilo/centro/centro';
import { SolicitudProp } from '../../modelo/Entidades/solicitud/solicitud.interface';
import { ReduxProp } from '../../redux/modelo/reduxContext.interface';
import { useSelector } from 'react-redux';
import { appStore } from '../../redux/store';
import { useEffect, useState } from 'react';
import useBusquedaPaginada from '../../hooks/buscador/useBusquedaPaginada';
import {
  agregarSolicitudesBusquedaActual,
  crearBusquedaSolicitud,
  crearSolicitudes,
  resetBusquedaSolicitud,
} from '../../redux/state/solicitud.state';
import BuscadorPaginadoCompleto from '../../componente/buscador/buscadorPaginadoCompleto';
import SolicitudCard from './componente/solicitudCard';
import Modal from '../../componente/modal/modal';
import SolicitudDetalle from './solicitudDetalle';

const Solicitudes = () => {
  const solicitudRedux: ReduxProp<SolicitudProp> = useSelector(
    (store: appStore) => store.solicitud
  );

  const { obtenerSolicitudes, responseSolicitudes, loadingSolicitudes, errorSolicitudes } =
    useSolicitudesApi();

  const [valor, setValor] = useState<string>('');

  const { contenedorRef, finListaRef } = useBusquedaPaginada<SolicitudProp>({
    valor,
    datosRedux: solicitudRedux,
    crearBusquedaInicial: crearSolicitudes,
    resetBusqueda: resetBusquedaSolicitud,
    crearBusqueda: crearBusquedaSolicitud,
    obtenerBusqueda: obtenerSolicitudes,
    agregarBusqueda: agregarSolicitudesBusquedaActual,
    response: responseSolicitudes,
    loading: loadingSolicitudes,
  });

  return (
    <>
      <BuscadorPaginadoCompleto
        ref={contenedorRef}
        texto="Buscar solicitud"
        valor={valor}
        setValor={setValor}
        titulo="Lista de solicitudes de edición de libros"
        etiquetaArriba="Al comienzo de la lista"
        etiquetaMas="Nueva solicitud"
      />
      <Centro
        ref={contenedorRef}
        finListaRef={finListaRef}
        vacio={
          solicitudRedux.cargaInicial &&
          (!solicitudRedux.busquedaActual.datosQuery ||
            solicitudRedux.busquedaActual.datosQuery.length === 0)
        }
        entidad="solicitudes"
        query={valor}
        loading={loadingSolicitudes}
        error={errorSolicitudes ?? undefined}
      >
        {solicitudRedux.busquedaActual.datosQuery.map((s) => 
          <SolicitudCard solicitud={s} key={s.id} />
        )}
      </Centro>
      <Modal>
        <SolicitudDetalle solicitud={solicitudRedux.datoSeleccionado}/>
      </Modal>
    </>
  );
};

export default Solicitudes;
