import { BaseProp } from "../../modelo/Entidades/base/base.interface";
import { ResumenProp } from "../../modelo/Entidades/cliente/resumen.interface";
import { StockProp } from "../../modelo/Entidades/libro/stock.interface";
import { CambiarEstadoLibroPedidoAdapterProp, CambiarEstadoLibroPedidoProp } from "../../modelo/Entidades/pedido_libro/cambioEstado.interface";
import { baseAdapter } from "./base.adapter";
import { resumenAdapter } from "./resumen.adapter";
import { stockAdapter } from "./stock.adapter";

export const cambiarEstadoLibroPedidoAdapter = (prop: CambiarEstadoLibroPedidoAdapterProp) :CambiarEstadoLibroPedidoProp =>{
  const base: BaseProp | undefined = baseAdapter({base:prop, busqueda: []});
  if(!base) throw Error('El cambio de estado no trae id')
  const stock:StockProp = stockAdapter(prop.stock);
  const resumen:ResumenProp = resumenAdapter(prop.resumen);

  return {
    ...base,
    stock,
    resumen,
    estado:prop.estado,
    pedido:{estado:prop.pedido.estado}
  }
}