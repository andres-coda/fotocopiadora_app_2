import { useDispatch } from 'react-redux';
import Card from '../../../componente-estilo/card/card';
import Texto from '../../../componente-estilo/texto/texto';
import { SolicitudProp } from '../../../modelo/Entidades/solicitud/solicitud.interface';
import { estadoSolicitudTexto } from '../../../utils/solicitud';
import {
  resetSeleccionarSolicitud,
  seleccionarSolicitud,
} from '../../../redux/state/solicitud.state';
import { fechaParaInput, invertirFecha } from '../../../utils/calendario';
import './cardSolicitud.css';
import { useModalContext } from '../../../contexto/contextoModal';
import { useEffect } from 'react';

interface Props {
  solicitud: SolicitudProp;
}

const SolicitudCard = ({ solicitud }: Props) => {
  const dispatch = useDispatch();
  const { modal, setModal } = useModalContext();
  
  useEffect(() => {
    if (!modal) dispatch(resetSeleccionarSolicitud());
  }, [modal]);

  return (
    <Card
      retirado={solicitud.estado === 2 ? true : false}
      pendiente={solicitud.estado === 1 ? true : false}
      cancelado={solicitud.estado === 3 ? true : false}
      notaMargenSup={solicitud.idEmpresa}
      tituloCard={estadoSolicitudTexto(solicitud.estado)}
      onClick={() => {
        (dispatch(seleccionarSolicitud(solicitud)), setModal(true));
      }}
      nuevoEstilo="card-solicitud"
    >
      <Texto texto={solicitud.nombreLibro} negrita centrado />
      <Texto textoResaltado="Solicitado por: " texto={solicitud.nombreUsuario} chica inline />

      <div className="card-horizontal">
        <Texto texto={`Creada: ${invertirFecha(fechaParaInput(solicitud.fechaCreacion))}`} chica />
        <Texto
          texto={`Resuelta: ${solicitud.fechaResolucion ? invertirFecha(fechaParaInput(solicitud.fechaCreacion)) : 'No resuelta'}`}
          chica
        />
      </div>
    </Card>
  );
};

export default SolicitudCard;
