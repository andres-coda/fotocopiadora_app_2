import { WritableDraft } from '@reduxjs/toolkit'
import { ClienteProp } from '../../modelo/Entidades/cliente/cliente.interface'
import { filterContext } from '../modelo/reduxContext.interface'
import { actionProp } from './funcionesGenericas'
import { PedidoLibroProp } from '../../modelo/Entidades/pedido_libro/pedidoLibro.interface'
import { PedidoProp } from '../../modelo/Entidades/pedido/pedido.interface'

export const cambiarEstadoLibroPedidoClienteFuncion = (
  state: WritableDraft<filterContext<ClienteProp>>,
  action: actionProp<PedidoLibroProp>
) => ({
  ...state,
  selected: modificarEstadoLibroPedidoCliente(
    action.payload,
    state.selected
  )
});

const modificarEstadoLibroPedidoCliente = (libroPedido: PedidoLibroProp, cliente: ClienteProp | null): ClienteProp | null => {
  if (!cliente) return null;
  if (!cliente.pedidos) return cliente;
  const newPedidos: PedidoProp[] = cliente.pedidos.map(p => {
    if (p.libroPedidos.length === 0) return p
    const lPaux = p.libroPedidos.map(lp => {
      if (lp.id != libroPedido.id) return lp;
      return libroPedido;
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