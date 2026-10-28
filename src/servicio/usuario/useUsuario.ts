import useApi from '../hooks/useApi';
import { PERFIL, USER } from '../../utils/endpoint';
import { useEffect, useState } from 'react';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { usuarioProps } from '../../modelo/usuario/Usuario.interface';
import { perfilAdapter, usuarioAdapter } from '../../adaptadores/entrada/usuario.adapter';

/**
 * Sesion del usuario logueado.
 *
 * `GET /auth/profile` devuelve el payload del JWT: sirve para saber quien esta
 * logueado, pero se queda viejo. No trae el email, y si el usuario edita su
 * nombre el token sigue con el anterior hasta que vuelva a iniciar sesion.
 *
 * Por eso, despues del perfil se pide `GET /user/:id` y ese dato manda. La
 * segunda consulta es silenciosa: si falla, la sesion sigue funcionando con lo
 * que dio el token.
 */
export const useUsuario = () => {
  const perfilApi = useApi<usuarioProps | undefined>({});
  const datoApi = useApi<usuarioProps | undefined>({});

  // Se guardan en estado propio porque `useApi` limpia su `response` a los 3
  // segundos, y eso borraria la sesion de la vista.
  const [perfil, setPerfil] = useState<usuarioProps | undefined>(undefined);
  const [dato, setDato] = useState<usuarioProps | undefined>(undefined);

  useEffect(() => {
    perfilApi.fetchData({
      url: PERFIL,
      methodo: httpMethod.GET,
      adapter: perfilAdapter,
    });
    // Solo al montar: la sesion se resuelve una vez por carga de la app.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (perfilApi.response) setPerfil(perfilApi.response);
  }, [perfilApi.response]);

  useEffect(() => {
    if (!perfil) return;
    datoApi.fetchData({
      url: `${USER}/${perfil.id}`,
      methodo: httpMethod.GET,
      adapter: usuarioAdapter,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perfil]);

  useEffect(() => {
    if (datoApi.response) setDato(datoApi.response);
  }, [datoApi.response]);

  return {
    user: dato ?? perfil,
    userLoading: perfilApi.loading,
    // El error de la segunda consulta no se propaga: la sesion ya es valida.
    userError: perfilApi.errorFetch,
    userFetch: perfilApi.fetchData,
  };
};
