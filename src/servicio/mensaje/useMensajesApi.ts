import { mensajeAdapter } from '../../adaptadores/entrada/mensaje.adapter';
import { MensajeAdapterProp, MensajeProp } from '../../modelo/Entidades/mensaje/mensaje.interface';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { BusquedaApiProp } from '../../modelo/HTTP/peticiones.interface';
import { MENSAJE, MENSAJE_NOMBRE } from '../../utils/endpoint';
import useApiPaginado from '../hooks/useApiPaginado';
import useApi from '../hooks/useApi';

const useMensajesApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<
    MensajeAdapterProp,
    MensajeProp
  >({ adapterGet: mensajeAdapter });

  // useApi independiente para toggleFavorito (PUT simple sin paginacion)
  const { fetchData: fetchDataToggle } = useApi<MensajeProp | undefined>({});

  const obtenerMensajesBusqueda = ({ query, limite, pagina }: BusquedaApiProp) => {
    fetchData({
      url: `${MENSAJE_NOMBRE}?q=${query.trimEnd()}&limite=${limite ?? 20}&pagina=${pagina ?? 1}`,
      methodo: httpMethod.GET,
      adapter: mensajeAdapter,
    });
  };

  // Una pagina por vez: la pagina de mensajes usa scroll infinito.
  const obtenerMensajes = (limite: number = 20, pagina: number = 1) =>
    fetchData({
      url: `${MENSAJE}?pagina=${pagina}&limite=${limite}`,
      methodo: httpMethod.GET,
      adapter: mensajeAdapter,
    });

  const toggleFavorito = (id: string, favorito: boolean) =>
    fetchDataToggle({
      url: `${MENSAJE}/${id}`,
      methodo: httpMethod.PUT,
      bodyData: JSON.stringify({ favorito }),
      adapter: mensajeAdapter,
    });

  return {
    obtenerMensajes,
    obtenerMensajesBusqueda,
    toggleFavorito,
    responseMensajes: response,
    loadingMensajes: loading,
    errorFetchMensajes: errorFetch,
  };
};

export default useMensajesApi;
