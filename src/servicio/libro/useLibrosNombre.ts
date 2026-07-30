import { libroNombreAdapter } from "../../adaptadores/entrada/libro.adapter";
import { LibroNombreAdapterProp, LibroNombreProp } from "../../modelo/Entidades/libro/libro.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { limiteDefecto } from "../../utils/constantes";
import { LIBRO_NOMBRE } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const useLibroNombreApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<LibroNombreAdapterProp, LibroNombreProp>({adapterGet: libroNombreAdapter});

  const obtenerLibrosNombre = ({query, limite, pagina}:BusquedaApiProp) => {
    fetchData({ url: `${LIBRO_NOMBRE}?q=${query.trimEnd()}&limite=${limite ?? limiteDefecto}&pagina=${pagina ?? 1}`, methodo: httpMethod.GET, adapter: libroNombreAdapter });
  }

  return { obtenerLibrosNombre, responseLibros: response, loadingLibros: loading, errorFetchLibros: errorFetch };

}

export default useLibroNombreApi;