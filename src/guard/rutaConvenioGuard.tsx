import { Navigate, Outlet } from "react-router-dom";
import { appStore } from "../redux/store";
import { useSelector } from "react-redux";
import { rutaPrivadaBase } from "../privado/rutas/rutasPrivadas";

const RutaConvenioGuard = () => {
    const convenio = useSelector((store:appStore) => store.convenios)
  const autenticado:boolean = convenio.selected ? true : false

  return autenticado
    ? <Outlet />
    : <Navigate to={`/${rutaPrivadaBase.PRIVADO}/`} replace/>
}

export default RutaConvenioGuard;