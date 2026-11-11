import { Route } from 'react-router-dom';
import RutaInvalida from './componente/ruta_invalida/rutaInvalida';
import RutaPrivadaGuard from './guard/rutaPrivadaGuard';
import PublicoRuta from './publico/publicoRuta';
import PrivadoRuta from './privado/privadoRuta';
import RutaSuperGuard from './guard/rutaSuperGuard';
import { rutaBase } from './privado/rutas/rutasPrivadas';
import SuperRuta from './super/superRuta';

const AppRouter = () => {
  return (
    <RutaInvalida>
      <Route path="/*" element={<PublicoRuta />} />
      <Route element={<RutaPrivadaGuard />}>
        <Route path={`${rutaBase.PRIVADO}/*`} element={<PrivadoRuta />} />
      </Route>
      <Route element={<RutaSuperGuard />}>
        <Route path={`${rutaBase.SUPER}/*`} element={<SuperRuta />} />
      </Route>
    </RutaInvalida>
  );
};

export default AppRouter;
