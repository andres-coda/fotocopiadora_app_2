import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { SOLICITUD } from '../../utils/endpoint';
import useApiPaginado from '../hooks/useApiPaginado';
import { solicitudAdapter } from '../../adaptadores/entrada/solicitud.adapter';
import { SolicitudAdapterProp, SolicitudProp } from '../../modelo/Entidades/solicitud/solicitud.interface';

// SolicitudFront removed; using SolicitudProp from the modelo.
const useSolicitudesApi = () => {
  const { fetchData: fetchList, response, loading, errorFetch } =
    useApiPaginado<SolicitudAdapterProp, SolicitudProp>({ adapterGet: solicitudAdapter });

  const obtenerSolicitudes = (p?: { limite?: number; pagina?: number }) =>
    fetchList({
      url: `${SOLICITUD}?limite=${p?.limite ?? 20}&pagina=${p?.pagina ?? 1}`,
      methodo: httpMethod.GET,
      adapter: solicitudAdapter,
    });


  return {
    obtenerSolicitudes,
    responseSolicitudes: response,
    loadingSolicitudes: loading,
    errorSolicitudes: errorFetch,
  };
};

export default useSolicitudesApi;