import { precioAdapterArray } from "../../adaptadores/entrada/precio.adapter";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PRECIO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const usePreciosApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<PrecioProp[]>({});

  const obtenerPrecios = () =>
    fetchData({ url: PRECIO, methodo: httpMethod.GET, adapter: precioAdapterArray });

  return { obtenerPrecios, responsePrecios: response, loadingPrecios: loading, errorFetchPrecios: errorFetch };

}

export default usePreciosApi