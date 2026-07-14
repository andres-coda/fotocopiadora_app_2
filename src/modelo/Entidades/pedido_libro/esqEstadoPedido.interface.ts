import { z } from "zod";
import { Estado } from "./estado.enum";
import { PedidoLibroProp } from "./pedidoLibro.interface";
import { PedidoProp } from "../pedido/pedido.interface";
import { EstadoPedido } from "../pedido/estadoPedido.enum";

export const estado = z.object({
  estado: z.enum(Estado)
});

export type formValuesEstado = z.infer<typeof estado>;

export const estadoFormDefault: formValuesEstado = {
  estado: Estado.PENDIENTE
}

export const estadoFormEdit = (pl:PedidoLibroProp): formValuesEstado => {
  if (!pl) return estadoFormDefault;
  return { estado:pl.estado  };
}

export const estadoPedido = z.object({
  estado: z.enum(EstadoPedido)
});

export type formValuesEstadoPedido = z.infer<typeof estadoPedido>;

export const estadoPedidoFormDefault: formValuesEstadoPedido = {
  estado: EstadoPedido.PENDIENTE
}

export const estadoPedidoFormEdit = (pedido:PedidoProp): formValuesEstadoPedido => {
  if (!pedido) return estadoPedidoFormDefault;
  return { estado: pedido.estado  };
}