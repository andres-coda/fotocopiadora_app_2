import { solicitudAdapter } from "../../adaptadores/entrada/solicitud.adapter";
import { SolicitudProp } from "../../modelo/Entidades/solicitud/solicitud.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { SOLICITUD } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

interface Prop{
  id:string;
  estado: number;
  observaciones?: string
}

const useSolicitudApi = () => {
  const { fetchData, response, loading, errorFetch } =
    useApi<SolicitudProp | undefined>({});


  const obtenerSolicitud = (id: string) =>
    fetchData({ url: `${SOLICITUD}/${id}`, methodo: httpMethod.GET, adapter: solicitudAdapter });

  const resolverPeticion = ({id, estado, observaciones}:Prop) =>
    fetchData({
      url: `${SOLICITUD}/peticion/${id}`,
      methodo: httpMethod.PATCH,
      bodyData: JSON.stringify({ estado, observaciones }),
      adapter: solicitudAdapter,
    });

  return {
    resolverPeticion, 
    obtenerSolicitud, 
    responseSolicitud: response, 
    errorFethcSolicitud: errorFetch, 
    loadingSolicitud: loading
  }

}

export default useSolicitudApi
