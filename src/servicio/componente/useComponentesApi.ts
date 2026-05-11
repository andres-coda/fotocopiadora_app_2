import { componenteAdapterArray } from "../../adaptadores/entrada/componente.adapter";
import { ComponenteProp } from "../../modelo/Entidades/libro/componente.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { COMPONENTE } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const useComponentesApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<ComponenteProp[]>({});

  const obtenerComponentes = () =>
    fetchData({ url: COMPONENTE, methodo: httpMethod.GET, adapter: componenteAdapterArray });

  return { obtenerComponentes, responseComponentes: response, loadingComponentes: loading, errorFetchComponentes: errorFetch };

}

export default useComponentesApi