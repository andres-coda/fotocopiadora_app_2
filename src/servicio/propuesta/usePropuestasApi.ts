import { propuestaAdapterArray } from "../../adaptadores/entrada/propuesta.adapter";
import { PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PROPUESTA } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const usePropuestasApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<PropuestaProp[]>({});

  const obtenerPropuestas = () =>
    fetchData({ url: PROPUESTA, methodo: httpMethod.GET, adapter: propuestaAdapterArray });

  return { obtenerPropuestas, responsePropuestas: response, loadingPropuestas: loading, errorFetchPropuestas: errorFetch };

}

export default usePropuestasApi