import Card from '../../../../componente-estilo/card/card';
import { usuarioProps } from '../../../../modelo/usuario/Usuario.interface';
import Email from '../../../../assets/email.svg?react';
import Monigote from '../../../../assets/user.svg?react';
import Texto from '../../../../componente-estilo/texto/texto';
import Boton from '../../../../componente-estilo/boton/boton';
import Editar from '../../../../assets/edit.svg?react';
import Logout from '../../../../assets/cerrar-sesion.svg?react';
import Botonera from '../../../../componente-estilo/botonera/botonera';
import { useAuth } from '../../../../contexto/contextoAutenticacion';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetSesion } from '../../../../redux/state/sesion.state';
import { rutaPublica } from '../../../../publico/rutas/rutasPublicas';
import './perfilEmpresa.css';

interface Prop {
  usuario: usuarioProps;
  onEditarPerfil: () => void;
}

const CardPerfil = ({ usuario, onEditarPerfil }: Prop) => {
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    dispatch(resetSesion());
    navigate(`/${rutaPublica.LOGIN}`);
  };

  return (
    <Card nuevoEstilo="perfil-usuario">
      <div className="empresa-renglon">
        <Monigote />
        <Texto texto={usuario.nombre} />
      </div>
      <div className="empresa-renglon">
        <Email />
        <Texto texto={usuario.email} />
      </div>
      <Botonera derecha>
        <Boton
          edit
          texto="Cerrar sesión"
          titulo="Cerrar sesión"
          onClick={cerrarSesion}
        />
        <Boton
          icono={<Editar />}
          secundario
          nuevoEstilo="btn-icono-chico"
          titulo="Editar mis datos"
          onClick={onEditarPerfil}
        />
      </Botonera>
    </Card>
  );
};

export default CardPerfil;
