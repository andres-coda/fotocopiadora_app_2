import { useEffect } from "react";
import { clienteAdapter } from "../../adaptadores/entrada/cliente.adapter";
import { clienteDtoAdapter } from "../../adaptadores/salida/clienteDto.adapter";
import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { formValuesCliente } from "../../modelo/Entidades/cliente/esqCliente.esquema";
import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";
import { CLIENTE, CLIENTE_ID } from "../../utils/endpoint";
import useApi from "../hooks/useApi";
import { limiteDefecto } from "../../utils/constantes";


const useClienteApi = (clienteId?: string) => {
  const { fetchData, response, loading, errorFetch } = useApi<ClienteProp | undefined>({});

  const obtenerClienteById = (id: string, orden?:string,limite?: number, pagina?: number) =>
    fetchData({ url: `${CLIENTE_ID}/${id}?limite=${limite ?? limiteDefecto}&pagina=${pagina ?? 1}&orden=${orden ? orden: ''}`, methodo: httpMethod.GET, adapter: clienteAdapter });

  const crearCliente = (data: formValuesCliente) =>
    fetchData({ url: CLIENTE, methodo: httpMethod.POST, bodyData: JSON.stringify(clienteDtoAdapter(data)), adapter: clienteAdapter });

  const editarCliente = (data: formValuesCliente, id: string) =>
    fetchData({ url: `${CLIENTE}/${id}`, methodo: httpMethod.PUT, bodyData: JSON.stringify(clienteDtoAdapter(data)), adapter: clienteAdapter });

  useEffect(() => {
    if (clienteId) {
      obtenerClienteById(clienteId);
    }
  }, []);

  return { obtenerClienteById, crearCliente, editarCliente, responseCliente: response, loadingCliente: loading, errorFetchCliente: errorFetch };

}

export default useClienteApi
