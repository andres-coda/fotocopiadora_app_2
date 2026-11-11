import { Navigate, Outlet } from 'react-router-dom';
import { useAutenticacion } from '../hooks/autenticacion/useAutenticacion';
import { useSelector } from 'react-redux';
import { appStore } from '../redux/store';
import { rutaBase } from '../privado/rutas/rutasPrivadas';

const RutaSuperGuard = () => {
  const { token } = useAutenticacion();
  const sesion = useSelector((store:appStore) => store.sesion);
  if (!token) return <Navigate to={`/${rutaBase.PRIVADO}`} replace />;
  if (!sesion.cargaInicial) return <p>Cargando...</p>;
  const autenticado: boolean = sesion.dato?.role === 'super_admin';
  return autenticado ? <Outlet /> : <Navigate to={`/${rutaBase.PRIVADO}`} replace />;
};

export default RutaSuperGuard;
