import { z } from "zod";
import { LibroProp } from "../libro/libro.interface";
import { PedidoLibroProp } from "./pedidoLibro.interface";


export const pedidoLibro = z.object({
  cantidad: z.number().optional(),
  detalles: z.string().optional(),
})

export type formValuesPedidoLibro = z.infer<typeof pedidoLibro>;

export const pedidoFormDefault: formValuesPedidoLibro = {
  cantidad: undefined,
  detalles: '',
}

interface FromValuesDefectoProp {
  pedidoLibro?: PedidoLibroProp,
  libro?: LibroProp,
}

export const pedidoLibroFormEdit = ({ pedidoLibro }: FromValuesDefectoProp): formValuesPedidoLibro => {
  if (!pedidoLibro) return pedidoFormDefault;
  return {
    cantidad: pedidoLibro.cantidad ?? pedidoFormDefault.cantidad,
    detalles: pedidoLibro.detalles ?? pedidoFormDefault.detalles,
  }
}