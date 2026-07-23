import { sedeAdapter } from "../../adaptadores/entrada/sede.adapter";
import { SedeAdapterProp, SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { SEDE } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const useSedesApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<SedeAdapterProp, SedeProp>({ adapterGet: sedeAdapter });

  const obtenerSedesBusqueda = ({ query, limite, pagina }: BusquedaApiProp) => {
    fetchData({ url: `${SEDE}?q=${query.trimEnd()}&limite=${limite ?? 20}&pagina=${pagina ?? 1}`, methodo: httpMethod.GET, adapter: sedeAdapter });
  }

  const obtenerSedes = () =>
    fetchData({ url: SEDE, methodo: httpMethod.GET, adapter: sedeAdapter });

  return { obtenerSedes, obtenerSedesBusqueda, responseSedes: response, loadingSedes: loading, errorFetchSedes: errorFetch };

}

export default useSedesApi