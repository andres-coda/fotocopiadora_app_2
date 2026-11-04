import Card from '../../../../componente-estilo/card/card';
import Texto from '../../../../componente-estilo/texto/texto';
import { RolUsuario, usuarioProps } from '../../../../modelo/usuario/Usuario.interface';
import Boton from '../../../../componente-estilo/boton/boton';
import Eliminar from '../../../../assets/deleted.svg?react';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { seleccionarUsuario } from '../../../../redux/state/usuarios.state';
import './perfilEmpresa.css';

const etiquetaRol = (rol: RolUsuario): string => {
  if (rol === 'admin') return 'Administrador';
  if (rol === 'super_admin') return 'Administrador general';
  return 'Operador';
};

interface Prop {
  usuario: usuarioProps;
  onEliminarUsuario: Dispatch<SetStateAction<boolean>>;
}

const CardUsuario = ({ usuario, onEliminarUsuario }: Prop) => {
  const dispatch = useDispatch();

  return (
    <Card nuevoEstilo="card-usuario" retirado notaMargenSup={etiquetaRol(usuario.role)}>
      <div className="card-vertical">
        <Texto texto={usuario.nombre} negrita inline />
        <Texto texto={usuario.email || 'Sin email'} chica />
      </div>
      <Boton
        edit
        nuevoEstilo={`btn-icono-chico`}
        onClick={() => {
          (onEliminarUsuario(true), dispatch(seleccionarUsuario(usuario)));
        }}
        icono={<Eliminar />}
      />
    </Card>
  );
};

export default CardUsuario;
