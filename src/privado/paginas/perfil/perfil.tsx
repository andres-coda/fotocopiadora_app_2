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
import PerfilDatosUsuario from "./componente/perfilDatosUsuario";
import PerfilDatosEmpresa from "./componente/perfilDatosEmpresa";
import PerfilUsuarios from "./componente/perfilUsuarios";
import PerfilLogout from "./componente/perfilLogout";
import UsuarioEditar from "./cargar/usuarioEditar";
import EmpresaEditar from "./cargar/empresaEditar";
import UsuarioCargar from "./cargar/usuarioCargar";
import EliminarUsuario from "./componente/eliminarUsuario";
import { resetSeleccionarUsuario } from "../../../redux/state/usuarios.state";
import './perfil.css'

const Perfil = () => {
  const { usuarioSesion, cargando, error } = useSesion();
  const { obtenerEmpresaMia, responseEmpresa, loadingEmpresa, errorFetchEmpresa } = useEmpresaApi();
  const { modal, setModal } = useModalContext();
  const [modalUsuario, setModalUsuario] = useState<boolean>(false);
  const [modalEmpresa, setModalEmpresa] = useState<boolean>(false);
  const [modalUsuarioCargar, setModalUsuarioCargar] = useState<boolean>(false);
  const [modalUsuarioEliminar, setModalUsuarioEliminar] = useState<boolean>(false);
  const [empresa, setEmpresa] = useState<EmpresaProp | null>(null);
  const dispatch = useDispatch();

  // Solo admin y super_admin pueden administrar usuarios (regla de RLS del back).
  const esAdmin = usuarioSesion?.role === 'admin' || usuarioSesion?.role === 'super_admin';

  useEffect(() => {
    // /empresa/mia deduce la empresa del token: no hay id que esperar.
    obtenerEmpresaMia();
  }, []);

  useEffect(() => {
    if (responseEmpresa) setEmpresa(responseEmpresa);
  }, [responseEmpresa]);

  useEffect(() => {
    if (!modal) {
      setModalUsuario(false);
      setModalEmpresa(false);
      setModalUsuarioCargar(false);
      setModalUsuarioEliminar(false);
      dispatch(resetSeleccionarUsuario());
    }
  }, [modal]);

  // Caso borde: un super_admin no tiene empresa (id_empresa NULL). El back
  // responde 404 (o falla) y no hay que romper la pagina.
  const sinEmpresa = !loadingEmpresa && !!errorFetchEmpresa
    && (errorFetchEmpresa.includes('404') || usuarioSesion?.role === 'super_admin');

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

        {/* Corte 3: aca va la seccion "Configuraciones" (perfilConfiguraciones.tsx) */}

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
      </Modal>
    </>
  )
}

export default Perfil;
