import { Navigate, Route } from "react-router-dom";
import RutaInvalida from "../componente/ruta_invalida/rutaInvalida";
import { rutaPublica } from "./rutas/rutasPublicas";
import Registro from "./paginas/registro/registro";
import Login from "./paginas/login/login";
import PrivadoRuta from "../privado/privadoRuta";
import RutaPrivadaGuard from "../guard/rutaPribadaGuard";
import { rutaPrivadaBase } from "../privado/rutas/rutasPrivadas";

const PublicoRuta = () => {
  return (
    <RutaInvalida>
      <Route path="/" element={<Navigate to={rutaPublica.LOGIN} />}></Route>
      <Route path={rutaPublica.LOGIN} element={<Login/>}/>
      <Route path={rutaPublica.REGISTRO} element={<Registro/>}/>
      <Route element={<RutaPrivadaGuard />}>
        <Route path={`${rutaPrivadaBase.PRIVADO}/*`} element={<PrivadoRuta />} />
      </Route>
    </RutaInvalida>
  )
}

export default PublicoRuta;