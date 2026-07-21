import { propuestaAdapter } from "../../adaptadores/entrada/propuesta.adapter";
import { PropuestaAdapterProp, PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { PROPUESTA } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const usePropuestasApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<PropuestaAdapterProp, PropuestaProp>({adapterGet:propuestaAdapter});

  const obtenerPropuestaBusqueda = ({ query, limite, pagina }: BusquedaApiProp) => {
    fetchData({ url: `${PROPUESTA}?limite=${limite ?? 20}&pagina=${pagina ?? 1}&q=${query}`, methodo: httpMethod.GET, adapter: propuestaAdapter });
  }

  const obtenerPropuestas = () =>
    fetchData({ url: PROPUESTA, methodo: httpMethod.GET, adapter: propuestaAdapter });

  return { obtenerPropuestas, obtenerPropuestaBusqueda,responsePropuestas: response, loadingPropuestas: loading, errorFetchPropuestas: errorFetch };

}

export default usePropuestasApi