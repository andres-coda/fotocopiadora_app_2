import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { ESPECIFICACION } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const useEspecificacionDeleteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<boolean>({});

  const eliminarEspecificacion = (id: string) =>
    fetchData({ url: `${ESPECIFICACION}/${id}`, methodo: httpMethod.DELETE });

  return { eliminarEspecificacion, responseEspecificacion: response, loadingEspecificacion: loading, errorFetchEspecificacion: errorFetch };

}

export default useEspecificacionDeleteApi
