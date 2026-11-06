import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Texto from '../../componente-estilo/texto/texto';
import { ContenedorCentro } from '../../componente-estilo/centro/centroExterior';
import useSolicitudesApi from '../../servicio/solicitud/useSolicitudesApi';

const SolicitudDetalle = () => {
  const { id } = useParams();
  const [observaciones, setObservaciones] = useState<string>('');
  const [modalAbierto, setModalAbierto] = useState<boolean>(false);
  const [accion, setAccion] = useState<number>(2); // 2=aceptar, 3=rechazar

  const {
    obtenerSolicitud,
    responseSolicitud,
    loadingSolicitud,
    errorSolicitud,
    resolverSolicitud,
    responseResolver,
    loadingResolver,
    errorResolver,
  } = useSolicitudesApi();

  useEffect(() => {
    if (id) obtenerSolicitud(id);
  }, [id]);

  useEffect(() => {
    if (responseResolver) {
      setModalAbierto(false);
      obtenerSolicitud(id!);
    }
  }, [responseResolver]);

  const s = responseSolicitud as any;

  const estadoTexto = (e: number) => {
    if (e === 1) return 'Pendiente';
    if (e === 2) return 'Aceptada';
    if (e === 3) return 'Rechazada';
    return 'Desconocido';
  };

  const abrirModal = (est: number) => {
    setAccion(est);
    setObservaciones('');
    setModalAbierto(true);
  };

  const confirmar = () => {
    if (id) resolverSolicitud(id, accion, observaciones);
  };

  return (
    <ContenedorCentro loading={loadingSolicitud} error={errorSolicitud ?? undefined}>
      {s && (
        <div style={{ padding: '1rem' }}>
          <Texto texto={s.nombreLibro} mediana negrita />
          <Texto texto={`Por: ${s.nombreUsuario}`} chica />
          <Texto texto={`Estado: ${estadoTexto(s.estado)}`} chica />
          <Texto texto={`Fecha: ${new Date(s.fechaCreacion).toLocaleDateString()}`} chica />

          <div style={{ marginTop: '1rem' }}>
            <Texto texto="Peticiones (cambios solicitados)" negrita />
            {(s.peticiones ?? []).map((p: any) => (
              <div key={p.id} style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                <Texto texto={`Campo: ${p.campo}`} chica />
                <Texto texto={`Valor anterior: ${p.valorAnterior ?? '—'}`} chica />
                <Texto texto={`Valor nuevo: ${p.valorNuevo ?? '—'}`} chica />
                {p.observaciones && <Texto texto={`Obs: ${p.observaciones}`} chica />}
              </div>
            ))}
          </div>

          {s.estado === 1 && (
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button type="button" onClick={() => abrirModal(2)}>Aceptar</button>
              <button type="button" onClick={() => abrirModal(3)}>Rechazar</button>
            </div>
          )}

          {modalAbierto && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', minWidth: '300px' }}>
                <Texto texto={accion === 2 ? 'Aceptar solicitud' : 'Rechazar solicitud'} mediana negrita />
                <textarea
                  value={observaciones}
                  onChange={e => setObservaciones(e.target.value)}
                  placeholder="Observaciones (opcional)"
                  style={{ width: '100%', minHeight: '80px', marginTop: '0.5rem' }}
                />
                {errorResolver && <Texto texto={errorResolver} error chica />}
                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button type="button" onClick={confirmar} disabled={loadingResolver}>
                    {loadingResolver ? 'Procesando...' : 'Confirmar'}
                  </button>
                  <button type="button" onClick={() => setModalAbierto(false)}>Cancelar</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {!s && !loadingSolicitud && <Texto texto="Solicitud no encontrada" />}
    </ContenedorCentro>
  );
};

export default SolicitudDetalle;