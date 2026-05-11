import { libroAdapterArray } from "../../adaptadores/entrada/libro.adapter";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { LIBRO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const useLibrosApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<LibroProp[]>({});

  const obtenerLibros = () =>
    fetchData({ url: LIBRO, methodo: httpMethod.GET, adapter: libroAdapterArray });

  return { obtenerLibros, responseLibros: response, loadingLibros: loading, errorFetchLibros: errorFetch };

}

export default useLibrosApi