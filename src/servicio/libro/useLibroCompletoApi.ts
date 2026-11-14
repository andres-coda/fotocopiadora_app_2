import { libroCompletoAdapter } from "../../adaptadores/entrada/libro.adapter";
import { LibroCompletoAdapterProp, LibroCompletoProp } from "../../modelo/Entidades/libro/libro.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { limiteDefecto } from "../../utils/constantes";
import { LIBRO_COMPLETO } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

interface BusquedaLibroCompletoProp extends Omit<BusquedaApiProp,'query'> {
  id:string, 
  nombre?:string;
  componentes?:string, 
  nivel?:string,
} 

const useLibroCompletoApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<
    LibroCompletoAdapterProp,
    LibroCompletoProp
  >({ adapterGet: libroCompletoAdapter });

  const obtenerLibrosCompleto = ({ id, nombre,componentes, nivel, limite, pagina }: BusquedaLibroCompletoProp) => {
    fetchData({
      url: `${LIBRO_COMPLETO}?id=${id}
      ${nombre && `&nombre=${nombre}`}
      ${componentes && `&comp=${componentes}`}
      ${nivel && `&nivel=${nivel}`}
      &limite=${limite ?? limiteDefecto}
      &pagina=${pagina ?? 1}`,
      methodo: httpMethod.GET,
      adapter: libroCompletoAdapter,
    });
  };

  return {
    obtenerLibrosCompleto,
    responseLibros: response,
    loadingLibros: loading,
    errorFetchLibros: errorFetch,
  };
};

export default useLibroCompletoApi;