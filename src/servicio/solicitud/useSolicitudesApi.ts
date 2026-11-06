import { httpMethod } from '../../modelo/HTTP/HttpMethod.enum';
import { SOLICITUD } from '../../utils/endpoint';
import useApiPaginado from '../hooks/useApiPaginado';
import useApi from '../hooks/useApi';

export interface SolicitudFront {
  id: string;
  idLibroCompleto: string;
  nombreLibro: string;
  fechaCreacion: string;
  fechaResolucion: string | null;
  idUsuario: string;
  nombreUsuario: string;
  estado: number;
  idEmpresa: string;
  peticiones: {
    id: string;
    campo: string;
    valorAnterior: string | null;
    valorNuevo: string | null;
    observaciones: string | null;
    estado: number;
  }[];
}

const useSolicitudesApi = () => {
  const { fetchData: fetchList, response: responseList, loading: loadingList, errorFetch: errorList } =
    useApiPaginado<SolicitudFront, SolicitudFront>({ adapterGet: (d: any) => d });

  const { fetchData: fetchOne, response: responseOne, loading: loadingOne, errorFetch: errorOne } =
    useApi<SolicitudFront | undefined>({});

  const { fetchData: fetchResolver, response: responseResolver, loading: loadingResolver, errorFetch: errorResolver } =
    useApi<SolicitudFront | undefined>({});

  const obtenerSolicitudes = (p?: { limite?: number; pagina?: number }) =>
    fetchList({
      url: `${SOLICITUD}?limite=${p?.limite ?? 20}&pagina=${p?.pagina ?? 1}`,
      methodo: httpMethod.GET,
      adapter: (d: any) => d,
    });

  const obtenerSolicitud = (id: string) =>
    fetchOne({ url: `${SOLICITUD}/${id}`, methodo: httpMethod.GET });

  const resolverSolicitud = (id: string, estado: number, observaciones?: string) =>
    fetchResolver({
      url: `${SOLICITUD}/${id}`,
      methodo: httpMethod.PATCH,
      bodyData: JSON.stringify({ estado, observaciones }),
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