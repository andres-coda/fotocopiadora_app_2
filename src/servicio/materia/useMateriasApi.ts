import { materiaAdapter } from "../../adaptadores/entrada/materia.adapter";
import { MateriaAdapterProp, MateriaProp } from "../../modelo/Entidades/libro/materia.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { limiteDefecto } from "../../utils/constantes";
import { MATERIA, MATERIA_NOMBRE } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const useMateriasApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<MateriaAdapterProp, MateriaProp>({adapterGet: materiaAdapter});

  const obtenerMateriaBusqueda = ({query, limite, pagina}:BusquedaApiProp) => {
      fetchData({ url: `${MATERIA_NOMBRE}?q=${query.trimEnd()}&limite=${limite ?? limiteDefecto}&pagina=${pagina ?? 1}`, methodo: httpMethod.GET, adapter: materiaAdapter });
    }

  const obtenerMaterias = () =>
    fetchData({ url: MATERIA, methodo: httpMethod.GET, adapter: materiaAdapter });

  return { obtenerMateriaBusqueda, obtenerMaterias, responseMaterias: response, loadingMaterias: loading, errorFetchMaterias: errorFetch };

}

export default useMateriasApi