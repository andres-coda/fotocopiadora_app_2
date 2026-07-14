import { materiaAdapter } from "../../adaptadores/entrada/materia.adapter";
import { MateriaAdapterProp, MateriaProp } from "../../modelo/Entidades/libro/materia.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { MATERIA } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const useMateriasApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<MateriaAdapterProp, MateriaProp>({adapterGet: materiaAdapter});

  const obtenerMaterias = () =>
    fetchData({ url: MATERIA, methodo: httpMethod.GET, adapter: materiaAdapter });

  return { obtenerMaterias, responseMaterias: response, loadingMaterias: loading, errorFetchMaterias: errorFetch };

}

export default useMateriasApi