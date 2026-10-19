import { mensajeAdapter } from "../../adaptadores/entrada/mensaje.adapter";
import { MensajeAdapterProp, MensajeProp } from "../../modelo/Entidades/mensaje/mensaje.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { MENSAJE, MENSAJE_NOMBRE } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const useMensajesApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<MensajeAdapterProp, MensajeProp>({ adapterGet: mensajeAdapter });

  const obtenerMensajesBusqueda = ({ query, limite, pagina }: BusquedaApiProp) => {
    fetchData({ url: `${MENSAJE_NOMBRE}?q=${query.trimEnd()}&limite=${limite ?? 20}&pagina=${pagina ?? 1}`, methodo: httpMethod.GET, adapter: mensajeAdapter });
  }

  const obtenerMensajes = () =>
    fetchData({ url: MENSAJE, methodo: httpMethod.GET, adapter: mensajeAdapter });

  return { obtenerMensajes, obtenerMensajesBusqueda, responseMensajes: response, loadingMensajes: loading, errorFetchMensajes: errorFetch };

}

export default useMensajesApi
