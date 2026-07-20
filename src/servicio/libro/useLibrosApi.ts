import { libroAdapter } from "../../adaptadores/entrada/libro.adapter";
import { LibroAdapterProp, LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { LIBRO } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const useLibrosApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<LibroAdapterProp, LibroProp>({adapterGet: libroAdapter});

  const obtenerLibrosBusqueda = ({query, limite, pagina}:BusquedaApiProp) => {
    fetchData({ url: `${LIBRO}?q=${query}&limite=${limite ?? 20}&pagina=${pagina ?? 1}`, methodo: httpMethod.GET, adapter: libroAdapter });
  }

  const obtenerLibros = () =>
    fetchData({ url: LIBRO, methodo: httpMethod.GET, adapter: libroAdapter });

  return { obtenerLibros, obtenerLibrosBusqueda, responseLibros: response, loadingLibros: loading, errorFetchLibros: errorFetch };

}

export default useLibrosApi