import { Dispatch, SetStateAction } from 'react';
import Texto from '../../../../componente-estilo/texto/texto';
import { usuarioProps } from '../../../../modelo/usuario/Usuario.interface';
import useUsuariosApi from '../../../../servicio/usuario/useUsuariosApi';
import CardUsuario from './cardUsuario';
import Boton from '../../../../componente-estilo/boton/boton';
import Mas from '../../../../assets/mas.svg?react';
import Cargando from '../../../../componente/cargando/cargando';
import { useSelector } from 'react-redux';
import { appStore } from '../../../../redux/store';
import {
  agregarUsuariosBusquedaActual,
  crearBusquedaUsuario,
} from '../../../../redux/state/usuarios.state';
import { ReduxProp, UltimaBusquedaProp } from '../../../../redux/modelo/reduxContext.interface';
import useFinPaginaRedux from '../../../../hooks/finPagina/useFinPaginaRedux';
import DesplegableArrow from '../../../../componente-estilo/desplegable/desplegableArrow';
import Botonera from '../../../../componente-estilo/botonera/botonera';

interface Props {
  onAgregarUsuario: () => void;
  onEliminarUsuario: Dispatch<SetStateAction<boolean>>;
}

/**
 * Listado de solo lectura de los usuarios de la empresa.
 * El alta vive en el modal (`UsuarioCrear`); aca no hay edicion porque el back
 * no expone un endpoint para que un admin edite a otro usuario.
 */
const UsuariosEmpresa = ({ onAgregarUsuario, onEliminarUsuario }: Props) => {
  const sesion: usuarioProps | null = useSelector((store: appStore) => store.sesion.usuario);
  const usuarioRedux: ReduxProp<usuarioProps> = useSelector(
    (store: appStore) => store.usuario
  );
  const { obtenerUsuarios, responseUsuarios, loadingUsuarios, errorFetchUsuarios } =
    useUsuariosApi();

  const { finListaRef, contenedorRef } = useFinPaginaRedux<usuarioProps>({
    datos: usuarioRedux.busquedaActual,
    loading: loadingUsuarios,
    cargaInicial: true,
    obtenerBusqueda: obtenerUsuarios,
    response: responseUsuarios,
    crearBusquedaRedux: crearBusquedaUsuario,
    actualizarBusquedaRedux: agregarUsuariosBusquedaActual,
  });

  if (!sesion || sesion.role === 'operador')
    return <Texto texto="no tiene acceso a los trabajadores" error chica />;

  if (errorFetchUsuarios) return <Texto texto={errorFetchUsuarios} error chica />;
  if (loadingUsuarios && usuarioRedux.busquedaActual.datosQuery.length === 0) return <Cargando />;

  return (
    <DesplegableArrow
      titulo="Listas de trabajadores"
      verde
      grid
      contenedorRef={contenedorRef}
      vacio={usuarioRedux.cargaInicial && usuarioRedux.busquedaActual.datosQuery.length === 0}
      finListaRef={finListaRef}
      nuevoEstilo='usuario-lista'
    >
      {usuarioRedux.busquedaActual.datosQuery.length != 0 &&
        usuarioRedux.busquedaActual.datosQuery
          .filter(u => u.id != sesion?.id)
          .map(u => <CardUsuario usuario={u} onEliminarUsuario={onEliminarUsuario} />)}

      <Boton nuevoEstilo={` btn-usuario-mas btn-icono-chico`} onClick={() => onAgregarUsuario()} icono={<Mas />} />
    </DesplegableArrow>
  );
};

export default UsuariosEmpresa;
