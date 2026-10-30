import Card from '../../../../componente-estilo/card/card';
import Texto from '../../../../componente-estilo/texto/texto';
import { RolUsuario, usuarioProps } from '../../../../modelo/usuario/Usuario.interface';
import Boton from '../../../../componente-estilo/boton/boton';
import Botonera from '../../../../componente-estilo/botonera/botonera';
import Eliminar from '../../../../assets/deleted.svg?react';
import { Dispatch, SetStateAction } from 'react';
import './perfilEmpresa.css'

const etiquetaRol = (rol: RolUsuario): string => {
  if (rol === 'admin') return 'Administrador';
  if (rol === 'super_admin') return 'Administrador general';
  return 'Operador';
};

interface Prop{
  usuario:usuarioProps;
  setEliminarUsuario: Dispatch<SetStateAction<string | undefined>>;
}

const CardUsuario = ({usuario, setEliminarUsuario}:Prop) => {
  return (
    <Card nuevoEstilo='card-usuario'>
      <div className='card-usuario-interno'>
        <Texto texto={etiquetaRol(usuario.role)} chica />
        <Texto texto={usuario.nombre} negrita />
        <Texto texto={usuario.email || 'Sin email'} chica />
      </div>
      <Botonera derecha>
        <Boton
          edit
          nuevoEstilo={`btn-icono-chico`}
          onClick={() => setEliminarUsuario(usuario.id)}
          icono={<Eliminar />}
        />
      </Botonera>
    </Card>
  )
}

export default CardUsuario
