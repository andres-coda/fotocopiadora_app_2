import { libroAdapter } from "../../adaptadores/entrada/libro.adapter";
import { libroDtoAdapter, libroEmpresaEditarDtoAdapter, libroExtraDtoAdapter, libroPrincipalDtoAdapter } from "../../adaptadores/salida/libroDto.adapter";
import { Especificaciones } from "../../modelo/Entidades/especificacion/especificacion.enum";
import { formValuesLibro, formValuesLibroComponentes, formValuesLibroDatosExtras, formValuesLibroDatosLocales, formValuesLibroNombre } from "../../modelo/Entidades/libro/esqLibro.esquema";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { LIBRO, LIBRO_EXTRA, LIBRO_PRINCIPAL } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

export interface CrearLibroProp {
  data: formValuesLibro;
  especificaciones: Especificaciones[];
}

export interface EditarLibroLocalProp {
  data: formValuesLibroDatosLocales;
  especificaciones: Especificaciones[];
  id: string;
}
interface EditarLibroExtraProp {
  id: string;
  data: formValuesLibroDatosExtras;
}

interface EditarLibroPrincipalProp {
  id: string;
  data: formValuesLibroNombre;
  componentes: formValuesLibroComponentes;
}

const useLibroApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<LibroProp | undefined>({});

  const obtenerLibroById = (id: string) =>
    fetchData({ url: `${LIBRO}/${id}`, methodo: httpMethod.GET, adapter: libroAdapter });

  const crearLibro = ({ data, especificaciones }: CrearLibroProp) =>
    fetchData({ url: LIBRO, methodo: httpMethod.POST, bodyData: JSON.stringify(libroDtoAdapter({ data, especificaciones })), adapter: libroAdapter });

  const editarLibroEmpresa = ({ data, id, especificaciones }: EditarLibroLocalProp) =>
    fetchData({ url: `${LIBRO}/${id}`, methodo: httpMethod.PATCH, bodyData: JSON.stringify(libroEmpresaEditarDtoAdapter({ data, especificaciones })), adapter: libroAdapter });

  const editarLibroExtra = ({ data, id }: EditarLibroExtraProp) =>
    fetchData({ url: `${LIBRO_EXTRA}/${id}`, methodo: httpMethod.PATCH, bodyData: JSON.stringify(libroExtraDtoAdapter( data)), adapter: libroAdapter });

  const editarLibroPrincipal = ({ data, componentes, id }: EditarLibroPrincipalProp) =>
    fetchData({ url: `${LIBRO_PRINCIPAL}/${id}`, methodo: httpMethod.PATCH, bodyData: JSON.stringify(libroPrincipalDtoAdapter( data, componentes)), adapter: libroAdapter });


  return { editarLibroExtra, editarLibroPrincipal, obtenerLibroById, editarLibroEmpresa, crearLibro, responseLibro: response, loadingLibro: loading, errorFetchLibro: errorFetch };

}

export default useLibroApi