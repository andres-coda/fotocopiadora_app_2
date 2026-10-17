import Boton from "../../../../componente-estilo/boton/boton";
import Texto from "../../../../componente-estilo/texto/texto";
import { usuarioProps } from "../../../../modelo/usuario/Usuario.interface";

interface Props {
  usuario: usuarioProps;
  onEditar: () => void;
}

const PerfilDatosUsuario = ({ usuario, onEditar }: Props) => {
  return (
    <div className="perfil-seccion__datos">
      <Texto texto={`Nombre: ${usuario.nombre}`} chica />
      <Texto texto={`Email: ${usuario.email}`} chica />
      <Texto texto={`Rol: ${usuario.role}`} chica />
      <Boton texto="Editar" secundario onClick={onEditar} />
    </div>
  );
}

export default PerfilDatosUsuario;
