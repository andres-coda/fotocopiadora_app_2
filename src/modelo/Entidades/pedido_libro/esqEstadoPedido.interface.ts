import { z } from "zod";
import { Estado } from "./estado.enum";
import { PedidoLibroProp } from "./pedidoLibro.interface";
import { PedidoProp } from "../pedido/pedido.interface";
import { estadoFinalPedido } from "../../../utils/estado";

export const estado = z.object({
  estado: z.enum(Estado)
});

export type formValuesEstado = z.infer<typeof estado>;

export const estadoFormDefault: formValuesEstado = {
  estado: Estado.PENDIENTE
}
interface Prop {
  pedidoLibro?: PedidoLibroProp;
  pedido?: PedidoProp;
}
export const estadoFormEdit = ({ pedidoLibro, pedido }: Prop): formValuesEstado => {
  if (!pedidoLibro && !pedido) return estadoFormDefault;
  if (pedidoLibro) return { estado: pedidoLibro.estado }
  return { estado: estadoFinalPedido(pedido)  };
}