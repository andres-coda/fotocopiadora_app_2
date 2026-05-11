import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { COMPONENTE } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const useComponenteDeleteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<boolean>({});

  const eliminarComponente = (id: string) =>
    fetchData({ url: `${COMPONENTE}/${id}`, methodo: httpMethod.DELETE });

  return { eliminarComponente, responseComponente: response, loadingComponente: loading, errorFetchComponente: errorFetch };

}

export default useComponenteDeleteApi
