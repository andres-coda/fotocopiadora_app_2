import { materiaAdapterArray } from "../../adaptadores/entrada/materia.adapter";
import { MateriaProp } from "../../modelo/Entidades/libro/materia.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { MATERIA } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const useMateriasApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<MateriaProp[]>({});

  const obtenerMaterias = () =>
    fetchData({ url: MATERIA, methodo: httpMethod.GET, adapter: materiaAdapterArray });

  return { obtenerMaterias, responseMaterias: response, loadingMaterias: loading, errorFetchMaterias: errorFetch };

}

export default useMateriasApi