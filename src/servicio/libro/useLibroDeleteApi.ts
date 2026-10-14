import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { LIBRO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";
import { formValuesLibroComponentes, formValuesLibroNombre } from "../../modelo/Entidades/libro/esqLibro.esquema";

interface EditarLibroPrincipalProp {
  id: string;
  data: formValuesLibroNombre;
  componentes: formValuesLibroComponentes;
}

const useLibroDeleteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<boolean>({});

  const eliminarLibro = (id: string) =>
    fetchData({ url: `${LIBRO}/${id}`, methodo: httpMethod.DELETE });

  const editarLibroPrincipal = ({ data, componentes, id }: EditarLibroPrincipalProp) =>
    fetchData({ url: `${LIBRO_PRINCIPAL}/${id}`, methodo: httpMethod.PATCH, bodyData: JSON.stringify(libroPrincipalDtoAdapter( data, componentes))});

  return { eliminarLibro, editarLibroPrincipal, responseLibro: response, loadingLibro: loading, errorFetchLibro: errorFetch };

}

export default useLibroDeleteApi
