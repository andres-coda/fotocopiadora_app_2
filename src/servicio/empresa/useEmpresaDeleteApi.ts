import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { EMPRESA } from "../../utils/endpoint";
import useApi from "../hooks/useApi";


const useEmpresaDeleteApi = () => {

  const { fetchData, response, loading, errorFetch } = useApi<boolean>({});

  const eliminarEmpresa = (id: string) =>
    fetchData({ url: `${EMPRESA}/${id}`, methodo: httpMethod.DELETE });

  return {
    eliminarEmpresa,
    responseEmpresa: response,
    loadingEmpresa: loading,
    errorFetchEmpresa: errorFetch,
  };
};


export default useEmpresaDeleteApi
