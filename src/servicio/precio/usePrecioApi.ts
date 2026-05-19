import { precioAdapter } from "../../adaptadores/entrada/precio.adapter";
import { precioDtoAdapter } from "../../adaptadores/salida/precioDto.adapter";
import { formValuesPrecio } from "../../modelo/Entidades/precio/esqPrecio.esquema";
import { PrecioProp } from "../../modelo/Entidades/precio/precio.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { PRECIO } from "../../utils/endpoint";
import useApi from "../hooks/useApi";


const usePrecioApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<PrecioProp | undefined>({});

  const obtenerPrecioById = (id: string) =>
    fetchData({ url: `${PRECIO}/${id}`, methodo: httpMethod.GET, adapter: precioAdapter });

  const crearPrecio = (data: formValuesPrecio) =>
    fetchData({ url: PRECIO, methodo: httpMethod.POST, bodyData: JSON.stringify(precioDtoAdapter(data)), adapter: precioAdapter });

  const editarPrecio = (data: formValuesPrecio, id: string) =>
    fetchData({ url: `${PRECIO}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(precioDtoAdapter(data)), adapter: precioAdapter });



  return { obtenerPrecioById, editarPrecio, crearPrecio, responsePrecio: response, loadingPrecio: loading, errorFetchPrecio: errorFetch };

}

export default usePrecioApi
