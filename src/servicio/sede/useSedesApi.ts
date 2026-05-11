import { sedeAdapterArray } from "../../adaptadores/entrada/sede.adapter";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { SEDE } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const useSedesApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<SedeProp[]>({});

  const obtenerSedes = () =>
    fetchData({ url: SEDE, methodo: httpMethod.GET, adapter: sedeAdapterArray });

  return { obtenerSedes, responseSedes: response, loadingSedes: loading, errorFetchSedes: errorFetch };

}

export default useSedesApi