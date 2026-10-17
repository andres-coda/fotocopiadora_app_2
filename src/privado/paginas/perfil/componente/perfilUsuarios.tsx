import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appStore } from "../../../../redux/store";
import { ReduxProp, orden } from "../../../../redux/modelo/reduxContext.interface";
import { usuarioProps } from "../../../../modelo/usuario/Usuario.interface";
import useUsuariosApi from "../../../../servicio/usuario/useUsuariosApi";
import { crearUsuarios } from "../../../../redux/state/usuarios.state";
import Boton from "../../../../componente-estilo/boton/boton";
import Cargando from "../../../../componente/cargando/cargando";
import Texto from "../../../../componente-estilo/texto/texto";
import TextoVacio from "../../../../componente/Textos/textoVacio";
import UsuarioCard from "./usuarioCard";
import './perfilUsuarios.css'

interface Props {
  esAdmin: boolean;
  usuarioActualId: string;
  onNuevo: () => void;
  onEditar: () => void;
  setEliminar: Dispatch<SetStateAction<boolean>>;
}

const PerfilUsuarios = ({ esAdmin, usuarioActualId, onNuevo, onEditar, setEliminar }: Props) => {
  const usuariosDatos: ReduxProp<usuarioProps> = useSelector((store: appStore) => store.usuarios);
  const { obtenerUsuariosBusqueda, responseUsuarios, loadingUsuarios, errorFetchUsuarios } = useUsuariosApi();
  const dispatch = useDispatch();

  useEffect(() => {
    // La lista es sin paginar: una empresa tiene pocos usuarios. Si superara el
    // limite habria que agregar buscador y paginacion como en sede.
    obtenerUsuariosBusqueda({ query: '', limite: 100, pagina: 1 });
  }, []);

  useEffect(() => {
    if (responseUsuarios) {
      dispatch(crearUsuarios({
        query: '',
        datosQuery: responseUsuarios.datos,
        total: responseUsuarios.total,
        pagina: responseUsuarios.pagina,
        limite: responseUsuarios.limite,
        sortBy: 'nombre' as keyof usuarioProps,
        sortOrder: 'asc' as orden,
      }));
    }
  }, [responseUsuarios]);

  const usuarios: usuarioProps[] = usuariosDatos.busquedaActual.datosQuery;

  return (
    <div className="perfil-usuarios">
      {esAdmin && <Boton texto="Nuevo usuario" onClick={onNuevo} titulo="Nuevo usuario" />}
      {errorFetchUsuarios && <Texto texto={errorFetchUsuarios} error chica />}
      {loadingUsuarios && usuarios.length === 0 && <Cargando />}
      {!loadingUsuarios && usuarios.length === 0 && <TextoVacio entidad="usuarios" />}
      {usuarios.map(dato => (
        <UsuarioCard
          key={dato.id}
          usuario={dato}
          esAdmin={esAdmin}
          esUsuarioActual={dato.id === usuarioActualId}
          onEditar={onEditar}
          setEliminar={setEliminar}
        />
      ))}
    </div>
  );
}

export default PerfilUsuarios;
