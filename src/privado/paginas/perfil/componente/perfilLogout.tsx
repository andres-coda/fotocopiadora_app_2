import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Boton from "../../../../componente-estilo/boton/boton";
import Texto from "../../../../componente-estilo/texto/texto";
import { resetSesion } from "../../../../redux/state/sesion.state";
import { rutaPublica } from "../../../../publico/rutas/rutasPublicas";

const PerfilLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    dispatch(resetSesion());
    // Al salir de /privado/* el guard se desmonta; al volver a entrar
    // se remonta y vuelve a leer el token (ya nulo) -> redirige al login.
    navigate(`/${rutaPublica.LOGIN}`);
  }

  return (
    <div className="perfil-seccion__datos">
      <Texto texto="Cerras la sesion en este dispositivo" chica />
      <Boton texto="Cerrar sesion" secundario onClick={cerrarSesion} />
    </div>
  );
}

export default PerfilLogout;
