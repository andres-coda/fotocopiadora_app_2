import { Route } from "react-router-dom";
import RutaInvalida from "./componente/ruta_invalida/rutaInvalida";
import RutaPrivadaGuard from "./guard/rutaPribadaGuard";
import PublicoRuta from "./publico/publicoRuta";
import PrivadoRuta from "./privado/privadoRuta";

const AppRouter = () => {
  return (
    <RutaInvalida>
      <Route path="/*" element={<PublicoRuta/>} />
      <Route element={<RutaPrivadaGuard />}>
        <Route path="/privado/*" element={<PrivadoRuta />} />
      </Route>
    </RutaInvalida>
  )
}

export default AppRouter;