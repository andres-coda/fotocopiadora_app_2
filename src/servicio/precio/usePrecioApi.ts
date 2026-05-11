import { precioAdapter } from "../../adaptadores/entrada/precio.adapter";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PRECIO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";


const usePrecioApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<PrecioProp | undefined>({});

  const obtenerPrecioById = (id: string) =>
    fetchData({ url: `${PRECIO}/${id}`, methodo: httpMethod.GET, adapter: precioAdapter });
/*
  const crearPrecio = (data: formValuesPrecio) =>
    fetchData({ url: BANCO, methodo: httpMethod.POST, bodyData: JSON.stringify(precioDto(data)) });

  const editarPrecio = (data: formValuesPrecio, id: string) =>
    fetchData({ url: `${BANCO}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(precioDto(data)) });

*/

  return { obtenerPrecioById, responsePrecio: response, loadingPrecio: loading, errorFetchPrecio: errorFetch };

}

export default usePrecioApi
