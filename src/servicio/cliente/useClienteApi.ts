import { clienteAdapter } from "../../adaptadores/entrada/cliente.adapter";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { CLIENTE } from "../../utils/endpoint";
import useApi from "../hooks/useApi";


const useClienteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<ClienteProp | undefined>({});

  const obtenerClienteById = (id: string) =>
    fetchData({ url: `${CLIENTE}/${id}`, methodo: httpMethod.GET, adapter: clienteAdapter });
/*
  const crearCliente = (data: formValuesCliente) =>
    fetchData({ url: BANCO, methodo: httpMethod.POST, bodyData: JSON.stringify(clienteDto(data)) });

  const editarCliente = (data: formValuesCliente, id: string) =>
    fetchData({ url: `${BANCO}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(clienteDto(data)) });

*/

  return { obtenerClienteById, responseCliente: response, loadingCliente: loading, errorFetchCliente: errorFetch };

}

export default useClienteApi
