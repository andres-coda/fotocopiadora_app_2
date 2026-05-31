import { ClienteProp } from "../../modelo/Entidades/cliente/cliente.interface";
import { ClienteDtoProp } from "../../modelo/Entidades/cliente/dtoCliente.interface"
import { pedidoDtoProp } from "../../modelo/Entidades/pedido/dtoPedido.interface"
import { formValuesPedido } from "../../modelo/Entidades/pedido/esqPedido.esquema"
import { PedidoLibroDtoProp } from "../../modelo/Entidades/pedido_libro/dtoPedidoLibro.interface";
import { PedidoLibroConstruccionProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { clienteDtoAdapter } from "./clienteDto.adapter"
import { pedidoLibroDtoAdapterArray } from "./pedidoLibroDtoAdapter";

interface Prop {
  p: formValuesPedido;
  librosPedidos?: PedidoLibroConstruccionProp[];
  sede:SedeProp
  cliente?: ClienteProp;
}

export const pedidoDtoAdapter = ({ p, cliente, librosPedidos, sede }: Prop): pedidoDtoProp => {
  const clienteDatos: ClienteDtoProp | undefined = !cliente ? clienteDtoAdapter(p) : undefined;
  const pedidosLibros:PedidoLibroDtoProp[] = pedidoLibroDtoAdapterArray({pls:librosPedidos, sede})
  
    const newPedido: pedidoDtoProp = {
      fechaEntrega: p.fechaEntrega,
      importeTotal: Number(p.importeTotal),
      sena: Number(p.sena),
      anillados: Number(p.anillados),
      archivos: Number(p.archivos),
      cliente: cliente?.id,
      clienteDatos,
      librosPedidos:pedidosLibros
    }
  return newPedido
}
