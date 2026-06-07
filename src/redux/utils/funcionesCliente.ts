import { current, WritableDraft } from '@reduxjs/toolkit'
import { ClienteProp } from '../../modelo/Entidades/cliente/cliente.interface'
import { filterContext } from '../modelo/reduxContext.interface'
import { actionProp } from './funcionesGenericas'
import { PedidoProp } from '../../modelo/Entidades/pedido/pedido.interface'
import { CambiarEstadoLibroPedidoProp } from '../../modelo/Entidades/pedido_libro/cambioEstado.interface'

export const cambiarEstadoLibroPedidoClienteFuncion = (
  state: WritableDraft<filterContext<ClienteProp>>,
  action: actionProp<CambiarEstadoLibroPedidoProp>
) => ({
  ...current(state),
  selected: modificarEstadoLibroPedidoCliente(
    action.payload,
    state.selected
  )
});

const modificarEstadoLibroPedidoCliente = (prop: CambiarEstadoLibroPedidoProp, cliente: ClienteProp | null): ClienteProp | null => {
  if (!cliente) return null;
  if (!cliente.pedidos) return cliente;
  const newPedidos: PedidoProp[] = cliente.pedidos.map(p => {
    let estadoPedido = p.estado;
    if (p.libroPedidos.length === 0) return p
    const lPaux = p.libroPedidos.map(lp => {
      if (lp.id != prop.id) return lp;
      estadoPedido = prop.pedido.estado;
      return {...lp, estado:prop.estado};
    });
    return {
      ...p,
      estado:estadoPedido,
      libroPedidos: lPaux
    };
  })
  return {
    ...cliente,
    pedidos: newPedidos,
    resumen: prop.resumen
  };
}
/* 
export const cambiarEstadoPedidoClienteFuncion = (
  state: WritableDraft<filterContext<ClienteProp>>,
  action: actionProp<PedidoProp>
) => ({
  ...state,
  selected: modificarEstadoPedidoCliente(
    action.payload,
    state.selected
  )
});

const modificarEstadoPedidoCliente = (pedido: PedidoProp, cliente: ClienteProp | null): ClienteProp | null => {
  if (!cliente) return null;
  if (!cliente.pedidos) return cliente;
  const newPedidos: PedidoProp[] = cliente.pedidos.map(p => {
    if(p.id != pedido.id)return p;
    p.estado = pedido.estado
    if (p.libroPedidos.length === 0) return p
    const lPaux = p.libroPedidos.map(lp => {
      lp.estado = pedido.estado;
      return lp;
    });
    return {
      ...p,
      libroPedidos: lPaux
    };
  })
  return {
    ...cliente,
    pedidos: newPedidos
  };
}
 */