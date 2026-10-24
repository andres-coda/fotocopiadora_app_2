import { configuracionAdapter } from '../../adaptadores/entrada/empresa.adapter';
import { configEntregaDtoAdapter, configuracionDtoAdapter } from '../../adaptadores/salida/configuracionDto.adapter';
import { ConfiguracionProp } from '../../modelo/Entidades/configuracion/configuracion.interface';
import { formValuesConfigEntrega, formValuesConfiguracion } from '../../modelo/Entidades/configuracion/esqConfiguracion.esquema';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { CONFIGURACION } from '../../utils/endpoint';
import useApi from '../hooks/useApi';

const useConfiguracionApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<ConfiguracionProp | undefined>({});

  // El controller responde 200 con ConfiguracionRetorno completo (relaciones
  // resueltas con nombre), por eso se le puede poner adapter.
  const editarConfiguracion = (data: formValuesConfiguracion) =>
    fetchData({
      url: CONFIGURACION,
      methodo: httpMethod.PUT,
      bodyData: JSON.stringify(configuracionDtoAdapter(data)),
      adapter: configuracionAdapter,
    });

  const obtenerConfiguracion = () =>
    fetchData({ url: CONFIGURACION, methodo: httpMethod.GET, adapter: configuracionAdapter });

  const cambiarFechaEntrega = (data: formValuesConfigEntrega) => fetchData({
      url: CONFIGURACION,
      methodo: httpMethod.PUT,
      bodyData: JSON.stringify(configEntregaDtoAdapter(data)),
      adapter: configuracionAdapter,
    });

  return {
    editarConfiguracion,
    obtenerConfiguracion,
    cambiarFechaEntrega,
    responseConfiguracion: response,
    loadingConfiguracion: loading,
    errorFetchConfiguracion: errorFetch,
  };
};

export default useConfiguracionApi;
