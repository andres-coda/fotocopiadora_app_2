import { ResumenProp } from "../../modelo/Entidades/cliente/resumen.interface";
import { StockProp } from "../../modelo/Entidades/libro/stock.interface";
import { CambiarEstadoLibroPedidoAdapterProp, CambiarEstadoLibroPedidoProp, ResumenGeneralAdapterProp } from "../../modelo/Entidades/pedido_libro/cambioEstado.interface";

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

export const cambiarEstadoLibroPedidoAdapter = (prop: CambiarEstadoLibroPedidoAdapterProp): CambiarEstadoLibroPedidoProp => {

  const resumenLibro: StockProp = cambiarEstadoResumenLibroAdapter({ id: prop.libro.id, resumen: prop.libro.stock });
  const resumenCliente: ResumenProp = cambiarEstadoResumenClienteAdapter({ id: prop.pedido.cliente.id, resumen: prop.pedido.cliente.resumen });

  return {
    idPedido: prop.idPedido,
    nro: prop.id,
    estado: prop.estado,
    stock: resumenLibro,
    resumenCliente,
    pedido: {
      id: prop.idPedido,
      estado: prop.pedido.estado
    },
  }
}