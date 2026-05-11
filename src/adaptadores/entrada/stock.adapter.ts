import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { StockAdapterProp, StockProp } from "../../modelo/Entidades/libro/stock.interface";
import { baseAdapter } from "./base.adapter";

export const stockAdapter = (stock?:StockAdapterProp):StockProp=> {
  if(!stock) throw new Error('No hay stock en el libro');

  const base: BaseProp | undefined= baseAdapter(stock);

  if(!base) throw new Error('El stock del libro no tiene id, o alguna de las caracteristicas bases');

  const newStock: StockProp = {
    ...base,
  stock: stock.stock,
  pendiente: stock.pendiente,
  listo: stock.listo,
  retirado: stock.retirado,
  cancelado: stock.cancelado,
  }
  return newStock;
}