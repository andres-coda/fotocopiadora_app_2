import { useSelector } from 'react-redux';
import { appStore } from '../store';
import { useAutenticacion } from '../../hooks/autenticacion/useAutenticacion';
import useUsuarioApi from '../../servicio/usuario/useUsuarioApi';
import useCargaDatosInicialesSimplesArray from '../../hooks/respuesta/useCargaDatosInicialesSimplesArray';
import { setErrorSesion, setLoadingSesion, setUsuario } from '../state/sesion.state';
import { ReduxSimpleElemento } from '../modelo/reduxContext.interface';
import { usuarioProps } from '../../modelo/usuario/Usuario.interface';
import { ReactNode } from 'react';

interface Prop {
  children: ReactNode;
}

const CargarSesion = ({ children }: Prop) => {
  const { token } = useAutenticacion();
  const { obtenerPerfil, responseUsuario, errorFetchUsuario, loadingUsuario } = useUsuarioApi();
  const sesion: ReduxSimpleElemento<usuarioProps> = useSelector(
    (store: appStore) => store.sesion
  );

  useCargaDatosInicialesSimplesArray({
    error: errorFetchUsuario,
    responseElemento: responseUsuario,
    loading: loadingUsuario,
    obtenerBusqueda: obtenerPerfil,
    dato: sesion,
    setLoading: setLoadingSesion,
    setError: setErrorSesion,
    cargaInicialElemento: setUsuario,
    token,
  });

  return <>{children}</>;
};

export default CargarSesion;
