import { especificacionAdapter } from "../../adaptadores/entrada/especificacion.adapter";
import { EspecificacionProp } from "../../modelo/Entidades/especificacion/especificacion.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { ESPECIFICACION } from "../../utils/endpoint";
import useApi from "../hooks/useApi";


const useEspecificacionApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<EspecificacionProp | undefined>({});

  const obtenerEspecificacionById = (id: string) =>
    fetchData({ url: `${ESPECIFICACION}/${id}`, methodo: httpMethod.GET, adapter: especificacionAdapter });
/*
  const crearEspecificacion = (data: formValuesEspecificacion) =>
    fetchData({ url: BANCO, methodo: httpMethod.POST, bodyData: JSON.stringify(especificacionDto(data)) });

  const editarEspecificacion = (data: formValuesEspecificacion, id: string) =>
    fetchData({ url: `${BANCO}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(especificacionDto(data)) });

*/

  return { obtenerEspecificacionById, responseEspecificacion: response, loadingEspecificacion: loading, errorFetchEspecificacion: errorFetch };

}

export default useEspecificacionApi
