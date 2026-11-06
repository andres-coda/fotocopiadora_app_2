import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Texto from '../../componente-estilo/texto/texto';
import { ContenedorCentro } from '../../componente-estilo/centro/centroExterior';
import useSolicitudesApi from '../../servicio/solicitud/useSolicitudesApi';
import { RutasSupers, rutaSuperBase } from '../ruta/rutaSupers';

const Solicitudes = () => {
  const navigate = useNavigate();
  // valor state removed (unused).
  const {
    obtenerSolicitudes,
    responseSolicitudes,
    loadingSolicitudes,
    errorSolicitudes,
  } = useSolicitudesApi();

  useEffect(() => {
    obtenerSolicitudes({ limite: 20, pagina: 1 });
  }, []);

  const solicitudes = (responseSolicitudes as any)?.datos ?? [];

  const estadoTexto = (e: number) => {
    if (e === 1) return 'Pendiente';
    if (e === 2) return 'Aceptada';
    if (e === 3) return 'Rechazada';
    return 'Desconocido';
  };

  return (
    <ContenedorCentro loading={loadingSolicitudes} error={errorSolicitudes ?? undefined}>
      <div style={{ padding: '1rem' }}>
        <Texto texto="Solicitudes de edición de libros" mediana negrita />
      </div>
      {solicitudes.map((s: any) => (
        <div
          key={s.id}
          style={{ padding: '0.5rem', borderBottom: '1px solid #ccc', cursor: 'pointer' }}
          onClick={() => navigate(`/${rutaSuperBase.SUPER}/${RutasSupers.SOLICITUD_DETALLE}/${s.id}`)}
        >
          <Texto texto={s.nombreLibro} negrita />
          <Texto texto={`Por: ${s.nombreUsuario}`} chica />
          <Texto texto={`Estado: ${estadoTexto(s.estado)}`} chica />
          <Texto texto={new Date(s.fechaCreacion).toLocaleDateString()} chica />
        </div>
      ))}
      {solicitudes.length === 0 && !loadingSolicitudes && <Texto texto="Sin solicitudes" />}
    </ContenedorCentro>
  );
};

export default Solicitudes;