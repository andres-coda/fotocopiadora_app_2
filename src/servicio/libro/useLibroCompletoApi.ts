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
    // Ojo: `${cond && `&x=${x}`}` dentro de un template literal NO omite el
    // parametro cuando `cond` es undefined: renderiza la palabra "undefined".
    // Asi se enviaba `pagina=2undefined`, el back no podia parsearla y devolvia
    // la pagina 1 otra vez.
    const params = new URLSearchParams({
      limite: String(limite ?? limiteDefecto),
      pagina: String(pagina ?? 1),
    });
    if (nombre) params.set('nombre', nombre);
    if (componentes) params.set('comp', componentes);
    if (nivel) params.set('nivel', nivel);

    fetchData({
      url: `${LIBRO_COMPLETO}/${id}?${params.toString()}`,
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