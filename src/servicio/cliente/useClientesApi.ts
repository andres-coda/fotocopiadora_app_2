import { clienteAdapter } from "../../adaptadores/entrada/cliente.adapter";
import { ClienteAdapterProp, ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { BusquedaApiProp } from "../../modelo/HTTP/peticiones.interface";
import { CLIENTE } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const useClientesApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<ClienteAdapterProp, ClienteProp>({ adapterGet: clienteAdapter });

  const obtenerClientesBusqueda = ({ query, limite, pagina }: BusquedaApiProp) => {
    fetchData({ url: `${CLIENTE}?q=${query.trimEnd()}&limite=${limite ?? 20}&pagina=${pagina ?? 1}`, methodo: httpMethod.GET, adapter: clienteAdapter });
  }

  const obtenerClientes = () =>
    fetchData({ url: CLIENTE, methodo: httpMethod.GET, adapter: clienteAdapter });

  return { obtenerClientes, obtenerClientesBusqueda, responseClientes: response, loadingClientes: loading, errorFetchClientes: errorFetch };

}

export default useClientesApi