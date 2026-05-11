
import { componenteAdapter } from "../../adaptadores/entrada/componente.adapter";
import { ComponenteProp } from "../../modelo/Entidades/libro/componente.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { COMPONENTE } from "../../utils/endpoint";
import useApi from "../hooks/useApi";


const useComponenteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<ComponenteProp | undefined>({});

  const obtenerComponenteById = (id: string) =>
    fetchData({ url: `${COMPONENTE}/${id}`, methodo: httpMethod.GET, adapter: componenteAdapter });
/*
  const crearComponente = (data: formValuesComponente) =>
    fetchData({ url: BANCO, methodo: httpMethod.POST, bodyData: JSON.stringify(componenteDto(data)) });

  const editarComponente = (data: formValuesComponente, id: string) =>
    fetchData({ url: `${BANCO}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(componenteDto(data)) });

*/

  return { obtenerComponenteById, responseComponente: response, loadingComponente: loading, errorFetchComponente: errorFetch };

}

export default useComponenteApi
