import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { SEDE } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const useSedeDeleteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<boolean>({});

  const eliminarSede = (id: string) =>
    fetchData({ url: `${SEDE}/${id}`, methodo: httpMethod.DELETE });

  return { eliminarSede, responseSede: response, loadingSede: loading, errorFetchSede: errorFetch };

}

export default useSedeDeleteApi
