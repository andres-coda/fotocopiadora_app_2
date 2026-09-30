import { RefObject, useEffect } from "react";
import Texto from "../../componente-estilo/texto/texto";
import { StockProp } from "../../modelo/Entidades/libro/stock.interface";
import { Estado } from "../../modelo/Entidades/pedido_libro/estado.enum";
import { BusquedaRedux } from "../../redux/modelo/reduxContext.interface";
import { ObtenerPedidosByClienteIdProp } from "../../servicio/pedido/usePedidosApi";
import './estadoPedido.css';

interface Prop {
  stock: StockProp;
  finListaRef: RefObject<HTMLDivElement>;
  contenedorRef: RefObject<HTMLDivElement>;
  obtenerPedidosElementoById: ({ id, limite, pagina, orden, estado }: ObtenerPedidosByClienteIdProp) => void
  loading: boolean
  busquedaRedux: BusquedaRedux;
  estadoSelec: Estado | undefined;
  setEstadoSelect: React.Dispatch<React.SetStateAction<Estado | undefined>>

}

const EstadoPedidos = ({
  stock, finListaRef, obtenerPedidosElementoById, loading, busquedaRedux, contenedorRef, estadoSelec, setEstadoSelect
}: Prop) => {

  useEffect(() => {
    if (stock?.id)
      obtenerPedidosElementoById({
        pagina: 1,
        limite: busquedaRedux.limite,
        id: stock?.id,
        orden: busquedaRedux.sortBy,
        estado: estadoSelec
      });
  }, [stock?.id, estadoSelec])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!stock?.id) {
          return
        }

        if (!entry.isIntersecting) {
          return
        };
        if (busquedaRedux.query != `${stock?.id}+${estadoSelec}`) {
          return
        }
        if (loading) {
          return;
        }
        if (
          busquedaRedux.pagina *
          busquedaRedux.limite >=
          busquedaRedux.total
        ) {
          return;
        }

        obtenerPedidosElementoById({
          pagina: busquedaRedux.pagina + 1,
          limite: busquedaRedux.limite,
          id: stock?.id,
          orden: busquedaRedux.sortBy,
          estado: estadoSelec ?? undefined
        });

      },
      {
        root: contenedorRef.current,
        threshold: 0.2,
      }
    );

    if (finListaRef.current) {
      observer.observe(finListaRef.current);
    } else {
      console.log('NO HAY ELEMENTO PARA OBSERVAR');
    }

    return () => observer.disconnect();

  }, [busquedaRedux.query, busquedaRedux.pagina, estadoSelec]);

  const handleFiltro = (estado: Estado) => {
    if (estado != estadoSelec) {
      setEstadoSelect(estado);
    }
  }

  return (
    <ul className="estado_pedido">
      {stock.stock != undefined && <li className='enStock' title='Pedidos en stock' onClick={() => handleFiltro(Estado.STOCK)}><Texto texto='Stock: ' chica /> <Texto texto={`${stock.stock}`} derecha chica /></li>}
      <li className='pendiente' title='Pedidos pendientes' onClick={() => handleFiltro(Estado.PENDIENTE)}><Texto texto='Pendiente: ' chica /> <Texto texto={`${stock.pendiente}`} derecha chica /></li>
      <li className='terminado' title='Pedidos listos para entregar' onClick={() => handleFiltro(Estado.LISTO)}><Texto texto='Para retirar: ' chica /> <Texto texto={`${stock.listo}`} derecha chica /></li>
      <li className='retirado' title='Pedidos retirados' onClick={() => handleFiltro(Estado.RETIRADO)}><Texto texto='Retirados: ' chica /> <Texto texto={`${stock.retirado}`} derecha chica /></li>
      <li className='cancelado' title='Pedidos cancelados' onClick={() => handleFiltro(Estado.CANCELADO)}><Texto texto='Cancelado: ' chica /> <Texto texto={`${stock.cancelado}`} derecha chica /></li>
    </ul>
  )
}

export default EstadoPedidos;