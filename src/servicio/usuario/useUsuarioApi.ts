import { usuarioAdapter } from '../../adaptadores/entrada/usuario.adapter';
import { usuarioAltaDtoAdapter } from '../../adaptadores/salida/usuarioAltaDto.adapter';
import { usuarioEditarDtoAdapter } from '../../adaptadores/salida/usuarioEditarDto.adapter';
import {
  formValuesUsuarioAdmin,
  formValuesUsuarioEditar,
} from '../../modelo/usuario/esqUsuario.esquema';
import { usuarioProps } from '../../modelo/usuario/Usuario.interface';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { USUARIO } from '../../utils/endpoint';
import useApi from '../hooks/useApi';

const useUsuarioApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<usuarioProps | undefined>({});

  const editarUsuario = (data: formValuesUsuarioEditar | formValuesUsuarioAdmin, id: string) =>
    fetchData({
      url: `${USUARIO}/${id}`,
      methodo: httpMethod.PUT,
      bodyData: JSON.stringify(usuarioEditarDtoAdapter(data)),
      adapter: usuarioAdapter,
    });

  const crearUsuario = (data: formValuesUsuarioAdmin) =>
    fetchData({
      url: USUARIO,
      methodo: httpMethod.POST,
      bodyData: JSON.stringify(usuarioAltaDtoAdapter(data)),
      adapter: usuarioAdapter,
    });

  // Baja logica: el back marca deleted = true, el front no manda nada mas.
  const eliminarUsuario = (id: string) =>
    fetchData({ url: `${USUARIO}/${id}`, methodo: httpMethod.DELETE });

  return {
    editarUsuario,
    crearUsuario,
    eliminarUsuario,
    responseUsuario: response,
    loadingUsuario: loading,
    errorFetchUsuario: errorFetch,
  };
};

export default useUsuarioApi;
