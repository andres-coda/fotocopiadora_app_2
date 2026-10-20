import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appStore } from "../../../redux/store";
import { setConfiguracionEmpresa, setEmpresa } from "../../../redux/state/empresa.state";
import Centro from "../../../componente-estilo/centro/centro";
import Card from "../../../componente-estilo/card/card";
import Titulo from "../../../componente-estilo/texto/titulo";
import Texto from "../../../componente-estilo/texto/texto";
import Cargando from "../../../componente/cargando/cargando";
import Modal from "../../../componente/modal/modal";
import { useModalContext } from "../../../contexto/contextoModal";
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
  // El perfil y la empresa ya vienen cargados por CargarDatosIniciales.
  const usuarioSesion = useSelector((store: appStore) => store.sesion.usuario);
  const cargando = useSelector((store: appStore) => store.sesion.cargando);
  const error = useSelector((store: appStore) => store.sesion.error);
  const empresa = useSelector((store: appStore) => store.empresa.empresa);
  const cargandoEmpresa = useSelector((store: appStore) => store.empresa.cargando);
  const errorEmpresa = useSelector((store: appStore) => store.empresa.error);
  const solicitadaEmpresa = useSelector((store: appStore) => store.empresa.solicitada);
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
  const dispatch = useDispatch();

  const configuracion = empresa?.configuracion;

  // Solo admin y super_admin pueden administrar usuarios (regla de RLS del back).
  const esAdmin = usuarioSesion?.role === 'admin' || usuarioSesion?.role === 'super_admin';

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

  // Sin empresa: la peticion ya se disparo, termino y no hay empresa ni error.
  // Cubre tanto a un super_admin como al 404 de GET /empresa/mia.
  const sinEmpresa = solicitadaEmpresa && !cargandoEmpresa && !errorEmpresa && empresa === null;

  if (error) return <Centro><Texto texto={error} error /></Centro>;
  if (cargando || !usuarioSesion) return <Centro><Cargando /></Centro>;

  return (
    <>
      <Centro
        nuevoEstilo="perfil-centro"
      >
          {cargandoEmpresa && <Cargando />}
          {!cargandoEmpresa && sinEmpresa && (
            <Texto texto="Sin empresa asociada" mediana centrado />
          )}
          {!cargandoEmpresa && !sinEmpresa && errorEmpresa && (
            <Texto texto={errorEmpresa} error chica />
          )}
          {!cargandoEmpresa && !sinEmpresa && !errorEmpresa && empresa && (
            <PerfilDatosEmpresa empresa={empresa} onEditar={() => { setModalEmpresa(true); setModal(true); }} usuario={usuarioSesion}/>
          )}

        </Centro>

      <Modal>
        {modalUsuario && <UsuarioEditar />}
        {modalEmpresa && empresa && <EmpresaEditar empresa={empresa} onActualizar={(e) => dispatch(setEmpresa({ ...e, configuracion: e.configuracion ?? empresa.configuracion }))} />}
        {modalUsuarioCargar && <UsuarioCargar />}
        {modalUsuarioEliminar && <EliminarUsuario />}
        {modalConfiguracion && <ConfiguracionEditar configuracion={configuracion} onActualizar={(c) => dispatch(setConfiguracionEmpresa(c))} />}
        {modalMensajeCargar && <MensajeCargar />}
        {modalMensajeEliminar && <EliminarMensaje />}
        {modalDatoCobroCargar && <DatoCobroCargar datoCobro={datoCobroSeleccionado} />}
        {modalDatoCobroEliminar && <EliminarDatoCobro datoCobro={datoCobroSeleccionado} />}
      </Modal>
    </>
  )
}

export default Perfil;
