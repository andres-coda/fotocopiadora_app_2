import Boton from "../../../../componente-estilo/boton/boton";
import Botonera from "../../../../componente-estilo/botonera/botonera";
import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import Editar from '../../../../assets/edit.svg?react'
import Eliminar from '../../../../assets/deleted.svg?react'
import './usuarioCard.css'
import useEditar from "../../../../hooks/editar/useEditar";
import { Dispatch, SetStateAction } from "react";
import { useModalContext } from "../../../../contexto/contextoModal";
import { useDispatch } from "react-redux";
import { seleccionarUsuario } from "../../../../redux/state/usuarios.state";
import { usuarioProps } from "../../../../modelo/usuario/Usuario.interface";

interface Props {
  usuario: usuarioProps;
  esAdmin: boolean;
  esUsuarioActual: boolean;
  onEditar: () => void;
  setEliminar: Dispatch<SetStateAction<boolean>>;
}

const UsuarioCard = ({ usuario, esAdmin, esUsuarioActual, onEditar, setEliminar }: Props) => {

  const { handleEdit } = useEditar({ setModalLocal: true, usuario });
  const { setModal } = useModalContext();
  const dispatch = useDispatch();

  return (
    <Card
      nuevoEstilo="perfil-usuario-card"
    >
      <div className="perfil-usuario-card__datos">
        <Texto texto={usuario.nombre} chica />
        <Texto texto={usuario.email} chica />
        <Texto texto={`Rol: ${usuario.role}`} chica />
      </div>
      {esAdmin && (
        <Botonera nuevoEstilo="perfil-usuario-card__botonera">
          {/* Un admin no puede eliminarse a si mismo: evita que se quede sin acceso. */}
          {!esUsuarioActual && (
            <Boton icono={<Eliminar />} edit nuevoEstilo="btn-icono-chico" titulo="Eliminar usuario" onClick={() => { setEliminar(true); setModal(true); dispatch(seleccionarUsuario(usuario)); }} />
          )}
          <Boton icono={<Editar />} secundario nuevoEstilo="btn-icono-chico" titulo="Editar usuario" onClick={() => { onEditar(); handleEdit({ usuario }); }} />
        </Botonera>
      )}
    </Card>
  )
}

export default UsuarioCard
