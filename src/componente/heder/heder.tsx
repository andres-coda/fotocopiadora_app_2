import { useSelector } from 'react-redux';
import { appStore } from '../../redux/store';
import { Link } from 'react-router-dom';
import { rutaBase, RutasPrivadas } from '../../privado/rutas/rutasPrivadas';
import Libro from './../../assets/books.svg?react';
import Cliente from './../../assets/buscar.svg?react';
import Pesos from './../../assets/pesos.svg?react';
import Pedido from './../../assets/pedidos.svg?react';
import Sedes from './../../assets/direccion.svg?react';
import UserCheck from './../../assets/userCheck.svg?react';
import User from './../../assets/user.svg?react';
import Mensaje from './../../assets/email.svg?react';
import Nuevo from './../../assets/nuevo.svg?react';
import { RutasSupers } from '../../super/ruta/rutaSupers';
import SolicitudesIcon from './../../assets/edit.svg?react';
import { rutaPublica } from '../../publico/rutas/rutasPublicas';
import { esSuper } from '../../utils/usuario';
import Texto from '../../componente-estilo/texto/texto';
import './heder.css';



function Heder() {
  // El perfil ya lo carga CargarDatosIniciales en el slice `sesion`.
  const userActual = useSelector((store: appStore) => store.sesion);

  if(!userActual.cargaInicial) return (
    
    <nav className="heder">
      <Texto texto={`Gestión de pedidos para fotocopiadoras`} centrado negrita mediana/>
    </nav>
  )


  return (
    <nav className="heder">
      <ul>
        {!esSuper(userActual.dato) && (
          <li title="Nuevo pedido">
            <Link to={`/${rutaBase.PRIVADO}/${RutasPrivadas.PEDIDO_CARGAR}`}>
              <Nuevo />
            </Link>
          </li>
        )}
        <li title="Libros">
          <Link
            to={
              !esSuper(userActual.dato)
                ? `/${rutaBase.PRIVADO}/${RutasPrivadas.LIBRO_LISTA}`
                : `/${rutaBase.SUPER}/${RutasSupers.LIBRO_LISTA}`
            }
          >
            <Libro />
          </Link>
        </li>
        {!esSuper(userActual.dato) && (
          <li title="Clientes">
            <Link to={`/${rutaBase.PRIVADO}/${RutasPrivadas.CLIENTE_LISTA}`}>
              <Cliente />
            </Link>
          </li>
        )}
        {!esSuper(userActual.dato) && (
          <li title={'Precios'}>
            <Link to={`/${rutaBase.PRIVADO}/${RutasPrivadas.PRECIO_LISTO}`}>
              <Pesos />
            </Link>
          </li>
        )}
        {!esSuper(userActual.dato) && (
          <li title={'Pedidos'}>
            <Link to={`/${rutaBase.PRIVADO}/${RutasPrivadas.PEDIDO_LIBRO_LISTA}`}>
              <Pedido />
            </Link>
          </li>
        )}
        {esSuper(userActual.dato) && (
          <li title={'Empresas'}>
            <Link to={`/${rutaBase.SUPER}/${RutasSupers.EMPRESA_LISTA}`}>
              <Sedes />
            </Link>
          </li>
        )}
        {esSuper(userActual.dato) && (
          <li title={'Solicitudes'}>
            <Link to={`/${rutaBase.SUPER}/${RutasSupers.SOLICITUD_LISTA}`}>
              <SolicitudesIcon />
            </Link>
          </li>
        )}

        {!esSuper(userActual.dato) && (
          <li title={'Mensajes'}>
            <Link to={`/${rutaBase.PRIVADO}/${RutasPrivadas.MENSAJE_LISTA}`}>
              <Mensaje />
            </Link>
          </li>
        )}

        {userActual.dato && (
          <li title={'Usuario'}>
            <Link
              to={
                !esSuper(userActual.dato)
                  ? `/${rutaBase.PRIVADO}/${RutasPrivadas.PERFIL}`
                  : `/${rutaBase.SUPER}/${RutasSupers.PERFIL}`
              }
            >
              <UserCheck />
            </Link>
          </li>
        )}
        {!userActual.dato && (
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
