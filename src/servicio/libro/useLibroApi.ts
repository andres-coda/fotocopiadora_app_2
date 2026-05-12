import { libroAdapter } from "../../adaptadores/entrada/libro.adapter";
import { libroDtoAdapter } from "../../adaptadores/salida/libroDto.adapter";
import { formValuesLibro } from "../../modelo/Entidades/libro/esqLibro.esquema";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { LIBRO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";


const useLibroApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<LibroProp | undefined>({});

  const obtenerLibroById = (id: string) =>
    fetchData({ url: `${LIBRO}/${id}`, methodo: httpMethod.GET, adapter: libroAdapter });

  const crearLibro = (data: formValuesLibro) =>
    fetchData({ url: LIBRO, methodo: httpMethod.POST, bodyData: JSON.stringify(libroDtoAdapter(data)) });

  const editarLibro = (data: formValuesLibro, id: string) =>
    fetchData({ url: `${LIBRO}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(libroDtoAdapter(data)) });



  return { obtenerLibroById, editarLibro, crearLibro, responseLibro: response, loadingLibro: loading, errorFetchLibro: errorFetch };

}

export default useLibroApi