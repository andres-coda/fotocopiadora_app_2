import useApi from "../hooks/useApi";
import { PERFIL } from "../../utils/endpoint";
import { useEffect } from "react";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { usuarioProps } from "../../modelo/usuario/Usuario.interface";
import { perfilAdapter } from "../../adaptadores/entrada/usuario.adapter";

export const useUsuario = () =>{
  const {fetchData, response, loading, errorFetch} = useApi<usuarioProps | undefined>({});
  useEffect(()=>{
    fetchData({
      url:PERFIL,
      methodo: httpMethod.GET,
      adapter: perfilAdapter,
    })
  },[]);

  return {user:response, userLoading:loading, userError:errorFetch, userFetch:fetchData}
}