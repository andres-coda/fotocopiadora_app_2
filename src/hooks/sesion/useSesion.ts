import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appStore } from '../../redux/store';
import { setCargandoSesion, setErrorSesion, setUsuario } from '../../redux/state/sesion.state';
import { useUsuario } from '../../servicio/usuario/useUsuario';

/**
 * Fuente unica de la sesion: envuelve a useUsuario() (GET /auth/profile)
 * y sincroniza el resultado en el slice `sesion`.
 */
export const useSesion = () => {
  const dispatch = useDispatch();
  const { usuario, cargando, error } = useSelector((store: appStore) => store.sesion);
  const { user, userLoading, userError } = useUsuario();

  useEffect(() => {
    dispatch(setCargandoSesion(userLoading));
  }, [userLoading]);

  useEffect(() => {
    if (user) dispatch(setUsuario(user));
  }, [user]);

  useEffect(() => {
    dispatch(setErrorSesion(userError ?? null));
  }, [userError]);

  return { usuarioSesion: usuario, cargando, error };
};
