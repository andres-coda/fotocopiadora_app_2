import { sedeAdapter } from '../../adaptadores/entrada/sede.adapter';
import { SedeProp } from '../../modelo/Entidades/sede/sede.interface';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { SEDE } from '../../utils/endpoint';
import useApi from '../hooks/useApi';

const useSedesAllApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<SedeProp[]>({});

  const obtenerSedes = () =>
    fetchData({
      url: `${SEDE}/todas`,
      methodo: httpMethod.GET,
      adapter: (data: any) =>
        Array.isArray(data) ? data.map(sedeAdapter).filter((s): s is SedeProp => !!s) : [],
    });

  return {
    obtenerSedes,
    responseSedes: response,
    loadingSedes: loading,
    errorFetchSedes: errorFetch,
  };
};

export default useSedesAllApi;