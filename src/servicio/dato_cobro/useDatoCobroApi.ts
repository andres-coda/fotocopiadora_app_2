import { datoCobroAdapter } from '../../adaptadores/entrada/datoCobro.adapter';
import { datoCobroDtoAdapter } from '../../adaptadores/salida/datoCobroDto.adapter';
import { DatoCobroProp } from '../../modelo/Entidades/dato_cobro/datoCobro.interface';
import { formValuesDatoCobro } from '../../modelo/Entidades/dato_cobro/esqDatoCobro.esquema';
import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { DATO_COBRO } from '../../utils/endpoint';
import useApi from '../hooks/useApi';

const useDatoCobroApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<DatoCobroProp | undefined>({});

  const obtenerDatoCobroById = (id: string) =>
    fetchData({ url: `${DATO_COBRO}/${id}`, methodo: httpMethod.GET, adapter: datoCobroAdapter });

  const crearDatoCobro = (data: formValuesDatoCobro) =>
    fetchData({
      url: DATO_COBRO,
      methodo: httpMethod.POST,
      bodyData: JSON.stringify(datoCobroDtoAdapter(data)),
      adapter: datoCobroAdapter,
    });

  const editarDatoCobro = (data: formValuesDatoCobro, id: string) =>
    fetchData({
      url: `${DATO_COBRO}/${id}`,
      methodo: httpMethod.PUT,
      bodyData: JSON.stringify(datoCobroDtoAdapter(data)),
      adapter: datoCobroAdapter,
    });

  // El back devuelve un body JSON (true) tambien en el DELETE.
  const eliminarDatoCobro = (id: string) =>
    fetchData({
      url: `${DATO_COBRO}/${id}`,
      methodo: httpMethod.DELETE,
      adapter: datoCobroAdapter,
    });

  return {
    obtenerDatoCobroById,
    crearDatoCobro,
    editarDatoCobro,
    eliminarDatoCobro,
    responseDatoCobro: response,
    loadingDatoCobro: loading,
    errorFetchDatoCobro: errorFetch,
  };
};

export default useDatoCobroApi;
