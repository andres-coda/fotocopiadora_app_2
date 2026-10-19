import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Centro from "../../../componente-estilo/centro/centro";
import Card from "../../../componente-estilo/card/card";
import Titulo from "../../../componente-estilo/texto/titulo";
import Texto from "../../../componente-estilo/texto/texto";
import Cargando from "../../../componente/cargando/cargando";
import Modal from "../../../componente/modal/modal";
import { useModalContext } from "../../../contexto/contextoModal";
import { useSesion } from "../../../hooks/sesion/useSesion";
import useEmpresaApi from "../../../servicio/empresa/useEmpresaApi";
import { EmpresaProp } from "../../../modelo/Entidades/empresa/empresa.interface";
import { ConfiguracionProp } from "../../../modelo/Entidades/configuracion/configuracion.interface";
import PerfilDatosUsuario from "./componente/perfilDatosUsuario";
import PerfilDatosEmpresa from "./componente/perfilDatosEmpresa";
import PerfilUsuarios from "./componente/perfilUsuarios";
import PerfilConfiguraciones from "./componente/perfilConfiguraciones";
import PerfilMensajes from "./componente/perfilMensajes";
import PerfilDatosCobro from "./componente/perfilDatosCobro";
import PerfilLogout from "./componente/perfilLogout";
import UsuarioEditar from "./cargar/usuarioEditar";
import EmpresaEditar from "./cargar/empresaEditar";
import ConfiguracionEditar from "./cargar/configuracionEditar";
import UsuarioCargar from "./cargar/usuarioCargar";
import MensajeCargar from "./cargar/mensajeCargar";
import DatoCobroCargar from "./cargar/datoCobroCargar";
import EliminarUsuario from "./componente/eliminarUsuario";
import EliminarMensaje from "./componente/eliminarMensaje";
import EliminarDatoCobro from "./componente/eliminarDatoCobro";
import { resetSeleccionarUsuario } from "../../../redux/state/usuarios.state";
import { resetSeleccionarMensaje } from "../../../redux/state/mensaje.state";
import { DatoCobroProp } from "../../../modelo/Entidades/dato_cobro/datoCobro.interface";
import './perfil.css'

const Perfil = () => {
  const { usuarioSesion, cargando, error } = useSesion();
  const { obtenerEmpresaMia, responseEmpresa, loadingEmpresa, errorFetchEmpresa } = useEmpresaApi();
  const { modal, setModal } = useModalContext();
  const [modalUsuario, setModalUsuario] = useState<boolean>(false);
  const [modalEmpresa, setModalEmpresa] = useState<boolean>(false);
  const [modalUsuarioCargar, setModalUsuarioCargar] = useState<boolean>(false);
  const [modalUsuarioEliminar, setModalUsuarioEliminar] = useState<boolean>(false);
  const [modalConfiguracion, setModalConfiguracion] = useState<boolean>(false);
  const [modalMensajeCargar, setModalMensajeCargar] = useState<boolean>(false);
  const [modalMensajeEliminar, setModalMensajeEliminar] = useState<boolean>(false);
  const [modalDatoCobroCargar, setModalDatoCobroCargar] = useState<boolean>(false);
  const [modalDatoCobroEliminar, setModalDatoCobroEliminar] = useState<boolean>(false);
  const [datoCobroSeleccionado, setDatoCobroSeleccionado] = useState<DatoCobroProp | undefined>(undefined);
  const [empresa, setEmpresa] = useState<EmpresaProp | null>(null);
  const [configuracion, setConfiguracion] = useState<ConfiguracionProp | undefined>(empresa?.configuracion);
  const dispatch = useDispatch();

  // Solo admin y super_admin pueden administrar usuarios (regla de RLS del back).
  const esAdmin = usuarioSesion?.role === 'admin' || usuarioSesion?.role === 'super_admin';

  useEffect(() => {
    // /empresa/mia resuelve la empresa desde el token: el id no viaja en la URL.
    if (usuarioSesion?.idEmpresa) obtenerEmpresaMia();
  }, [usuarioSesion?.idEmpresa]);

  useEffect(() => {
    if (responseEmpresa) {
      setEmpresa(responseEmpresa);
      setConfiguracion(responseEmpresa.configuracion);
    }
  }, [responseEmpresa]);

  useEffect(() => {
    if (!modal) {
      setModalUsuario(false);
      setModalEmpresa(false);
      setModalUsuarioCargar(false);
      setModalUsuarioEliminar(false);
      setModalConfiguracion(false);
      setModalMensajeCargar(false);
      setModalMensajeEliminar(false);
      setModalDatoCobroCargar(false);
      setModalDatoCobroEliminar(false);
      dispatch(resetSeleccionarUsuario());
      dispatch(resetSeleccionarMensaje());
      setDatoCobroSeleccionado(undefined);
    }
  }, [modal]);

  // Caso borde: un super_admin no tiene empresa (id_empresa NULL). Sin id no
  // hay request; si el back responde 404 tampoco hay que romper la pagina.
  const sinEmpresa = !loadingEmpresa && (!usuarioSesion?.idEmpresa
    || usuarioSesion?.role === 'super_admin'
    || (!!errorFetchEmpresa && errorFetchEmpresa.includes('404')));

  if (error) return <Centro><Texto texto={error} error /></Centro>;
  if (cargando || !usuarioSesion) return <Centro><Cargando /></Centro>;

  return (
    <>
      <Centro>
        <Card nuevoEstilo="perfil-seccion">
          <Titulo titulo="Mis datos" />
          <PerfilDatosUsuario usuario={usuarioSesion} onEditar={() => { setModalUsuario(true); setModal(true); }} />
        </Card>

        <Card nuevoEstilo="perfil-seccion">
          <Titulo titulo="Datos de la empresa" />
          {loadingEmpresa && <Cargando />}
          {!loadingEmpresa && sinEmpresa && (
            <Texto texto="Sin empresa asociada" mediana centrado />
          )}
          {!loadingEmpresa && !sinEmpresa && errorFetchEmpresa && (
            <Texto texto={errorFetchEmpresa} error chica />
          )}
          {!loadingEmpresa && !sinEmpresa && !errorFetchEmpresa && empresa && (
            <PerfilDatosEmpresa empresa={empresa} onEditar={() => { setModalEmpresa(true); setModal(true); }} />
          )}
        </Card>

        {esAdmin && (
          <Card nuevoEstilo="perfil-seccion">
            <Titulo titulo="Usuarios" />
            <PerfilUsuarios
              esAdmin={esAdmin}
              usuarioActualId={usuarioSesion.id}
              onNuevo={() => { setModalUsuarioCargar(true); setModal(true); }}
              onEditar={() => setModalUsuarioCargar(true)}
              setEliminar={setModalUsuarioEliminar}
            />
          </Card>
        )}

        {!loadingEmpresa && !sinEmpresa && !errorFetchEmpresa && empresa && (
          <Card nuevoEstilo="perfil-seccion">
            <Titulo titulo="Configuraciones" />
            <PerfilConfiguraciones
              configuracion={configuracion}
              onEditar={() => { setModalConfiguracion(true); setModal(true); }}
            />
          </Card>
        )}

        <Card nuevoEstilo="perfil-seccion">
          <Titulo titulo="Mensajes" />
          <PerfilMensajes
            esAdmin={esAdmin}
            onNuevo={() => { setModalMensajeCargar(true); setModal(true); }}
            onEditar={() => setModalMensajeCargar(true)}
            setEliminar={setModalMensajeEliminar}
          />
        </Card>

        <Card nuevoEstilo="perfil-seccion">
          <Titulo titulo="Datos de cobro" />
          <PerfilDatosCobro
            esAdmin={esAdmin}
            onNuevo={() => { setDatoCobroSeleccionado(undefined); setModalDatoCobroCargar(true); setModal(true); }}
            onEditar={(datoSeleccionado) => { setDatoCobroSeleccionado(datoSeleccionado); setModalDatoCobroCargar(true); }}
            onEliminar={(datoSeleccionado) => { setDatoCobroSeleccionado(datoSeleccionado); setModalDatoCobroEliminar(true); }}
          />
        </Card>

        <Card nuevoEstilo="perfil-seccion">
          <Titulo titulo="Sesion" />
          <PerfilLogout />
        </Card>
      </Centro>

      <Modal>
        {modalUsuario && <UsuarioEditar />}
        {modalEmpresa && empresa && <EmpresaEditar empresa={empresa} onActualizar={setEmpresa} />}
        {modalUsuarioCargar && <UsuarioCargar />}
        {modalUsuarioEliminar && <EliminarUsuario />}
        {modalConfiguracion && <ConfiguracionEditar configuracion={configuracion} onActualizar={setConfiguracion} />}
        {modalMensajeCargar && <MensajeCargar />}
        {modalMensajeEliminar && <EliminarMensaje />}
        {modalDatoCobroCargar && <DatoCobroCargar datoCobro={datoCobroSeleccionado} />}
        {modalDatoCobroEliminar && <EliminarDatoCobro datoCobro={datoCobroSeleccionado} />}
      </Modal>
    </>
  )
}

export default Perfil;
