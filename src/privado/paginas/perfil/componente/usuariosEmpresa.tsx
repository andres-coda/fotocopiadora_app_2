import { Dispatch, SetStateAction } from 'react';
import Texto from '../../../../componente-estilo/texto/texto';
import { usuarioProps } from '../../../../modelo/usuario/Usuario.interface';
import useUsuariosApi from '../../../../servicio/usuario/useUsuariosApi';
import CardUsuario from './cardUsuario';
import Boton from '../../../../componente-estilo/boton/boton';
import Mas from '../../../../assets/mas.svg?react';
import { useSelector } from 'react-redux';
import { appStore } from '../../../../redux/store';
import {
  agregarUsuariosBusquedaActual,
  crearBusquedaUsuario,
  crearUsuarios,
  resetBusquedaUsuario,
} from '../../../../redux/state/usuarios.state';
import { ReduxProp } from '../../../../redux/modelo/reduxContext.interface';
import DesplegableArrow from '../../../../componente-estilo/desplegable/desplegableArrow';
import useFinPagina from '../../../../hooks/finPagina/useFinPagina';
import useGestionPeticion from '../../../../hooks/respuesta/useGestionPeticion';
import useGestionResponse from '../../../../hooks/respuesta/useGestionRespuesta';

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
  const sesion: usuarioProps | null = useSelector((store: appStore) => store.sesion.dato);
  const usuarioRedux: ReduxProp<usuarioProps> = useSelector(
    (store: appStore) => store.usuario
  );
  const { obtenerUsuarios, responseUsuarios, loadingUsuarios, errorFetchUsuarios } =
    useUsuariosApi();

  const {queryRef} = useGestionPeticion({
    datos: usuarioRedux,
    obtenerBusqueda: obtenerUsuarios,
    resetearBusqueda: resetBusquedaUsuario,
    crearBusqueda: crearBusquedaUsuario
  });

  useGestionResponse<usuarioProps>({
    datos:usuarioRedux,
    response: responseUsuarios,
    query: queryRef.current,
    crearDatos: crearUsuarios,
    crearBusqueda: crearBusquedaUsuario,
    agregarBusqueda: agregarUsuariosBusquedaActual,
  })

  const { finListaRef, contenedorRef } = useFinPagina<usuarioProps>({
    datos: usuarioRedux.busquedaActual,
    loading: loadingUsuarios,
    obtenerBusqueda: obtenerUsuarios,
  });

  if (!sesion || sesion.role === 'operador')
    return <Texto texto="no tiene acceso a los trabajadores" error chica />;

  return (
    <DesplegableArrow
      titulo="Listas de trabajadores"
      verde
      grid
      contenedorRef={contenedorRef}
      vacio={usuarioRedux.cargaInicial && usuarioRedux.busquedaActual.datosQuery.length === 0}
      finListaRef={finListaRef}
      nuevoEstilo='usuario-lista'
      error={errorFetchUsuarios}
      loading={loadingUsuarios}
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
