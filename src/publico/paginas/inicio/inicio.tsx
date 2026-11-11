import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { appStore } from '../../../redux/store';
import { useAutenticacion } from '../../../hooks/autenticacion/useAutenticacion';
import { rutaBase } from '../../../privado/rutas/rutasPrivadas';
import { rutaPublica } from '../../rutas/rutasPublicas';
import { ReduxSimpleElemento } from '../../../redux/modelo/reduxContext.interface';
import { usuarioProps } from '../../../modelo/usuario/Usuario.interface';
import './inicio.css';
import { esSuper } from '../../../utils/usuario';

const Inicio = () => {
  const { token, logout } = useAutenticacion();
  const navigate = useNavigate();
  const sesion: ReduxSimpleElemento<usuarioProps> = useSelector(
    (store: appStore) => store.sesion
  );

  useEffect(() => {
    if (!token) {
      navigate(`/${rutaPublica.LOGIN}`, { replace: true });
      return;
    }
    if (sesion.error) {
      logout();
      return;
    }
    if (!sesion.cargaInicial) return;
    if (esSuper(sesion.dato)) {
      navigate(`/${rutaBase.SUPER}`, { replace: true });
    } else {
      navigate(`/${rutaBase.PRIVADO}`, { replace: true });
    }
  }, [token, sesion.cargaInicial, sesion.dato, sesion.error, navigate, logout]);

  return (
    <div className="inicio-cargando">
      <p>Cargando...</p>
    </div>
  );
};

export default Inicio;
