import { TokenProp } from "../../modelo/usuario/Usuario.interface";
import useApi from "../hooks/useApi";
import { USER } from "../../utils/endpoint";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { userDtoAdapter } from "../../adaptadores/salida/userDto.adapter";
import { formValuesRegistro } from "../../modelo/usuario/esqUsuario.esquema";
import { tokenAdapter } from "../../adaptadores/entrada/usuario.adapter";

const useUsuarioTokens = () => {
  const { fetchData, response, loading, errorFetch } = useApi<TokenProp | undefined>({});
  
  const crearUsuario = (data: formValuesRegistro) =>
    fetchData({ url: USER, methodo: httpMethod.POST, bodyData: JSON.stringify(userDtoAdapter(data)), adapter: tokenAdapter });

  return { user: response, userLoading: loading, userError: errorFetch, crearUsuario}
}


export default useUsuarioTokens