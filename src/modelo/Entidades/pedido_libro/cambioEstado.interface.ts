import { ResumenProp } from "../cliente/resumen.interface";
import { StockProp } from "../libro/stock.interface";
import { Estado } from "./estado.enum";

export interface CambioEstadoPedidoItemAdapterProp {
  libro: {
    id: string;
    stock: ResumenGeneralAdapterProp;
  };
  fechaActualizacion?: string;
  estado: Estado;
  id: number;
  idPedido: string;
}

export interface CambiarEstadoPedidoAdapterInternoProp {
  id: string;
  estado: Estado;
  fechaActualizacion?: string;
  cliente: {
    id: string,
    resumen: ResumenGeneralAdapterProp
  }
}

export interface CambioEstadoPedidoAdapterProp extends CambiarEstadoPedidoAdapterInternoProp{
  items: CambioEstadoPedidoItemAdapterProp[];
}

export interface CambiarEstadoLibroPedidoAdapterProp extends CambioEstadoPedidoItemAdapterProp{
  pedido:CambiarEstadoPedidoAdapterInternoProp;
}

export interface ResumenGeneralAdapterProp {
  pendiente: number;
  listo: number;
  retirado: number;
  cancelado: number;
  stock?: number;

}

export interface CambiarEstadoPedidoProp {
  id:string,
  estado:Estado,
  ultAct?: string,
}

export interface CambiarEstadoLibroItem {
  ultAct?: string,
  idPedido: string;
  nro: number;
  estado: Estado;
  stock: StockProp;
}

export interface CambiarEstadoLibroPedidoProp {
  items: CambiarEstadoLibroItem[];
  pedido: CambiarEstadoPedidoProp;
  resumenCliente: ResumenProp;
}

