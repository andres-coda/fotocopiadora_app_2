import { BaseAdapterProp, BaseProp } from "../base/base.interface";
import { ResumenAdapterProp, ResumenProp } from "../cliente/resumen.interface";
import { StockAdapterProp, StockProp } from "../libro/stock.interface";
import { EstadoPedido } from "../pedido/estadoPedido.enum";
import { Estado } from "./estado.enum";

export interface CambiarEstadoLibroPedidoAdapterProp extends BaseAdapterProp {
  estado: Estado;
  stock: StockAdapterProp;
  pedido: {estado: EstadoPedido};
  resumen: ResumenAdapterProp;
}

export interface CambiarEstadoLibroPedidoProp extends BaseProp {
  estado: Estado;
  stock: StockProp;
  pedido: {estado: EstadoPedido};
  resumen: ResumenProp;
}