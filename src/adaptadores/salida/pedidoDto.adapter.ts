import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { ClienteDtoProp } from "../../modelo/Entidades/cliente/dtoCliente.interface"
import { pedidoDtoProp } from "../../modelo/Entidades/pedido/dtoPedido.interface"
import { formValuesPedido } from "../../modelo/Entidades/pedido/esqPedido.esquema"
import { clienteDtoAdapter } from "./clienteDto.adapter"

interface Prop {
  p: formValuesPedido;
  cliente?: ClienteProp;
  librosPedidos?: string[];
}

export const pedidoDtoAdapter = ({ p, cliente, librosPedidos }: Prop): pedidoDtoProp => {
  const clienteDatos: ClienteDtoProp | undefined = !cliente ? clienteDtoAdapter(p) : undefined;

  const newPedido: pedidoDtoProp = {
    fechaEntrega: p.fechaEntrega,
    importeTotal: Number(p.importeTotal),
    sena: Number(p.sena),
    anillados: Number(p.anillados),
    archivos: Number(p.archivos),
    cliente: cliente?.id,
    clienteDatos,
    librosPedidos
  }
  return newPedido
}