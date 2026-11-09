import { Dispatch, SetStateAction } from "react";
import useUsuariosEmpresa from "./hook/useUsuariosEmpresa";
import Texto from "../../componente-estilo/texto/texto";
import DesplegableArrow from "../../componente-estilo/desplegable/desplegableArrow";
import Boton from "../../componente-estilo/boton/boton";
import Mas from '../../assets/mas.svg?react';
import CardUsuario from "./cardUsuario";

interface Props {
  onAgregarUsuario?: () => void;
  onEliminarUsuario?: Dispatch<SetStateAction<boolean>>;
}

/**
 * Listado de solo lectura de los usuarios de la empresa.
 * El alta vive en el modal (`UsuarioCrear`); aca no hay edicion porque el back
 * no expone un endpoint para que un admin edite a otro usuario.
 */
const UsuariosEmpresa = ({ onAgregarUsuario, onEliminarUsuario }: Props) => {
  const {
    sesion, vacio, usuarios, finListaRef, contenedorRef,
    errorFetchUsuarios, loadingUsuarios
  } = useUsuariosEmpresa()

  if (!sesion || sesion.role === 'operador')
    return <Texto texto="no tiene acceso a los trabajadores" error chica />;

  return (
    <DesplegableArrow
      titulo="Listas de trabajadores"
      verde
      grid
      contenedorRef={contenedorRef}
      vacio={vacio}
      finListaRef={finListaRef}
      nuevoEstilo='usuario-lista'
      error={errorFetchUsuarios}
      loading={loadingUsuarios}
      entidad="trabajadores"
      botones={
        onAgregarUsuario && <Boton nuevoEstilo={` btn-usuario-mas`} iconoChico onClick={() => onAgregarUsuario()} icono={<Mas />} />
      }
    >
      {usuarios
          .filter(u => u.id != sesion?.id)
          .map(u => <CardUsuario usuario={u} onEliminarUsuario={onEliminarUsuario} onCambiarRol={sesion.role != 'operador'}/>)}

    </DesplegableArrow>
  );
};

export default UsuariosEmpresa;
