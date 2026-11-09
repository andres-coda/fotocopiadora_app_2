import { Navigate, Outlet } from 'react-router-dom';
import { useAutenticacion } from '../hooks/autenticacion/useAutenticacion';
import { useSelector } from 'react-redux';
import { appStore } from '../redux/store';
import { rutaPrivadaBase } from '../privado/rutas/rutasPrivadas';

const RutaSuperGuard = () => {
  const { token } = useAutenticacion();
  const sesion = useSelector((store:appStore) => store.sesion);
  const autenticado: boolean = (token && sesion.dato?.role === 'super_admin') ? true : false;
  return autenticado ? <Outlet /> : <Navigate to={`/${rutaPrivadaBase.PRIVADO}`} replace />;
};

export default RutaSuperGuard;
