import Card from '../../../../componente-estilo/card/card';
import Texto from '../../../../componente-estilo/texto/texto';
import { RolUsuario, usuarioProps } from '../../../../modelo/usuario/Usuario.interface';
import Boton from '../../../../componente-estilo/boton/boton';
import Botonera from '../../../../componente-estilo/botonera/botonera';
import Eliminar from '../../../../assets/deleted.svg?react';
import { Dispatch, SetStateAction } from 'react';
import './perfilEmpresa.css'
import { useDispatch } from 'react-redux';
import { seleccionarUsuario } from '../../../../redux/state/usuarios.state';

const etiquetaRol = (rol: RolUsuario): string => {
  if (rol === 'admin') return 'Administrador';
  if (rol === 'super_admin') return 'Administrador general';
  return 'Operador';
};

interface Prop{
  usuario:usuarioProps;
  onEliminarUsuario: Dispatch<SetStateAction<boolean>>;
}

const CardUsuario = ({usuario, onEliminarUsuario}:Prop) => {
  const dispatch = useDispatch();

  return (
    <Card nuevoEstilo='card-usuario'>
      <div className='card-usuario-interno'>
        <Texto texto={etiquetaRol(usuario.role)} chica/>
        <Texto texto={usuario.nombre} negrita inline/>
        <Texto texto={usuario.email || 'Sin email'} chica />
      </div>
      <Botonera derecha>
        <Boton
          edit
          nuevoEstilo={`btn-icono-chico`}
          onClick={() => {onEliminarUsuario(true), dispatch(seleccionarUsuario(usuario))}}
          icono={<Eliminar />}
        />
      </Botonera>
    </Card>
  )
}

export default CardUsuario
