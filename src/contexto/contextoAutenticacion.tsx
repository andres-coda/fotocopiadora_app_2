import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetReduxCliente } from '../redux/state/cliente.state';
import { resetEspecificaciones } from '../redux/state/especificacion.state';
import { resetCategorias } from '../redux/state/categoria.state';
import { resetReduxLibro } from '../redux/state/libro.state';
import { resetReduxMensaje } from '../redux/state/mensaje.state';
import { resetReduxItem } from '../redux/state/pedido_libro.state';
import { resetReduxPedido } from '../redux/state/pedido.state';
import { resetReduxPrecio } from '../redux/state/precio.state';
import { resetReduxPropuesta } from '../redux/state/propuesta.state';
import { resetSedes } from '../redux/state/sede.state';
import { resetSesion } from '../redux/state/sesion.state';
import { resetReduxEmpresa } from '../redux/state/empresa.state';
import { resetMiEmpresa } from '../redux/state/miEmpresa.state';
import { resetReduxSolicitud } from '../redux/state/solicitud.state';
import { resetReduxUsuario } from '../redux/state/usuarios.state';
import { appStore } from '../redux/store';
import { ReduxSimpleElemento } from '../redux/modelo/reduxContext.interface';
import { usuarioProps } from '../modelo/usuario/Usuario.interface';


interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const dispatch = useDispatch();
  const sesion: ReduxSimpleElemento<usuarioProps> = useSelector((store: appStore) => store.sesion);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      logout();
      return;
    }

    if (!sesion.cargaInicial) {
      setIsAuthenticated(false);
      return;
    }
    setIsAuthenticated(true);

    setIsAuthenticated(true);
  }, [sesion.cargaInicial, token]);

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    dispatch(resetReduxCliente());
    dispatch(resetEspecificaciones());
    dispatch(resetCategorias());
    dispatch(resetReduxLibro());
    dispatch(resetReduxMensaje());
    dispatch(resetReduxItem());
    dispatch(resetReduxPedido());
    dispatch(resetReduxPrecio());
    dispatch(resetReduxPropuesta());
    dispatch(resetSedes());
    dispatch(resetReduxEmpresa());
    dispatch(resetMiEmpresa());
    dispatch(resetReduxSolicitud());
    dispatch(resetReduxUsuario());
    dispatch(resetSesion());
  };

  const value: AuthContextType = {
    token,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
