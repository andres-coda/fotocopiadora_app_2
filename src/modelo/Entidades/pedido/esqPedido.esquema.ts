import { ClienteProp } from "../cliente/cliente.interface";
import { PedidoProp } from "./pedido.interface";
import { z } from "zod";

export const pedido = z.object({
  nombre: z.string().optional(),
  email: z.string().optional(),
  telefono: z
    .union([
      z.string().min(1).refine(
        (val) => {
          const cleaned = val.replace(/[\s\-\(\)]/g, '');
          return /^\+?54?9?\d{8,11}$/.test(cleaned);
        },
        { message: 'Debe ser un número de teléfono válido de Argentina, ej: +5491112345678' }
      ).transform((val) => {
        let cleaned = val.replace(/[\s\-\(\)]/g, '');

        if (cleaned.startsWith('0')) cleaned = cleaned.substring(1);
        if (!cleaned.startsWith('+54') && !cleaned.startsWith('54')) cleaned = '+54' + cleaned;
        if (cleaned.startsWith('54') && !cleaned.startsWith('+')) cleaned = '+' + cleaned;

        return cleaned;
      }),
      z.literal(''),
    ])
    .optional(),
  archivos: z.number(),
  anillados: z.number(),
  fechaEntrega: z.string().min(1, 'El pedido debe tener un nombre'),
  importeTotal: z.number(),
  sena: z.number(),
})

export type formValuesPedido = z.infer<typeof pedido>;

export const pedidoFormDefault: formValuesPedido = {
  nombre: '',
  telefono: '',
  email: '',
  archivos: 0,
  anillados: 0,
  fechaEntrega: '',
  importeTotal: 0,
  sena: 0,
}

interface FromValuesDefectoProp {
  pedido?: PedidoProp,
  cliente?: ClienteProp,
}

export const pedidoFormEdit = ({ pedido, cliente }: FromValuesDefectoProp): formValuesPedido => {
  if (!pedido) return pedidoFormDefault;
  return {
    archivos: pedido?.archivos || pedidoFormDefault.archivos,
    anillados: pedido?.anillados || pedidoFormDefault.anillados,
    fechaEntrega: pedido?.fechaEntrega || pedidoFormDefault.fechaEntrega,
    importeTotal: pedido?.importeTotal || pedidoFormDefault.importeTotal,
    sena: pedido?.sena || pedidoFormDefault.sena,
    nombre: cliente?.nombre || pedidoFormDefault.nombre,
    telefono: cliente?.telefono || pedidoFormDefault.telefono,
    email: cliente?.email || pedidoFormDefault.email,
  }
}