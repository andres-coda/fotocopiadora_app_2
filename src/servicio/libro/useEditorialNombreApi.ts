import { editorialNombreAdapter } from "../../adaptadores/entrada/libro.adapter";
import { EditorialNombreAdapterProp, EditorialNombreProp } from "../../modelo/Entidades/libro/libro.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { limiteDefecto } from "../../utils/constantes";
import { EDITORIAL } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const useEditorialNombreApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<EditorialNombreAdapterProp, EditorialNombreProp>({ adapterGet: editorialNombreAdapter });

  const obtenerEditorialesNombre = ({ query, limite, pagina }: BusquedaApiProp) => {
    fetchData({ url: `${EDITORIAL}?q=${query.trimEnd()}&limite=${limite ?? limiteDefecto}&pagina=${pagina ?? 1}`, methodo: httpMethod.GET, adapter: editorialNombreAdapter });
  }

  return { obtenerEditorialesNombre, responseEditoriales: response, loadingEditoriales: loading, errorFetchEditoriales: errorFetch };

}

export default useEditorialNombreApi;