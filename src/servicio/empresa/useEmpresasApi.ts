import { empresaAdapter } from "../../adaptadores/entrada/empresa.adapter";
import { EmpresaAdapterProp, EmpresaProp } from "../../modelo/Entidades/empresa/empresa.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { limiteDefecto } from "../../utils/constantes";
import { EMPRESA } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const useEmpresasApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<
    EmpresaAdapterProp,
    EmpresaProp
  >({ adapterGet: empresaAdapter });

  const obtenerEmpresaBusqueda = ({ query, limite, pagina }: BusquedaApiProp) => {
    fetchData({
      url: `${EMPRESA}?q=${query.trimEnd()}&limite=${limite ?? limiteDefecto}&pagina=${pagina ?? 1}`,
      methodo: httpMethod.GET,
      adapter: empresaAdapter,
    });
  };

  return {obtenerEmpresaBusqueda, responseEmpresa:response, errorFetchEmpresa: errorFetch, loadingEmpresa: loading}

}

export default useEmpresasApi
