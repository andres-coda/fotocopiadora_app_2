import { sedeAdapter } from "../../adaptadores/entrada/sede.adapter";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { SEDE } from "../../utils/endpoint";
import useApi from "../hooks/useApi";


const useSedeApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<SedeProp | undefined>({});

  const obtenerSedeById = (id: string) =>
    fetchData({ url: `${SEDE}/${id}`, methodo: httpMethod.GET, adapter: sedeAdapter });
/*
  const crearSede = (data: formValuesSede) =>
    fetchData({ url: BANCO, methodo: httpMethod.POST, bodyData: JSON.stringify(sedeDto(data)) });

  const editarSede = (data: formValuesSede, id: string) =>
    fetchData({ url: `${BANCO}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(sedeDto(data)) });

*/

  return { obtenerSedeById, responseSede: response, loadingSede: loading, errorFetchSede: errorFetch };

}

export default useSedeApi
