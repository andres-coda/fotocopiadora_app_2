import { ResumenProp } from "../../modelo/Entidades/cliente/resumen.interface";
import { StockProp } from "../../modelo/Entidades/libro/stock.interface";
import { PedidoAdapterProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { CambiarEstadoLibroItem, CambiarEstadoLibroPedidoProp, CambiarEstadoPedidoAdapterInternoProp, CambiarEstadoPedidoProp, CambioEstadoPedidoAdapterProp, CambioEstadoPedidoItemAdapterProp, ResumenGeneralAdapterProp } from "../../modelo/Entidades/pedido_libro/cambioEstado.interface";
import { PedidoLibroAdapterProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";

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

const cambiarEstadoItemAdapter = (prop: PedidoLibroAdapterProp): CambiarEstadoLibroItem => {
  if (!prop.libro.resumen) throw new Error('El cambio de estado no devolvio el resumen del libro');
  const stock = cambiarEstadoResumenLibroAdapter({ id: prop.libro.id, resumen: prop.libro.resumen })
  return {
    ultAct: prop.fechaActualizacion?.toDateString(),
    idPedido: prop.idPedido,
    nro: Number(prop.id),
    estado: prop.estado,
    stock
  }
}

const cambiarEstadoItemArrayAdapter = (prop: PedidoLibroAdapterProp[]): CambiarEstadoLibroItem[] => {
  return prop.map(p => cambiarEstadoItemAdapter(p));
}

const cambiarEstadoPedidoAdapterInterno = ({ id, estado, fechaActualizacion }: CambiarEstadoPedidoAdapterInternoProp): CambiarEstadoPedidoProp => {
  return {
    id: id,
    estado: estado,
    ultAct: fechaActualizacion?.toDateString()
  }
}

export const cambiarEstadoPedidoAdapter = (prop: PedidoAdapterProp): CambiarEstadoLibroPedidoProp => {

  if(!prop.cliente.resumen) throw new Error('El cambio de estado no devolvio el resumen del cliente');
  const resumenCliente: ResumenProp = cambiarEstadoResumenClienteAdapter({ id: prop.cliente.id, resumen: prop.cliente.resumen });

  const pedido = cambiarEstadoPedidoAdapterInterno({ id: prop.id, fechaActualizacion: prop.fechaActualizacion, estado: prop.estado });
  const items: CambiarEstadoLibroItem[] = cambiarEstadoItemArrayAdapter(prop.libroPedidos);

  return {
    items,
    pedido,
    resumenCliente
  }
}