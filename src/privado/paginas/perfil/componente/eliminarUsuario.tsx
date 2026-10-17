import { useDispatch, useSelector } from "react-redux";
import Texto from "../../../../componente-estilo/texto/texto"
import { useModalContext } from "../../../../contexto/contextoModal";
import { usuarioProps } from "../../../../modelo/usuario/Usuario.interface";
import { appStore } from "../../../../redux/store";
import Cargando from "../../../../componente/cargando/cargando";
import Botonera from "../../../../componente-estilo/botonera/botonera";
import Boton from "../../../../componente-estilo/boton/boton";
import Eliminar from '../../../../assets/deleted.svg?react'
import Atras from '../../../../assets/arrow.svg?react'
import { eliminarUsuarioRedux } from "../../../../redux/state/usuarios.state";
import CartelExito from "../../../../componente/cartelExito/cartelExito";
import useUsuarioApi from "../../../../servicio/usuario/useUsuarioApi";

const EliminarUsuario = () => {
  const usuario: usuarioProps | undefined = useSelector((store: appStore) => store.usuarios.datoSeleccionado);
  const { eliminarUsuario, responseUsuario, errorFetchUsuario, loadingUsuario } = useUsuarioApi();
  const { setModal } = useModalContext();
  const dispatch = useDispatch();

  // La baja es logica: el back setea deleted = true (no se borra fisicamente).
  const eliminarUsuarioDelRedux = () => {
    if (usuario)
      dispatch(eliminarUsuarioRedux(usuario.id));
    setModal(false);
  }

  if (loadingUsuario || !usuario) return <Cargando />
  if (errorFetchUsuario) return <Texto texto={errorFetchUsuario} error chica />
  if (responseUsuario) return <CartelExito mensaje={`El usuario ---[ ${usuario.nombre} ]--- fue eliminado con exito`} onCerrar={eliminarUsuarioDelRedux} delay={3000} />

  return (
    <div>
      <div className="eliminar-libro">
        <Texto texto={`Seguro que desea eliminar el usuario`} centrado mediana />
        <Texto texto={`---[ ${usuario.nombre} ]---`} chica centrado />
        <Botonera>
          <Boton icono={<Atras />} secundario onClick={() => setModal(false)} nuevoEstilo='btn-icono-mediano' titulo="Atras" />
          <Boton icono={<Eliminar />} onClick={() => eliminarUsuario(usuario.id)} nuevoEstilo='btn-icono-mediano' titulo="Eliminar usuario" />
        </Botonera>
      </div>
    </div>
  )
}

export default EliminarUsuario
