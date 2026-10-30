import { ClienteProp } from '../cliente/cliente.interface';
import { PedidoProp } from './pedido.interface';
import { normalizarTelefono } from '../../../utils/telefono';
import { z } from 'zod';

export const pedido = z.object({
  nombre: z.string().optional(),
  email: z.string().optional(),
  telefono: z
    .union([
      z
        .string()
        .min(1)
        .refine(val => normalizarTelefono(val) !== undefined, {
          message: 'Debe ser un teléfono válido',
        })
        .transform(val => normalizarTelefono(val) ?? val),

      z.literal(''),
    ])
    .optional(),
  archivos: z.string(),
  anillados: z.string(),
  fechaEntrega: z.string().min(1, 'El pedido debe tener un nombre'),
  importeTotal: z.string(),
  sena: z.string(),
});

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
};

interface FromValuesDefectoProp {
  pedido?: PedidoProp;
  cliente?: ClienteProp;
  fechaEntregaDefecto?: string;
}

export const pedidoFormEdit = ({
  pedido,
  cliente,
  fechaEntregaDefecto,
}: FromValuesDefectoProp): formValuesPedido => {
  if (!pedido) {
    return {
      ...pedidoFormDefault,
      fechaEntrega: fechaEntregaDefecto || pedidoFormDefault.fechaEntrega,
    };
  }
  return {
    archivos: pedido?.archivos.toString() || pedidoFormDefault.archivos,
    anillados: pedido?.anillados.toString() || pedidoFormDefault.anillados,
    fechaEntrega: pedido?.fechaEntrega || pedidoFormDefault.fechaEntrega,
    importeTotal: pedido?.importeTotal.toString() || pedidoFormDefault.importeTotal,
    sena: pedido?.sena.toString() || pedidoFormDefault.sena,
    nombre: cliente?.nombre || pedidoFormDefault.nombre,
    telefono: cliente?.telefono || pedidoFormDefault.telefono,
    email: cliente?.email || pedidoFormDefault.email,
  };
};
