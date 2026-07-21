import { precioAdapter } from "../../adaptadores/entrada/precio.adapter";
import { PrecioAdapterProp, PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { PRECIO } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const usePreciosApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<PrecioAdapterProp, PrecioProp>({adapterGet: precioAdapter});

  const obtenerPreciosBusqueda = ({query, limite, pagina}:BusquedaApiProp) => {
      fetchData({ url: `${PRECIO}?q=${query.trimEnd()}&limite=${limite ?? 20}&pagina=${pagina ?? 1}`, methodo: httpMethod.GET, adapter: precioAdapter });
    }

  const obtenerPrecios = () =>
      fetchData({ url: PRECIO, methodo: httpMethod.GET, adapter: precioAdapter });
  

  return { obtenerPreciosBusqueda, obtenerPrecios, responsePrecios: response, loadingPrecios: loading, errorFetchPrecios: errorFetch };

}

export default usePreciosApi