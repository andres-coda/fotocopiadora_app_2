import { ResumenProp } from "../../modelo/Entidades/cliente/resumen.interface";
import { StockProp } from "../../modelo/Entidades/libro/stock.interface";
import { CambiarEstadoLibroItem, CambiarEstadoLibroPedidoAdapterProp, CambiarEstadoLibroPedidoProp, CambiarEstadoPedidoAdapterInternoProp, CambiarEstadoPedidoProp, CambioEstadoPedidoAdapterProp, CambioEstadoPedidoItemAdapterProp, ResumenGeneralAdapterProp } from "../../modelo/Entidades/pedido_libro/cambioEstado.interface";

interface Prop {
  id: string;
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

const cambiarEstadoItemAdapter = (prop: CambioEstadoPedidoItemAdapterProp): CambiarEstadoLibroItem => {
  const stock = cambiarEstadoResumenLibroAdapter({ id: prop.libro.id, resumen: prop.libro.stock })
  return {
    ultAct: prop.fechaActualizacion,
    idPedido: prop.idPedido,
    nro: prop.id,
    estado: prop.estado,
    stock
  }
}

const cambiarEstadoItemArrayAdapter = (prop: CambioEstadoPedidoItemAdapterProp[]): CambiarEstadoLibroItem[] => {
  return prop.map(p => cambiarEstadoItemAdapter(p));
}

const cambiarEstadoPedidoAdapterInterno = (prop: CambiarEstadoPedidoAdapterInternoProp): CambiarEstadoPedidoProp => {
  return {
    id: prop.id,
    estado: prop.estado,
    ultAct: prop.fechaActualizacion
  }
}

export const cambiarEstadoItemPedidoAdapter = (prop: CambiarEstadoLibroPedidoAdapterProp): CambiarEstadoLibroPedidoProp => {

  const resumenCliente: ResumenProp = cambiarEstadoResumenClienteAdapter({ id: prop.pedido.cliente.id, resumen: prop.pedido.cliente.resumen });
  const pedido = cambiarEstadoPedidoAdapterInterno(prop.pedido);
  const items: CambiarEstadoLibroItem[] = [];
  const item: CambiarEstadoLibroItem = cambiarEstadoItemAdapter(prop);
  items.push(item);
  return {
    items,
    resumenCliente,
    pedido,
  }
}

export const cambiarEstadoPedidoAdapter = (prop:CambioEstadoPedidoAdapterProp): CambiarEstadoLibroPedidoProp => {
  const resumenCliente: ResumenProp = cambiarEstadoResumenClienteAdapter({ id: prop.cliente.id, resumen: prop.cliente.resumen });
  const pedido = cambiarEstadoPedidoAdapterInterno(prop);
  const items: CambiarEstadoLibroItem[] = cambiarEstadoItemArrayAdapter(prop.items);

  return {
    items,
    pedido,
    resumenCliente
  }
}