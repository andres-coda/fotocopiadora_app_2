import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { ClienteAdapterProp, ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { PedidoClienteProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { baseAdapter } from "./base.adapter";
import { pedidoClienteAdapterArray } from "./pedido.adapter";

export const clienteAdapter = (cliente?: ClienteAdapterProp): ClienteProp | undefined => {
  if (!cliente) return undefined;

  const base: BaseProp | undefined = baseAdapter(cliente);

  if (!base) return undefined;

  const pedidos: PedidoClienteProp[] = pedidoClienteAdapterArray(cliente.pedidos);

  const newCliente: ClienteProp = {
    ...base,
    nombre: cliente.nombre ?? undefined,
    telefono: cliente.telefono ?? undefined,
    email: cliente.email ?? undefined,
    pendiente: cliente.resumen?.pendiente ?? undefined,
    listo: cliente.resumen?.listo ?? undefined,
    retirado: cliente.resumen?.retirado ?? undefined,
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