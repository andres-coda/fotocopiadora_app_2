import { mensajeAdapter } from '../../adaptadores/entrada/mensaje.adapter';
import {
  mensajeDtoAdapter,
  mensajeFavoritoDtoAdapter,
} from '../../adaptadores/salida/mensajeDto.adapter';
import { MensajeProp } from '../../modelo/Entidades/mensaje/mensaje.interface';
import { formValuesMensaje } from '../../modelo/Entidades/mensaje/esqMensaje.esquema';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { MENSAJE } from '../../utils/endpoint';
import useApi from '../hooks/useApi';

const useMensajeApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<MensajeProp | undefined>({});

  const obtenerMensajeById = (id: string) =>
    fetchData({ url: `${MENSAJE}/${id}`, methodo: httpMethod.GET, adapter: mensajeAdapter });

  const crearMensaje = (data: formValuesMensaje) =>
    fetchData({
      url: MENSAJE,
      methodo: httpMethod.POST,
      bodyData: JSON.stringify(mensajeDtoAdapter(data)),
      adapter: mensajeAdapter,
    });

  const editarMensaje = (data: formValuesMensaje, id: string) =>
    fetchData({
      url: `${MENSAJE}/${id}`,
      methodo: httpMethod.PUT,
      bodyData: JSON.stringify(mensajeDtoAdapter(data)),
      adapter: mensajeAdapter,
    });

  const toggleFavorito = (id: string, favorito: boolean) =>
    fetchData({
      url: `${MENSAJE}/${id}/favorito`,
      methodo: httpMethod.PUT,
      bodyData: JSON.stringify(mensajeFavoritoDtoAdapter(favorito)),
      adapter: mensajeAdapter,
    });

  // El back devuelve un body JSON (true) tambien en el DELETE.
  const eliminarMensaje = (id: string) =>
    fetchData({ url: `${MENSAJE}/${id}`, methodo: httpMethod.DELETE, adapter: mensajeAdapter });

  return {
    obtenerMensajeById,
    crearMensaje,
    editarMensaje,
    toggleFavorito,
    eliminarMensaje,
    responseMensaje: response,
    loadingMensaje: loading,
    errorFetchMensaje: errorFetch,
  };
};

export default useMensajeApi;
