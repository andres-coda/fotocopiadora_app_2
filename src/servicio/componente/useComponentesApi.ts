import { componenteAdapter } from "../../adaptadores/entrada/componente.adapter";
import { ComponenteAdapterProp, ComponenteProp } from "../../modelo/Entidades/libro/componente.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { limiteDefecto } from "../../utils/constantes";
import { COMPONENTE } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const useComponenteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<ComponenteAdapterProp, ComponenteProp>({adapterGet: componenteAdapter});

  const obtenerComponentes = ({query, limite, pagina}:BusquedaApiProp) => {
    fetchData({ url: `${COMPONENTE}?q=${query.trimEnd()}&limite=${limite ?? limiteDefecto}&pagina=${pagina ?? 1}`, methodo: httpMethod.GET, adapter: componenteAdapter });
  }

  return { obtenerComponentes, responseComponentes: response, loadingComponentes: loading, errorFetchComponentes: errorFetch };

}

export default useComponenteApi;