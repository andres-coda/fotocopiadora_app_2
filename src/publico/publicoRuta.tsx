import { Route } from 'react-router-dom';
import RutaInvalida from '../componente/ruta_invalida/rutaInvalida';
import { rutaPublica } from './rutas/rutasPublicas';
import Registro from './paginas/registro/registro';
import Login from './paginas/login/login';
import Inicio from './paginas/inicio/inicio';

const PublicoRuta = () => {
  return (
    <RutaInvalida>
      <Route path="/" element={<Inicio />}></Route>
      <Route path={rutaPublica.LOGIN} element={<Login />} />
      <Route path={rutaPublica.REGISTRO} element={<Registro />} />
    </RutaInvalida>
  );
};

export default PublicoRuta;
