import { useDispatch, useSelector } from 'react-redux';
import { appStore } from '../../redux/store';
import Texto from '../../componente-estilo/texto/texto';
import './lateralIzquierdo.css';
import Card from '../../componente-estilo/card/card';
import { resetSesion, SesionStateProp } from '../../redux/state/sesion.state';
import Monigote from '../../assets/user.svg?react';
import Cerrar_Sesion from '../../assets/cerrar-sesion.svg?react';
import Boton from '../../componente-estilo/boton/boton';
import { useNavigate } from 'react-router-dom';
import { rutaPublica } from '../../publico/rutas/rutasPublicas';

const LateralDerecho = () => {
  const sesion: SesionStateProp | undefined = useSelector((store: appStore) => store.sesion);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    dispatch(resetSesion());
    // Al salir de /privado/* el guard se desmonta; al volver a entrar
    // se remonta y vuelve a leer el token (ya nulo) -> redirige al login.
    navigate(`/${rutaPublica.LOGIN}`);
  };
  if (!sesion.usuario) return <Texto texto={'No hay sesion'} mediana negrita />;

  return (
    <>
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
    </>
  );
};

export default LateralDerecho;
