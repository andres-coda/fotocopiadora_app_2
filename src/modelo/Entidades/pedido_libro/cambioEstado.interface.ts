import { ResumenProp } from "../cliente/resumen.interface";
import { StockProp } from "../libro/stock.interface";
import { Estado } from "./estado.enum";


export interface CambiarEstadoLibroPedidoAdapterProp {
  idPedido: string;
  id: number;
  estado: Estado;
  pedido: {
    id: string;
    estado: Estado;
    cliente: {
      id: string,
      resumen: ResumenGeneralAdapterProp
    }
  };
  libro: {
    id: string;
    stock: ResumenGeneralAdapterProp
  }
}

export interface ResumenGeneralAdapterProp {
  pendiente: number;
  listo: number;
  retirado: number;
  cancelado: number;
  stock?: number;

}

export interface CambiarEstadoLibroPedidoProp {
  idPedido: string;
  nro: number;
  estado: Estado;
  stock: StockProp;
  pedido: {
    id: string;
    estado: Estado
  };
  resumenCliente: ResumenProp;
}