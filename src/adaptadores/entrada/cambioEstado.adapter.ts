import { ResumenProp } from "../../modelo/Entidades/cliente/resumen.interface";
import { StockProp } from "../../modelo/Entidades/libro/stock.interface";
import { CambiarEstadoItemProp, CambiarEstadoPedidoAdapterProp, CambiarEstadoPedidoCompletoProp, CambiarEstadoPedidoProp, CambioEstadoPedidoItemAdapterProp, ResumenGeneralAdapterProp } from "../../modelo/Entidades/pedido_libro/cambioEstado.interface";

interface CambioEstadoPedidoInternoAdapterProp extends Omit<CambiarEstadoPedidoAdapterProp, 'items' | 'cliente'>{};

interface Prop {
  id:string;
  resumen: ResumenGeneralAdapterProp;
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

const cambiarEstadoItemAdapter = (prop: CambioEstadoPedidoItemAdapterProp): CambiarEstadoItemProp => {
  console.log('Item: ', prop)
  if (!prop.libro?.resumen) throw new Error('El cambio de estado no devolvió el resumen del libro');
  const stock = cambiarEstadoResumenLibroAdapter({ id: prop.libro.id, resumen: prop.libro.resumen })
  return {
    ultAct: prop.fechaActualizacion,
    idPedido: prop.idPedido,
    id: prop.id.toString(),
    estado: prop.estado,
    stock
  }
}

const cambiarEstadoItemArrayAdapter = (prop: CambioEstadoPedidoItemAdapterProp[]): CambiarEstadoItemProp[] => {
  return (prop ?? []).map(p => cambiarEstadoItemAdapter(p));
}

const cambiarEstadoPedidoAdapterInterno = ({ id, estado, fechaActualizacion }: CambioEstadoPedidoInternoAdapterProp): CambiarEstadoPedidoProp => {
  return {
    id: id,
    estado: estado,
    ultAct: fechaActualizacion
  }
}

export const cambiarEstadoPedidoAdapter = (prop: CambiarEstadoPedidoAdapterProp): CambiarEstadoPedidoCompletoProp => {

  if(!prop.cliente?.resumen) throw new Error('El cambio de estado no devolvió el resumen del cliente');
  const resumenCliente: ResumenProp = cambiarEstadoResumenClienteAdapter({ id: prop.cliente.id, resumen: prop.cliente.resumen });

  const items: CambiarEstadoItemProp[] = cambiarEstadoItemArrayAdapter(prop.items ?? []);
  const pedido = cambiarEstadoPedidoAdapterInterno({ id: prop.id, fechaActualizacion: prop.fechaActualizacion, estado: prop.estado});

  return {
    items,
    pedido,
    resumenCliente
  }
}