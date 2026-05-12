import { clienteAdapter } from "../../adaptadores/entrada/cliente.adapter";
import { clienteDtoAdapter } from "../../adaptadores/salida/clienteDto.adapter";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { formValuesCliente } from "../../modelo/Entidades/cliente/esqCliente.esquema";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { CLIENTE } from "../../utils/endpoint";
import useApi from "../hooks/useApi";


const useClienteApi = () => {
  const { fetchData, response, loading, errorFetch } = useApi<ClienteProp | undefined>({});

  const obtenerClienteById = (id: string) =>
    fetchData({ url: `${CLIENTE}/${id}`, methodo: httpMethod.GET, adapter: clienteAdapter });

  const crearCliente = (data: formValuesCliente) =>
    fetchData({ url: CLIENTE, methodo: httpMethod.POST, bodyData: JSON.stringify(clienteDtoAdapter(data)) });

  const editarCliente = (data: formValuesCliente, id: string) =>
    fetchData({ url: `${CLIENTE}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(clienteDtoAdapter(data)) });


  return { obtenerClienteById, crearCliente, editarCliente, responseCliente: response, loadingCliente: loading, errorFetchCliente: errorFetch };

}

export default useClienteApi
