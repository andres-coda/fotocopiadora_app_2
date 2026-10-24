import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appStore } from '../../../redux/store';
import { setEmpresa } from '../../../redux/state/empresa.state';
import Centro from '../../../componente-estilo/centro/centro';
import Texto from '../../../componente-estilo/texto/texto';
import Cargando from '../../../componente/cargando/cargando';
import Modal from '../../../componente/modal/modal';
import { useModalContext } from '../../../contexto/contextoModal';
import PerfilDatosEmpresa from './componente/perfilDatosEmpresa';
import EmpresaEditar from './cargar/empresaEditar';
import ConfiguracionEditar from './cargar/configuracionEditar';
import { CampoConfig } from '../../../modelo/Entidades/configuracion/configuracionCampo.interface';
import './perfil.css';

const Perfil = () => {
  // El perfil y la empresa ya vienen cargados por CargarDatosIniciales.
  const usuarioSesion = useSelector((store: appStore) => store.sesion.usuario);
  const cargando = useSelector((store: appStore) => store.sesion.cargando);
  const error = useSelector((store: appStore) => store.sesion.error);
  const empresa = useSelector((store: appStore) => store.empresa.empresa);
  const cargandoEmpresa = useSelector((store: appStore) => store.empresa.cargando);
  const errorEmpresa = useSelector((store: appStore) => store.empresa.error);
  const solicitadaEmpresa = useSelector((store: appStore) => store.empresa.solicitada);
  const { modal, setModal } = useModalContext();
  const [modalEmpresa, setModalEmpresa] = useState<boolean>(false);
  const [campoConfig, setCampoConfig] = useState<CampoConfig | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Al cerrarse el modal se descarta cualquier contenido pendiente.
    if (!modal) {
      setModalEmpresa(false);
      setCampoConfig(null);
    }
  }, [modal]);

  // Un solo modal por página: se elige el contenido antes de abrirlo.
  const abrirEmpresa = () => {
    setCampoConfig(null);
    setModalEmpresa(true);
    setModal(true);
  };

  const abrirConfiguracion = (campo: CampoConfig) => {
    setModalEmpresa(false);
    setCampoConfig(campo);
    setModal(true);
  };

  // Sin empresa: la peticion ya se disparo, termino y no hay empresa ni error.
  // Cubre tanto a un super_admin como al 404 de GET /empresa/mia.
  const sinEmpresa = solicitadaEmpresa && !cargandoEmpresa && !errorEmpresa && empresa === null;

  if (error)
    return (
      <Centro>
        <Texto texto={error} error />
      </Centro>
    );
  if (cargando || !usuarioSesion)
    return (
      <Centro>
        <Cargando />
      </Centro>
    );

  return (
    <>
      <Centro nuevoEstilo="perfil-centro">
        {cargandoEmpresa && <Cargando />}
        {!cargandoEmpresa && sinEmpresa && <Texto texto="Sin empresa asociada" mediana centrado />}
        {!cargandoEmpresa && !sinEmpresa && errorEmpresa && (
          <Texto texto={errorEmpresa} error chica />
        )}
        {!cargandoEmpresa && !sinEmpresa && !errorEmpresa && empresa && (
          <PerfilDatosEmpresa
            empresa={empresa}
            onEditar={abrirEmpresa}
            onEditarConfiguracion={abrirConfiguracion}
            usuario={usuarioSesion}
          />
        )}
      </Centro>

      <Modal>
        {modalEmpresa && empresa && (
          <EmpresaEditar
            empresa={empresa}
            onActualizar={e =>
              dispatch(
                setEmpresa({ ...e, configuracion: e.configuracion ?? empresa.configuracion })
              )
            }
          />
        )}
        {!modalEmpresa && campoConfig && empresa && (
          <ConfiguracionEditar
            campo={campoConfig}
            configuracion={empresa.configuracion}
            onCerrar={() => setModal(false)}
          />
        )}
      </Modal>
    </>
  );
};

export default Perfil;
