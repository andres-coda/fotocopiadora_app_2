import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { MATERIA } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const useMateriaDeleteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<boolean>({});

  const eliminarMateria = (id: string) =>
    fetchData({ url: `${MATERIA}/${id}`, methodo: httpMethod.DELETE });

  return { eliminarMateria, responseMateria: response, loadingMateria: loading, errorFetchMateria: errorFetch };

}

export default useMateriaDeleteApi
