import { materiaAdapter } from "../../adaptadores/entrada/materia.adapter";
import { MateriaProp } from "../../modelo/Entidades/libro/materia.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { MATERIA } from "../../utils/endpoint";
import useApi from "../hooks/useApi";


const useMateriaApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<MateriaProp | undefined>({});

  const obtenerMateriaById = (id: string) =>
    fetchData({ url: `${MATERIA}/${id}`, methodo: httpMethod.GET, adapter: materiaAdapter });
/*
  const crearMateria = (data: formValuesMateria) =>
    fetchData({ url: BANCO, methodo: httpMethod.POST, bodyData: JSON.stringify(materiaDto(data)) });

  const editarMateria = (data: formValuesMateria, id: string) =>
    fetchData({ url: `${BANCO}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(materiaDto(data)) });

*/

  return { obtenerMateriaById, responseMateria: response, loadingMateria: loading, errorFetchMateria: errorFetch };

}

export default useMateriaApi