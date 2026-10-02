import { libroAdapter } from "../../adaptadores/entrada/libro.adapter";
import { libroDtoAdapter, libroEmpresaEditarDtoAdapter } from "../../adaptadores/salida/libroDto.adapter";
import { Especificaciones } from "../../modelo/Entidades/especificacion/especificacion.enum";
import { formValuesLibro, formValuesLibroDatosLocales } from "../../modelo/Entidades/libro/esqLibro.esquema";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { LIBRO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

export interface CrearLibroProp{
  data:formValuesLibro;
  especificaciones: Especificaciones[];
}

export interface EditarLibroLocalProp{
  data:formValuesLibroDatosLocales;
  especificaciones: Especificaciones[];
  id:string;
}

const useLibroApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<LibroProp | undefined>({});

  const obtenerLibroById = (id: string) =>
    fetchData({ url: `${LIBRO}/${id}`, methodo: httpMethod.GET, adapter: libroAdapter });

  const crearLibro = ({data, especificaciones}:CrearLibroProp) =>
    fetchData({ url: LIBRO, methodo: httpMethod.POST, bodyData: JSON.stringify(libroDtoAdapter({data, especificaciones})), adapter: libroAdapter  });

  const editarLibroEmpresa = ({data, id, especificaciones}:EditarLibroLocalProp) =>
    fetchData({ url: `${LIBRO}/${id}`, methodo: httpMethod.PATCH, bodyData: JSON.stringify(libroEmpresaEditarDtoAdapter({data,especificaciones})), adapter: libroAdapter  });



  return { obtenerLibroById, editarLibroEmpresa, crearLibro, responseLibro: response, loadingLibro: loading, errorFetchLibro: errorFetch };

}

export default useLibroApi