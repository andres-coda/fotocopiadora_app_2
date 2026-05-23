import { ClienteProp } from "../cliente/cliente.interface";
import { PedidoProp } from "./pedido.interface";
import { z } from "zod";

export const pedido = z.object({
  nombre: z.string().optional(),
  email: z.string().optional(),
  telefono: z
    .union([
      z.string()
        .min(1)
        .refine(
          (val) => {

            const cleaned = val.replace(/\D/g, '');

            return cleaned.length >= 8
              && cleaned.length <= 15;

          },
          {
            message: 'Debe ser un teléfono válido'
          }
        )
        .transform((val) => {

          let cleaned = val.replace(/[^\d+]/g, '');

          // sacar espacios y símbolos
          cleaned = cleaned.replace(/(?!^\+)\D/g, '');

          // quitar 0 inicial si no tiene código internacional
          if (
            !cleaned.startsWith('+')
            && cleaned.startsWith('0')
          ) {
            cleaned = cleaned.slice(1);
          }

          return cleaned;
        }),

      z.literal(''),
    ])
    .optional(),
  archivos: z.string(),
  anillados: z.string(),
  fechaEntrega: z.string().min(1, 'El pedido debe tener un nombre'),
  importeTotal: z.string(),
  sena: z.string(),
})

export type formValuesPedido = z.infer<typeof pedido>;

export const pedidoFormDefault: formValuesPedido = {
  nombre: '',
  telefono: '',
  email: '',
  archivos: '',
  anillados: '',
  fechaEntrega: '',
  importeTotal: '',
  sena: '',
}

interface FromValuesDefectoProp {
  pedido?: PedidoProp,
  cliente?: ClienteProp,
}

export const pedidoFormEdit = ({ pedido, cliente }: FromValuesDefectoProp): formValuesPedido => {
  if (!pedido) return pedidoFormDefault;
  return {
    archivos: pedido?.archivos.toString() || pedidoFormDefault.archivos,
    anillados: pedido?.anillados.toString() || pedidoFormDefault.anillados,
    fechaEntrega: pedido?.fechaEntrega || pedidoFormDefault.fechaEntrega,
    importeTotal: pedido?.importeTotal.toString() || pedidoFormDefault.importeTotal,
    sena: pedido?.sena.toString() || pedidoFormDefault.sena,
    nombre: cliente?.nombre || pedidoFormDefault.nombre,
    telefono: cliente?.telefono || pedidoFormDefault.telefono,
    email: cliente?.email || pedidoFormDefault.email,
  }
}