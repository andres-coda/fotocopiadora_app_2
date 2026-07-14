import { clienteAdapter } from "../../adaptadores/entrada/cliente.adapter";
import { ClienteAdapterProp, ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { CLIENTE } from "../../utils/endpoint";
import useApiPaginado from "../hooks/useApiPaginado";

const useClientesApi = () => {
  const { fetchData, response, loading, errorFetch } = useApiPaginado<ClienteAdapterProp, ClienteProp>({adapterGet: clienteAdapter});

  const obtenerClientes = () =>
    fetchData({ url: CLIENTE, methodo: httpMethod.GET, adapter: clienteAdapter });

  return { obtenerClientes, responseClientes: response, loadingClientes: loading, errorFetchClientes: errorFetch };

}

export default useClientesApi