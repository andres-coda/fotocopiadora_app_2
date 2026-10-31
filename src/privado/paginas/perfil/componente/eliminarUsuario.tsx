import { useSelector } from "react-redux";
import EliminarElemento from "../../../../componente-estilo/eliminar/eliminarElemento";
import { usuarioProps } from "../../../../modelo/usuario/Usuario.interface";
import { appStore } from "../../../../redux/store";
import useUsuarioDeleteApi from "../../../../servicio/usuario/useUsuarioDeleteApi";
import { eliminarUsuarioRedux } from "../../../../redux/state/usuarios.state";

const tituloEliminarUsuario = 'Eliminar trabajador';

const volantaEliminarUsuario = (usuario: string | undefined): string | undefined => {
  if (!usuario || usuario === '') return undefined;
  return `¿Desea confirmar la eliminación del trabajador ---[ ${usuario} ]--- ?`;
};

const textoEliminarUsuario = (usuario: string | undefined): string | undefined => {
  if (!usuario || usuario === '') return undefined;
  return `Al eliminar el trabajador ---[ ${usuario} ]--- también se borrara el acceso al sistema de ese usuario`;
};

const msjExitoEliminarUsuario = (usuario: string | undefined): string | undefined => {
  if (!usuario || usuario === '') return undefined;
  return `El usuario ---[ ${usuario} ]--- fue eliminado con exito`;
};


const EliminarUsuario = () => {
  const usuario: usuarioProps | undefined = useSelector(
    (store: appStore) => store.usuario.datoSeleccionado
  );
  const {
    eliminarUsuario: eliminar,
    responseUsuario,
    errorFetchUsuario,
    loadingUsuario,
  } = useUsuarioDeleteApi();

  return (
    <EliminarElemento
      titulo={tituloEliminarUsuario}
      volanta={volantaEliminarUsuario(usuario?.nombre)}
      entidad="usuario"
      texto={textoEliminarUsuario(usuario?.nombre)}
      msjExito={msjExitoEliminarUsuario(usuario?.nombre)}
      eliminarElemento={eliminar}
      loading={loadingUsuario}
      errorFetch={errorFetchUsuario}
      response={responseUsuario}
      elemento={usuario}
      eliminarElementoRedux={eliminarUsuarioRedux}
    />
  );
};

export default EliminarUsuario;
