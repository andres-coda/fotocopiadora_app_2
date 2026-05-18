import { Navigate, Outlet } from "react-router-dom";
import { useAutenticacion } from "../hooks/autenticacion/useAutenticacion";
import { rutaPublica } from "../publico/rutas/rutasPublicas";

const RutaPrivadaGuard = () => {
const {token} = useAutenticacion();
const autenticado:boolean = token ? true : false;
  return autenticado
    ? <Outlet />
    : <Navigate to={rutaPublica.LOGIN} replace/>
}

export default RutaPrivadaGuard;