import { libroAdapter } from "../../adaptadores/entrada/libro.adapter";
import { LibroAdapterProp, LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { limiteDefecto } from "../../utils/constantes";
import { LIBRO } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const useLibrosApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<LibroAdapterProp, LibroProp>({adapterGet: libroAdapter});

  const obtenerLibrosBusqueda = ({query, limite, pagina}:BusquedaApiProp) => {
    fetchData({ url: `${LIBRO}?q=${query.trimEnd()}&limite=${limite ?? limiteDefecto}&pagina=${pagina ?? 1}`, methodo: httpMethod.GET, adapter: libroAdapter });
  }

  const obtenerLibros = () =>
    fetchData({ url: `${LIBRO}?limite=${limiteDefecto}`, methodo: httpMethod.GET, adapter: libroAdapter });

  return { obtenerLibros, obtenerLibrosBusqueda, responseLibros: response, loadingLibros: loading, errorFetchLibros: errorFetch };

}

export default useLibrosApi