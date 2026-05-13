import { Navigate, Outlet } from "react-router-dom";
import { rutaPrivadaBase } from "../privado/rutas/rutasPrivadas";
import { empleadorProp } from "../modelo/empleador/Empleador.interface";
import { useSelector } from "react-redux";
import { appStore } from "../redux/store";

const RutaEmpleadorGuard = () => {
  const empleador:empleadorProp | null= useSelector((store:appStore)=> store.empleadores.selected);
  //const {token} = useAutenticacion();
  const autenticado:boolean = empleador ? true : false;
  return autenticado
    ? <Outlet />
    : <Navigate to={`/${rutaPrivadaBase.PRIVADO}/`} replace/>
}

export default RutaEmpleadorGuard;