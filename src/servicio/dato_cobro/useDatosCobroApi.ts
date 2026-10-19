import { datoCobroAdapter } from "../../adaptadores/entrada/datoCobro.adapter";
import { DatoCobroAdapterProp, DatoCobroProp } from "../../modelo/Entidades/dato_cobro/datoCobro.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { DATO_COBRO, DATO_COBRO_NOMBRE } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const useDatosCobroApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<DatoCobroAdapterProp, DatoCobroProp>({ adapterGet: datoCobroAdapter });

  const obtenerDatosCobroBusqueda = ({ query, limite, pagina }: BusquedaApiProp) => {
    fetchData({ url: `${DATO_COBRO_NOMBRE}?q=${query.trimEnd()}&limite=${limite ?? 20}&pagina=${pagina ?? 1}`, methodo: httpMethod.GET, adapter: datoCobroAdapter });
  }

  const obtenerDatosCobro = () =>
    fetchData({ url: DATO_COBRO, methodo: httpMethod.GET, adapter: datoCobroAdapter });

  return { obtenerDatosCobro, obtenerDatosCobroBusqueda, responseDatosCobro: response, loadingDatosCobro: loading, errorFetchDatosCobro: errorFetch };

}

export default useDatosCobroApi
