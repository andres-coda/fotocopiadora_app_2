import { camposBusquedaCliente } from "../../filtro/cliente.filtro";
import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { ClienteAdapterProp, ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { baseAdapter } from "./base.adapter";
import { pedidoAdapterArray } from "./pedido.adapter";
import { resumenAdapter } from "./resumen.adapter";

export const clienteAdapter = (cliente?: ClienteAdapterProp): ClienteProp | undefined => {
  if (!cliente) return undefined;

  const base: BaseProp | undefined = baseAdapter<ClienteAdapterProp>({ base: cliente, busqueda: camposBusquedaCliente });

  if (!base) return undefined;

  const pedidos: PedidoProp[] = pedidoAdapterArray(cliente.pedidos);

  const newCliente: ClienteProp = {
    ...base,
    nombre: cliente.nombre ?? undefined,
    telefono: cliente.telefono ?? undefined,
    email: cliente.email ?? undefined,
    resumen: resumenAdapter(cliente.resumen),
    pedidos: pedidos
  }

  return newCliente;
}


export const clienteAdapterArray = (clientes?: ClienteAdapterProp[]): ClienteProp[] => {
  const newClientes: ClienteProp[] =
    clientes?.flatMap(c => {
      const cliente = clienteAdapter(c);
      return cliente ? [cliente] : [];
    }) ?? [];

  return newClientes;
}