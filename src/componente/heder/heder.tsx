import { useEffect, useState } from 'react';
import './heder.css'
import { usuarioProps } from '../../modelo/usuario/Usuario.interface';
import { useUsuario } from '../../servicio/usuario/useUsuario';
import { Link } from 'react-router-dom';
import Texto from '../../componente-estilo/texto/texto';
import { rutaPrivadaBase, RutasPrivadas } from '../../privado/rutas/rutasPrivadas';

function Heder() {
  const [userActual, setUserActual] = useState<usuarioProps | null>(null);
  const { user } = useUsuario();

  useEffect(() => {
    if (user) {
      setUserActual(user);
    }
  }, [user]);


  return (
    <nav className="heder">
      <ul>
        <li><Link to={`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO_LISTA}`} ><Texto texto={'Libros'} mediana centrado nuevoEstilo='txt-heder' /></Link></li>
        <li><Link to={`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.CLIENTE_LISTA}`} ><Texto texto={'Clientes'} mediana centrado nuevoEstilo='txt-heder' /></Link></li>
        <li><Link to={`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PRECIO_LISTO}`} ><Texto texto={'Precios'} mediana centrado nuevoEstilo='txt-heder' /></Link></li>
        <li><Link to={`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.SEDE_LISTA}`} ><Texto texto={'Sedes'} mediana centrado nuevoEstilo='txt-heder' /></Link></li>
        
        <li>{userActual
          ? <Link to='/' ><Texto texto={userActual.email} mediana centrado nuevoEstilo='txt-heder' /></Link>
          : <Link to='/' ><Texto texto={'Iniciar sesión'} mediana centrado nuevoEstilo='txt-heder' /></Link>
        }
        </li>
      </ul>
    </nav>
  )
}
/*
function Heder() {
  const [menu, setMenu] = useState(false);
  const { pedidos, currentPedidoIndex, userLogin } = useGlobalContext();
  const [claseActiva, setClaseActiva] = useState('');

  const {nuevoPedido, pedidoAnterior, pedidoSiguiente, eliminarPedido} = usePedidoManager();

  const handleClaseActiva = (clase) => {
    setClaseActiva(clase);
  }

  return (
  <nav className="nav-parcial">
    <div className="nav-parcial-superior">
      <Link 
        to={rutasGenerales.PEDIDONUEVO} 
        title='Nuevo pedido'
        onClick={(e) => { nuevoPedido(e), handleClaseActiva('pedido-nuevo'), setMenu(false) }}
        className={claseActiva == 'pedido-nuevo' ? 'activa' : ''}
      >
        <img src={Nuevo} alt={'Nuevo pedido'}/>
      </Link>

      <Link 
        to={rutasGenerales.CLIENTES} 
        title='Buscar cliente'
        onClick={()=>{handleClaseActiva('clientes'), setMenu(false)}}
        className={claseActiva == 'clientes' ? 'activa' : ''}
      >
        <img src={Clientes} alt={'Buscar cliente'}/>
      </Link>

      <Link 
        to={rutasGenerales.LIBROLISTA} 
        title='Lista de libros'
        onClick={()=>{handleClaseActiva('libros'), setMenu(false)}}
        className={claseActiva == 'libros' ? 'activa' : ''}
      >
        <img src={Libros} alt={'Lista de libros'}/>
      </Link>

      <Link 
        to={rutasGenerales.PEDIDOS} 
        title='Lista de pedidos'
        onClick={()=>{handleClaseActiva('pedidos'), setMenu(false)}}
        className={claseActiva == 'pedidos' ? 'activa' : ''}
      >
        <img src={ListaPedidos} alt={'Lista de pedidos'}/>
      </Link>

      <Link 
        to={rutaPublica.LOGIN} 
        title={userLogin && userLogin.email?'perfil' : 'Login'}
        onClick={()=>{handleClaseActiva('perfil'), setMenu(false)}}
        className={claseActiva == 'perfil' ? 'activa' : ''}
      >
        <img src={userLogin &&  userLogin.email? Perfil:Loguearse} alt={userLogin && userLogin.email?'perfil' : 'Login'}/>
      </Link>

      <a 
        title={!menu ? 'Menu' : 'Cerrar menu'} 
        onClick={()=> {handleClaseActiva('menu'), setMenu(!menu)}}
        className={claseActiva == 'menu' ? 'activa' : ''}
      >{!menu 
      ? (<img src={Menu} alt={'Menu'} /> )
      : (<img src={MenuCerrado} alt={'Cerrar menu'} /> )}</a>
    </div>
    {menu ? (
        <div className={`menu ${menu ? 'open' : ''}`}>
          <div className="menu-content">
            <ul>

              <li><Link 
                to={rutasGenerales.ESCUELAS}
                onClick={() => { handleClaseActiva('escuelas'), setMenu(false) }}
                className={claseActiva == 'escuelas' ? 'activa' : ''}
                >Escuelas</Link></li>
              <li><Link 
                to={rutasGenerales.PRECIOS}
                onClick={() => { handleClaseActiva('precios'), setMenu(false) }}
                className={claseActiva == 'precios' ? 'activa' : ''}
                >Precios</Link></li>
              <li><Link 
                to={rutasGenerales.CLIENTENUEVO}
                onClick={() => { handleClaseActiva('clientes'), setMenu(false) }}
                className={claseActiva == 'clientes' ? 'activa' : ''}
                >Nuevo cliente</Link></li>
                
              <li><Link 
                to={rutasGenerales.USUARIOS}
                onClick={() => { handleClaseActiva('usuarios'), setMenu(false) }}
                className={claseActiva == 'usuarios' ? 'activa' : ''}
                >Lista de usuarios</Link></li>
              <li><a onClick={()=> setMenu(false)}>Contacto</a></li>  
            </ul>
          </div>
          </div>
        ) : (null) }
        {pedidos?.length > 0 ? (
        <div className="nav-parcial-inferior">
          <Link onClick={pedidoAnterior} title='Pedido anterior'><img src={ArrowLeft} alt='Pedido anterior' /></Link>
          <Link onClick={pedidoSiguiente} title='Pedido siguiente'><img src={ArrowRifht} alt='Pedido siguiente' /></Link>
          <Link to={rutasGenerales.PEDIDONUEVO} title='Pedidos'>{`${currentPedidoIndex + 1} de ${pedidos?.length}`}</Link>
          <Link onClick={(e)=>eliminarPedido(e)} title='Cancelar pedido'><img src={Cancelar} alt='Cancelar pedido' /></Link>
        </div>) : (
        <a>No hay pedidos pendientes</a>
      )}
  </nav>

  )
}
*/
export default Heder;