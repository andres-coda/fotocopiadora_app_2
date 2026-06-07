import { current, WritableDraft } from "@reduxjs/toolkit";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";
import { CambiarEstadoLibroPedidoProp } from "../../modelo/Entidades/pedido_libro/cambioEstado.interface";
import { filterContext } from "../modelo/reduxContext.interface";
import { actionProp } from "./funcionesGenericas";

export const modificarStockFuncion = (
  state: WritableDraft<filterContext<LibroProp>>,
  action: actionProp<CambiarEstadoLibroPedidoProp>
) => ({
  ...current(state),
  items: actualizarStockLista(action.payload, state.items),
  selected: modificarStockSelected(
    action.payload,
    state.selected,
  )
});

const modificarStockSelected = (prop: CambiarEstadoLibroPedidoProp,libro: LibroProp |null): LibroProp | null => {
  if (!prop?.stock || !libro || libro.stock?.id != prop.stock.id) return libro;
  return {
    ...libro,
    stock: prop.stock
  }
}

const actualizarStockLista = ( prop: CambiarEstadoLibroPedidoProp, libros: LibroProp[]): LibroProp[] => {
  if (!prop?.stock || !libros || libros.length === 0) return libros;
  const newLibros:LibroProp[] = libros.map(l=>{
    if(l.stock?.id != prop.stock.id) return l;
    return {
      ...l,
      stock:prop.stock
    }
  });

  return newLibros;
}
