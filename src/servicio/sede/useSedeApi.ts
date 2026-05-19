import { sedeAdapter } from "../../adaptadores/entrada/sede.adapter";
import { sedeDtoAdapter } from "../../adaptadores/salida/sedeDto.adapter";
import { formValuesSede } from "../../modelo/Entidades/sede/esqSede.esquema";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { SEDE } from "../../utils/endpoint";
import useApi from "../hooks/useApi";


const useSedeApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<SedeProp | undefined>({});

  const obtenerSedeById = (id: string) =>
    fetchData({ url: `${SEDE}/${id}`, methodo: httpMethod.GET, adapter: sedeAdapter });

  const crearSede = (data: formValuesSede) =>
    fetchData({ url: SEDE, methodo: httpMethod.POST, bodyData: JSON.stringify(sedeDtoAdapter(data)), adapter: sedeAdapter });

  const editarSede = (data: formValuesSede, id: string) =>
    fetchData({ url: `${SEDE}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(sedeDtoAdapter(data)), adapter: sedeAdapter });


  return { obtenerSedeById, crearSede, editarSede, responseSede: response, loadingSede: loading, errorFetchSede: errorFetch };

}

export default useSedeApi
