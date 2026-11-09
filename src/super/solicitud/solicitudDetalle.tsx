import Texto from '../../componente-estilo/texto/texto';
import { ContenedorCentro } from '../../componente-estilo/centro/centroExterior';
import { SolicitudProp } from '../../modelo/Entidades/solicitud/solicitud.interface';
import SolicitudCard from './componente/solicitudCard';
import PeticionCard from './componente/peticionCard';
import useSolicitudApi from '../../servicio/solicitud/useSolicitudApi';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { seleccionarSolicitud } from '../../redux/state/solicitud.state';

interface Props {
  solicitud?: SolicitudProp;
}

const SolicitudDetalle = ({ solicitud }: Props) => {
  const dispatch = useDispatch();
  const {obtenerSolicitud, responseSolicitud, errorFethcSolicitud, loadingSolicitud} = useSolicitudApi()

  useEffect(()=>{
    if(solicitud) obtenerSolicitud(solicitud.id);
  },[])

  useEffect(()=>{
    if(responseSolicitud) dispatch(seleccionarSolicitud(responseSolicitud));
  },[responseSolicitud])

  if (!solicitud) return <Texto texto="No hay solicitud seleccionada" />;

  return (
    <ContenedorCentro loading={loadingSolicitud} error={errorFethcSolicitud}>
      <SolicitudCard solicitud={solicitud}/>
      {solicitud.peticiones.map(p=> <PeticionCard peticion={p} key={p.id}/>)}
    </ContenedorCentro>
  );
};

export default SolicitudDetalle;
