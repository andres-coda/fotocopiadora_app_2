import { nivelAdapter } from "../../adaptadores/entrada/nivel.adapter";
import { NivelAdapterProp, NivelProp } from "../../modelo/Entidades/libro/nivel.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { limiteDefecto } from "../../utils/constantes";
import { NIVEL } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const useNivelApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<NivelAdapterProp, NivelProp>({adapterGet: nivelAdapter});

  const obtenerNivels = ({query, limite, pagina}:BusquedaApiProp) => {
    fetchData({ url: `${NIVEL}?q=${query.trimEnd()}&limite=${limite ?? limiteDefecto}&pagina=${pagina ?? 1}`, methodo: httpMethod.GET, adapter: nivelAdapter });
  }

  return { obtenerNivels, responseNivels: response, loadingNivels: loading, errorFetchNivels: errorFetch };

}

export default useNivelApi;