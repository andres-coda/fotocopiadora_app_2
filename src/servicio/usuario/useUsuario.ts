import useApi from "../hooks/useApi";
import { PERFIL } from "../../utils/endpoint";
import { useEffect } from "react";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { usuarioProps } from "../../modelo/usuario/Usuario.interface";

export const useUsuario = () =>{
  const {fetchData, response, loading, errorFetch} = useApi<usuarioProps | null>({});
  useEffect(()=>{
    fetchData({
      url:PERFIL,
      methodo: httpMethod.GET,
    })
  },[]);

  return {user:response, userLoading:loading, userError:errorFetch, userFetch:fetchData}
}