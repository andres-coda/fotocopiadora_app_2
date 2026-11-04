import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appStore } from '../../../redux/store';
import Texto from '../../../componente-estilo/texto/texto';
import Modal from '../../../componente/modal/modal';
import { useModalContext } from '../../../contexto/contextoModal';
import EmpresaEditar from './cargar/empresaEditar';
import ConfiguracionEditar from './cargar/configuracionEditar';
import PerfilEditar from './cargar/perfilEditar';
import UsuarioCrear from './cargar/usuarioCrear';
import { CampoConfig } from '../../../modelo/Entidades/configuracion/configuracionCampo.interface';
import PerfilEmpresa from './componente/perfilEmpresa';
import CardPerfil from './componente/cardPerfil';
import DesplegableArrow from '../../../componente-estilo/desplegable/desplegableArrow';
import Configuracion from './componente/configuracion';
import UsuariosEmpresa from './componente/usuariosEmpresa';
import EliminarUsuario from './componente/eliminarUsuario';
import { setMiEmpresa } from '../../../redux/state/miEmpresa.state';
import './perfil.css';
import { ContenedorCentro } from '../../../componente-estilo/centro/centroExterior';

const Perfil = () => {
  // El perfil y la empresa ya vienen cargados por CargarDatosIniciales.
  const usuarioSesion = useSelector((store: appStore) => store.sesion);
  const miEmpresa = useSelector((store: appStore) => store.miEmpresa);
  const { modal, setModal } = useModalContext();
  const [modalEmpresa, setModalEmpresa] = useState<boolean>(false);
  const [modalPerfil, setModalPerfil] = useState<boolean>(false);
  const [modalUsuario, setModalUsuario] = useState<boolean>(false);
  const [eliminarUsuario, setEliminarUsuario] = useState<boolean>(false);
  const [campoConfig, setCampoConfig] = useState<CampoConfig | null>(null);
  // Sube cuando el alta de usuario confirma: obliga a refrescar el listado.
  const dispatch = useDispatch();

  useEffect(() => {
    // Al cerrarse el modal se descarta cualquier contenido pendiente.
    if (!modal) {
      setModalEmpresa(false);
      setModalPerfil(false);
      setModalUsuario(false);
      setEliminarUsuario(false);
      setCampoConfig(null);
    }
  }, [modal]);

  // Un solo modal por pagina: se elige el contenido antes de abrirlo.
  const abrirEmpresa = () => {
    setCampoConfig(null);
    setModalPerfil(false);
    setModalUsuario(false);
    setModalEmpresa(true);
    setModal(true);
  };

  const abrirConfiguracion = (campo: CampoConfig) => {
    setModalEmpresa(false);
    setModalPerfil(false);
    setModalUsuario(false);
    setCampoConfig(campo);
    setModal(true);
  };

  const abrirPerfil = () => {
    setModalEmpresa(false);
    setCampoConfig(null);
    setModalUsuario(false);
    setModalPerfil(true);
    setModal(true);
  };

  const abrirUsuario = () => {
    setModalEmpresa(false);
    setCampoConfig(null);
    setModalPerfil(false);
    setModalUsuario(true);
    setModal(true);
  };

  // Sin empresa: la peticion ya se disparo, termino y no hay empresa ni error.
  // Cubre tanto a un super_admin como al 404 de GET /empresa/mia.
  return (
    <>
      <ContenedorCentro
        loading={usuarioSesion.loading || miEmpresa.loading}
        error={usuarioSesion.error || miEmpresa.error}
        nuevoEstilo="perfil-centro"
      >
        {!miEmpresa.loading &&
          miEmpresa.dato &&
          !miEmpresa.error &&
          usuarioSesion.dato && (
            <>
              <PerfilEmpresa empresa={miEmpresa.dato} onEditarEmpresa={abrirEmpresa} />
              <Texto texto="Sesión actual" mediana negrita />
              <CardPerfil usuario={usuarioSesion.dato} onEditarPerfil={abrirPerfil} />

              <DesplegableArrow titulo="Configuraciones" verde>
                <Configuracion
                  configuracion={miEmpresa.dato.configuracion}
                  onEditarCampo={abrirConfiguracion}
                />
              </DesplegableArrow>
              {usuarioSesion.dato.role === 'admin' && (
                <UsuariosEmpresa
                  onAgregarUsuario={abrirUsuario}
                  onEliminarUsuario={setEliminarUsuario}
                />
              )}
            </>
          )}
      </ContenedorCentro>

      <Modal>
        {eliminarUsuario && <EliminarUsuario />}
        {modalEmpresa && miEmpresa.dato && (
          <EmpresaEditar
            empresa={miEmpresa.dato}
            onActualizar={e =>
              dispatch(
                setMiEmpresa({
                  ...e,
                  configuracion: e.configuracion ?? miEmpresa.dato?.configuracion,
                })
              )
            }
          />
        )}
        {!modalEmpresa && campoConfig && miEmpresa.dato && (
          <ConfiguracionEditar
            campo={campoConfig}
            configuracion={miEmpresa.dato?.configuracion}
            onCerrar={() => setModal(false)}
          />
        )}
        {!modalEmpresa && !campoConfig && modalPerfil && <PerfilEditar />}
        {!modalEmpresa && !campoConfig && !modalPerfil && modalUsuario && <UsuarioCrear />}
      </Modal>
    </>
  );
};

export default Perfil;
