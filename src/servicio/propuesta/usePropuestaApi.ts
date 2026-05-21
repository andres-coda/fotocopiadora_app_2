import { propuestaAdapter } from "../../adaptadores/entrada/propuesta.adapter";
import { PropuestaProp } from "../../modelo/Entidades/propuesta/propuesta.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { formValuesPropuesta } from "../../modelo/Entidades/propuesta/esqPropuesta.esquema";
import { LIBRO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";
import { propuestaDtoAdapter } from "../../adaptadores/salida/propuestaDto.adapter";


const usePropuestaApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<PropuestaProp | undefined>({});

  const obtenerPropuestaById = (id: string) =>
    fetchData({ url: `${LIBRO}/${id}`, methodo: httpMethod.GET, adapter: propuestaAdapter });

  const crearPropuesta = (data: formValuesPropuesta, libros: string[]) =>
    fetchData({ url: LIBRO, methodo: httpMethod.POST, bodyData: JSON.stringify(propuestaDtoAdapter(data, libros)), adapter: propuestaAdapter });

  const editarPropuesta = (data: formValuesPropuesta, id: string, libros:string[]) =>
    fetchData({ url: `${LIBRO}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(propuestaDtoAdapter(data,libros)), adapter: propuestaAdapter });



  return { obtenerPropuestaById, editarPropuesta, crearPropuesta, responsePropuesta: response, loadingPropuesta: loading, errorFetchPropuesta: errorFetch };

}

export default usePropuestaApi