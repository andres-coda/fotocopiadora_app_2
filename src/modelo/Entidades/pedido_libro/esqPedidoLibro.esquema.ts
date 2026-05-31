import { z } from "zod";
import { LibroProp } from "../libro/libro.interface";
import { PedidoLibroConstruccionProp, PedidoLibroProp } from "./pedidoLibro.interface";
import { transformarEspeAEnum } from "../../../utils/especificaciones";
import { SedeProp } from "../sede/sede.interface";


export const pedidoLibro = z.object({
  cantidad: z.number().optional(),
  detalles: z.string().optional(),
  sede: z.string().optional()
})

export type formValuesPedidoLibro = z.infer<typeof pedidoLibro>;

export const pedidoFormDefault: formValuesPedidoLibro = {
  cantidad: 1,
  detalles: '',
  sede:'',
}

interface FromValuesDefectoProp {
  pedidoLibro?: PedidoLibroConstruccionProp,
  libro?: LibroProp,
  sede?:SedeProp
}

export const normalizarPedidoLibro = (pl?:PedidoLibroProp[]):PedidoLibroConstruccionProp[] => {
  if(!pl)return [];
  return pl.map(p=> {
    return {
      id: p.id,
      libro: p.libro,
      detalles: p.detalles,
      cantidad: p.cantidad,
      especificaciones: transformarEspeAEnum(p.especificaciones),
      sede: p.sede,
      estado: p.estado
    }
  })
}

export const pedidoLibroFormEdit = ({ pedidoLibro, sede }: FromValuesDefectoProp): formValuesPedidoLibro => {
  if (!pedidoLibro) return pedidoFormDefault;
  return {
    cantidad: pedidoLibro.cantidad ?? pedidoFormDefault.cantidad,
    detalles: pedidoLibro.detalles ?? pedidoFormDefault.detalles,
    sede: pedidoLibro.sede?.id ?? sede?.id ?? pedidoFormDefault.sede,
  }
}