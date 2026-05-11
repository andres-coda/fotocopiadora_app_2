import { clienteAdapterArray } from "../../adaptadores/entrada/cliente.adapter";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { CLIENTE } from "../../utils/endpoint";
import useApi from "../hooks/useApi";

const useClientesApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<ClienteProp[]>({});

  const obtenerClientes = () =>
    fetchData({ url: CLIENTE, methodo: httpMethod.GET, adapter: clienteAdapterArray });

  return { obtenerClientes, responseClientes: response, loadingClientes: loading, errorFetchClientes: errorFetch };

}

export default useClientesApi