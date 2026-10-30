import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appStore } from '../../../redux/store';
import { setEmpresa } from '../../../redux/state/empresa.state';
import Centro from '../../../componente-estilo/centro/centro';
import Texto from '../../../componente-estilo/texto/texto';
import Cargando from '../../../componente/cargando/cargando';
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
import './perfil.css';
import EliminarPrecio from '../precio/componente/eliminarPrecio';
import EliminarElemento from '../../../componente-estilo/eliminar/eliminarElemento';

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
  const [modalPerfil, setModalPerfil] = useState<boolean>(false);
  const [modalUsuario, setModalUsuario] = useState<boolean>(false);
  const [eliminarUsuario, setEliminarUsuario] = useState<string | undefined>(undefined);
  const [campoConfig, setCampoConfig] = useState<CampoConfig | null>(null);
  // Sube cuando el alta de usuario confirma: obliga a refrescar el listado.
  const [usuariosVersion, setUsuariosVersion] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    // Al cerrarse el modal se descarta cualquier contenido pendiente.
    if (!modal) {
      setModalEmpresa(false);
      setModalPerfil(false);
      setModalUsuario(false);
      setEliminarUsuario(undefined);
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

  const esAdmin = usuarioSesion.role === 'admin' || usuarioSesion.role === 'super_admin';

  return (
    <>
      <Centro nuevoEstilo="perfil-centro">
        {cargandoEmpresa && <Cargando />}
        {!cargandoEmpresa && !sinEmpresa && errorEmpresa && (
          <Texto texto={errorEmpresa} error chica />
        )}
        {!cargandoEmpresa && !sinEmpresa && !errorEmpresa && empresa && (
          <>
            <PerfilEmpresa empresa={empresa} onEditarEmpresa={abrirEmpresa} />
            <Texto texto="Sesión actual" mediana negrita />
            <CardPerfil usuario={usuarioSesion} onEditarPerfil={abrirPerfil} />

            <DesplegableArrow titulo="Configuraciones" verde>
              <Configuracion
                configuracion={empresa.configuracion}
                onEditarCampo={abrirConfiguracion}
              />
            </DesplegableArrow>
            {esAdmin && (
              <DesplegableArrow titulo="Listas de trabajadores" verde>
                <UsuariosEmpresa version={usuariosVersion} onAgregarUsuario={abrirUsuario} setEliminarUsuario={setEliminarUsuario}/>
              </DesplegableArrow>
            )}
          </>
        )}
      </Centro>

      <Modal>
        {eliminarUsuario && (
          <>
          {/* <EliminarElemento 
            texto={`usuario`}
            articulo='El'
            entidad='trabajador'
            eliminarElemento={}
            /> */}
            </>
        )}
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
        {!modalEmpresa && !campoConfig && modalPerfil && <PerfilEditar />}
        {!modalEmpresa && !campoConfig && !modalPerfil && modalUsuario && (
          <UsuarioCrear onCreado={() => setUsuariosVersion(v => v + 1)} />
        )}
      </Modal>
    </>
  );
};

export default Perfil;
