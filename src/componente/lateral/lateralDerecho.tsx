import { useDispatch, useSelector } from 'react-redux';
import { appStore } from '../../redux/store';
import Texto from '../../componente-estilo/texto/texto';
import './lateralIzquierdo.css';
import './lateralDerecho.css';
import MensajesFavoritosLateral from './mensajesFavoritosLateral';
import Card from '../../componente-estilo/card/card';
import { resetSesion, SesionStateProp } from '../../redux/state/sesion.state';
import Monigote from '../../assets/user.svg?react';
import Cerrar_Sesion from '../../assets/cerrar-sesion.svg?react';
import Boton from '../../componente-estilo/boton/boton';
import { useNavigate } from 'react-router-dom';
import { rutaPublica } from '../../publico/rutas/rutasPublicas';
import { useAuth } from '../../contexto/contextoAutenticacion';
import Lateral from '../../componente-estilo/lateral/lateral';

const LateralDerecho = () => {
  const sesion: SesionStateProp | undefined = useSelector((store: appStore) => store.sesion);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const cerrarSesion = () => {
    logout();
    dispatch(resetSesion());
    navigate(`/${rutaPublica.LOGIN}`);
  };
  if (!sesion.usuario)
    return (
      <Lateral nuevoEstilo="lateral-derecho">
        <Texto texto={'No hay sesion'} mediana negrita />;
      </Lateral>
    );

  return (
    <Lateral nuevoEstilo="lateral-derecho">
      <Card nuevoEstilo="sesion">
        <Monigote />
        <Texto texto={sesion.usuario?.nombre} mediana negrita />
        <Boton
          icono={<Cerrar_Sesion />}
          nuevoEstilo="btn-icono-chico"
          titulo={`Cerrar sesión`}
          onClick={cerrarSesion}
          edit
        />
      </Card>
      <MensajesFavoritosLateral />
    </Lateral>
  );
};

export default LateralDerecho;
