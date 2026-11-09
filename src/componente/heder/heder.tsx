import { useSelector } from 'react-redux';
import { appStore } from '../../redux/store';
import { Link } from 'react-router-dom';
import { rutaPrivadaBase, RutasPrivadas } from '../../privado/rutas/rutasPrivadas';
import Libro from './../../assets/books.svg?react';
import Cliente from './../../assets/buscar.svg?react';
import Pesos from './../../assets/pesos.svg?react';
import Pedido from './../../assets/pedidos.svg?react';
import Sedes from './../../assets/direccion.svg?react';
import UserCheck from './../../assets/userCheck.svg?react';
import User from './../../assets/user.svg?react';
import Mensaje from './../../assets/email.svg?react';
import Nuevo from './../../assets/nuevo.svg?react';
import { RutasSupers, rutaSuperBase } from '../../super/ruta/rutaSupers';
import SolicitudesIcon from './../../assets/edit.svg?react';
import { rutaPublica } from '../../publico/rutas/rutasPublicas';
import './heder.css';
import { esSuper } from '../../utils/usuario';



function Heder() {
  // El perfil ya lo carga CargarDatosIniciales en el slice `sesion`.
  const userActual = useSelector((store: appStore) => store.sesion.dato);

  return (
    <nav className="heder">
      <ul>
        {!esSuper(userActual) && (
          <li title="Nuevo pedido">
            <Link to={`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PEDIDO_CARGAR}`}>
              <Nuevo />
            </Link>
          </li>
        )}
        <li title="Libros">
          <Link
            to={
              !esSuper(userActual)
                ? `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO_LISTA}`
                : `/${rutaSuperBase.SUPER}/${RutasSupers.LIBRO_LISTA}`
            }
          >
            <Libro />
          </Link>
        </li>
        {!esSuper(userActual) && (
          <li title="Clientes">
            <Link to={`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.CLIENTE_LISTA}`}>
              <Cliente />
            </Link>
          </li>
        )}
        {!esSuper(userActual) && (
          <li title={'Precios'}>
            <Link to={`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PRECIO_LISTO}`}>
              <Pesos />
            </Link>
          </li>
        )}
        {!esSuper(userActual) && (
          <li title={'Pedidos'}>
            <Link to={`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PEDIDO_LIBRO_LISTA}`}>
              <Pedido />
            </Link>
          </li>
        )}
        {esSuper(userActual) && (
          <li title={'Empresas'}>
            <Link to={`/${rutaSuperBase.SUPER}/${RutasSupers.EMPRESA_LISTA}`}>
              <Sedes />
            </Link>
          </li>
        )}
        {esSuper(userActual) && (
          <li title={'Solicitudes'}>
            <Link to={`/${rutaSuperBase.SUPER}/${RutasSupers.SOLICITUD_LISTA}`}>
              <SolicitudesIcon />
            </Link>
          </li>
        )}

        {!esSuper(userActual) && (
          <li title={'Mensajes'}>
            <Link to={`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.MENSAJE_LISTA}`}>
              <Mensaje />
            </Link>
          </li>
        )}

        {userActual && (
          <li title={'Usuario'}>
            <Link
              to={
                !esSuper(userActual)
                  ? `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PERFIL}`
                  : `/${rutaSuperBase.SUPER}/${RutasSupers.PERFIL}`
              }
            >
              <UserCheck />
            </Link>
          </li>
        )}
        {!userActual && (
          <li title={'Usuario'}>
            <Link to={`/${rutaPublica.LOGIN}`}>
              <User />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
export default Heder;
