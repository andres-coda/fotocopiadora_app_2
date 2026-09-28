import { ResumenProp } from "../../modelo/Entidades/cliente/resumen.interface";
import { StockProp } from "../../modelo/Entidades/libro/stock.interface";
import { CambiarEstadoLibroItem, CambiarEstadoLibroPedidoProp, CambiarEstadoPedidoAdapterInternoProp, CambiarEstadoPedidoProp } from "../../modelo/Entidades/pedido_libro/cambioEstado.interface";

interface ResumenGeneralAdapterProp {
  pendiente: number;
  listo: number;
  retirado: number;
  cancelado: number;
  stock?: number;
}

interface Prop {
  id: string;
  resumen: ResumenGeneralAdapterProp;
}

interface BackendItem {
  id: string;
  fechaActualizacion?: string;
  estado: number;
  idPedido: string;
  libro?: {
    id: string;
    resumen?: ResumenGeneralAdapterProp;
  };
}

interface BackendCliente {
  id: string;
  resumen?: ResumenGeneralAdapterProp;
}

interface BackendResponse {
  id: string;
  estado: number;
  fechaActualizacion?: string;
  items?: BackendItem[];
  cliente?: BackendCliente;
}

const cambiarEstadoResumenClienteAdapter = (prop: Prop): ResumenProp => {
  return {
    id: prop.id,
    ultAct: 'No se conoce',
    deleted: false,
    pendiente: prop.resumen.pendiente,
    listo: prop.resumen.listo,
    retirado: prop.resumen.retirado,
    cancelado: prop.resumen.cancelado
  }
}

const cambiarEstadoResumenLibroAdapter = (prop: Prop): StockProp => {
  return {
    id: prop.id,
    ultAct: 'No se conoce',
    deleted: false,
    pendiente: prop.resumen.pendiente,
    listo: prop.resumen.listo,
    retirado: prop.resumen.retirado,
    cancelado: prop.resumen.cancelado,
    stock: prop.resumen.stock ?? 0,
  }
}

const cambiarEstadoItemAdapter = (prop: BackendItem): CambiarEstadoLibroItem => {
  if (!prop.libro?.resumen) throw new Error('El cambio de estado no devolvió el resumen del libro');
  const stock = cambiarEstadoResumenLibroAdapter({ id: prop.libro.id, resumen: prop.libro.resumen })
  return {
    ultAct: prop.fechaActualizacion,
    idPedido: prop.idPedido,
    nro: Number(prop.id),
    estado: prop.estado,
    stock
  }
}

const cambiarEstadoItemArrayAdapter = (prop: BackendItem[]): CambiarEstadoLibroItem[] => {
  return (prop ?? []).map(p => cambiarEstadoItemAdapter(p));
}

const cambiarEstadoPedidoAdapterInterno = ({ id, estado, fechaActualizacion }: CambiarEstadoPedidoAdapterInternoProp): CambiarEstadoPedidoProp => {
  return {
    id: id,
    estado: estado,
    ultAct: fechaActualizacion
  }
}

export const cambiarEstadoPedidoAdapter = (prop: BackendResponse): CambiarEstadoLibroPedidoProp => {

  if(!prop.cliente?.resumen) throw new Error('El cambio de estado no devolvió el resumen del cliente');
  const resumenCliente: ResumenProp = cambiarEstadoResumenClienteAdapter({ id: prop.cliente.id, resumen: prop.cliente.resumen });

  const pedido = cambiarEstadoPedidoAdapterInterno({ id: prop.id, fechaActualizacion: prop.fechaActualizacion, estado: prop.estado });
  const items: CambiarEstadoLibroItem[] = cambiarEstadoItemArrayAdapter(prop.items ?? []);

  return {
    items,
    pedido,
    resumenCliente
  }
}