import { especificacionAdapterArray } from "../../adaptadores/entrada/especificacion.adapter";
import { EspecificacionProp } from "../../modelo/Entidades/especificacion/especificacion.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { ESPECIFICACION } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const useEspecificacionesApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<EspecificacionProp[]>({});

  const obtenerEspecificaciones = () =>
    fetchData({ url: ESPECIFICACION, methodo: httpMethod.GET, adapter: especificacionAdapterArray });

  return { obtenerEspecificaciones, responseEspecificaciones: response, loadingEspecificaciones: loading, errorFetchEspecificaciones: errorFetch };

}

export default useEspecificacionesApi