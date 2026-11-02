import { Navigate, Outlet } from 'react-router-dom';
import { useAutenticacion } from '../hooks/autenticacion/useAutenticacion';
import { useSelector } from 'react-redux';
import { appStore } from '../redux/store';
import { rutaPublica } from '../publico/rutas/rutasPublicas';

const RutaSuperGuard = () => {
  const { token } = useAutenticacion();
  const sesion = useSelector((store:appStore) => store.sesion);
  const autenticado: boolean = (token && sesion.usuario?.role === 'super_admin') ? true : false;
  return autenticado ? <Outlet /> : <Navigate to={rutaPublica.LOGIN} replace />;
};

export default RutaSuperGuard;
