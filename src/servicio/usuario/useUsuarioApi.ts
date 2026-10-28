import { usuarioAdapter } from '../../adaptadores/entrada/usuario.adapter';
import { usuarioAltaDtoAdapter } from '../../adaptadores/salida/usuarioAltaDto.adapter';
import { usuarioEditarDtoAdapter } from '../../adaptadores/salida/usuarioEditarDto.adapter';
import {
  formValuesPerfilEditar,
  formValuesUsuarioAlta,
} from '../../modelo/usuario/esqUsuario.esquema';
import { usuarioProps } from '../../modelo/usuario/Usuario.interface';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { USER } from '../../utils/endpoint';
import useApi from '../hooks/useApi';

/**
 * Contrato real del back (`src/user/user.controller.ts`):
 *
 *   GET    /user/:id  -> un usuario. Solo el propio: el controller compara
 *                        contra el `sub` del token.
 *   POST   /user      -> alta (AdminGuard). La empresa sale del token.
 *   PUT    /user      -> edicion propia. El id viaja en el body.
 *
 * No hay DELETE: la baja logica del ABM no esta implementada en el back, asi
 * que el hook no la expone.
 *
 * Ojo con la constante: `USUARIO` apunta a `/usuario`, que no existe. El
 * controller de este modulo es `@Controller('user')`.
 */
const useUsuarioApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<usuarioProps | undefined>({});

  const obtenerUsuario = (id: string) =>
    fetchData({ url: `${USER}/${id}`, methodo: httpMethod.GET, adapter: usuarioAdapter });

  const crearUsuario = (data: formValuesUsuarioAlta) =>
    fetchData({
      url: USER,
      methodo: httpMethod.POST,
      bodyData: JSON.stringify(usuarioAltaDtoAdapter(data)),
      adapter: usuarioAdapter,
    });

  const editarUsuario = (data: formValuesPerfilEditar, id: string) =>
    fetchData({
      url: USER,
      methodo: httpMethod.PUT,
      bodyData: JSON.stringify(usuarioEditarDtoAdapter(data, id)),
      adapter: usuarioAdapter,
    });

  return {
    obtenerUsuario,
    crearUsuario,
    editarUsuario,
    responseUsuario: response,
    loadingUsuario: loading,
    errorFetchUsuario: errorFetch,
  };
};

export default useUsuarioApi;
