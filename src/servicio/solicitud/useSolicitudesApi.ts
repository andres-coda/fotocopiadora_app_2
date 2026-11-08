import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { SOLICITUD } from '../../utils/endpoint';
import useApiPaginado from '../hooks/useApiPaginado';
import useApi from '../hooks/useApi';
import { solicitudAdapter } from '../../adaptadores/entrada/solicitud.adapter';
import { SolicitudAdapterProp, SolicitudProp } from '../../modelo/Entidades/solicitud/solicitud.interface';

// SolicitudFront removed; using SolicitudProp from the modelo.
const useSolicitudesApi = () => {
  const { fetchData: fetchList, response: responseList, loading: loadingList, errorFetch: errorList } =
    useApiPaginado<SolicitudAdapterProp, SolicitudProp>({ adapterGet: solicitudAdapter });

  const { fetchData: fetchOne, response: responseOne, loading: loadingOne, errorFetch: errorOne } =
    useApi<SolicitudProp | undefined>({});

  const { fetchData: fetchResolver, response: responseResolver, loading: loadingResolver, errorFetch: errorResolver } =
    useApi<SolicitudProp | undefined>({});

  const obtenerSolicitudes = (p?: { limite?: number; pagina?: number }) =>
    fetchList({
      url: `${SOLICITUD}?limite=${p?.limite ?? 20}&pagina=${p?.pagina ?? 1}`,
      methodo: httpMethod.GET,
      adapter: solicitudAdapter,
    });

  const obtenerSolicitud = (id: string) =>
    fetchOne({ url: `${SOLICITUD}/${id}`, methodo: httpMethod.GET, adapter: solicitudAdapter });

  const resolverSolicitud = (id: string, estado: number, observaciones?: string) =>
    fetchResolver({
      url: `${SOLICITUD}/${id}`,
      methodo: httpMethod.PATCH,
      bodyData: JSON.stringify({ estado, observaciones }),
      adapter: solicitudAdapter,
    });

  return {
    obtenerSolicitudes,
    obtenerSolicitud,
    resolverSolicitud,
    responseSolicitudes: responseList,
    responseSolicitud: responseOne,
    responseResolver,
    loadingSolicitudes: loadingList,
    loadingSolicitud: loadingOne,
    loadingResolver,
    errorSolicitudes: errorList,
    errorSolicitud: errorOne,
    errorResolver,
  };
};

export default useSolicitudesApi;