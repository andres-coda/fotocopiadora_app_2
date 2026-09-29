import { ResumenProp } from "../cliente/resumen.interface";
import { StockProp } from "../libro/stock.interface";
import { Estado } from "./estado.enum";

export interface ResumenGeneralAdapterProp {
  id: string;
  pendiente: number;
  listo: number;
  retirado: number;
  cancelado: number;
  stock?: number;
}

export interface CambioEstadoPedidoItemAdapterProp {
  libro: {
    id: string;
    resumen: ResumenGeneralAdapterProp;
  };
  fechaActualizacion?: string;
  estado: Estado;
  id: number;
  idPedido: string;
}

export interface CambiarEstadoPedidoAdapterProp {
  id: string;
  estado: Estado;
  fechaActualizacion?: string;
  cliente?: {
    id: string,
    resumen: ResumenGeneralAdapterProp
  }
  items?: CambioEstadoPedidoItemAdapterProp[];
}

export interface CambiarEstadoPedidoProp {
  id:string,
  estado:Estado,
  ultAct?: string,
  items?: CambiarEstadoItemProp[];
}

export interface CambiarEstadoItemProp {
  ultAct?: string,
  idPedido: string;
  id: string;
  estado: Estado;
  stock: StockProp;
}

export interface CambiarEstadoPedidoCompletoProp {
  items: CambiarEstadoItemProp[];
  pedido: CambiarEstadoPedidoProp;
  resumenCliente: ResumenProp;
}

