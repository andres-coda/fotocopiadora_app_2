import { precioNombreAdapter } from "../../adaptadores/entrada/precio.adapter";
import { PrecioNombreAdapterProp, PrecioNombreProp } from "../../modelo/Entidades/precio/precio.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { PRECIO_NOMBRE } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const usePreciosNombreApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<PrecioNombreAdapterProp, PrecioNombreProp>({adapterGet: precioNombreAdapter});

  const obtenerPreciosBusqueda = ({query, limite, pagina}:BusquedaApiProp) => {
      fetchData({ url: `${PRECIO_NOMBRE}?q=${query.trimEnd()}&limite=${limite ?? 6}&pagina=${pagina ?? 1}`, methodo: httpMethod.GET, adapter: precioNombreAdapter });
    }

  return { obtenerPreciosBusqueda, responsePrecios: response, loadingPrecios: loading, errorFetchPrecios: errorFetch };

}

export default usePreciosNombreApi