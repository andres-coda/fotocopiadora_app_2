import { useDispatch, useSelector } from "react-redux";
import { filterContext } from "../../../redux/modelo/reduxContext.interface";
import { PedidoClienteProp, PedidoProp } from "../../../modelo/Entidades/pedido/pedido.interface";
import { appStore } from "../../../redux/store";
import { filtrosPedidoFuntion } from "../../../filtro/pedido.filtro";
import BuscadorFiltros from "../../../componente/buscador/buscadorCompleto";
import { rutaPrivadaBase, RutasPrivadas } from "../../rutas/rutasPrivadas";
import { cambiarOrdenPedido } from "../../../redux/state/pedido.state";
import Centro from "../../../componente-estilo/centro/centro";
import TextoVacio from "../../../componente/Textos/textoVacio";
import PedidoCard from "./componente/pedidoCard";
import useBuscadorCompleto from "../../../hooks/buscador/useBuscadorCompleto";

const Pedidos = () => {
  const dispatch = useDispatch();
  const pedidoContext: filterContext<PedidoProp | PedidoClienteProp> = useSelector((store: appStore) => store.pedido);

  const { elementosFiltrados, contenedorRef, valor, setValor, nuevoElemento } = useBuscadorCompleto<PedidoProp | PedidoClienteProp>({
    estadoFiltros: pedidoContext.filter.filtros,
    filtros: [...filtrosPedidoFuntion],
    elementos: pedidoContext.items,
    sortBy: pedidoContext.filter.sortBy,
    sortOrder: pedidoContext.filter.sortOrder,


  });
  
return (
  <>
    <BuscadorFiltros
      ref={contenedorRef}
      texto='Buscar pedido'
      handleMas={() => nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PEDIDO_CARGAR}`)}
      valor={valor}
      setValor={setValor}
      handleOrden={() => dispatch(cambiarOrdenPedido())}
      etiquetaArriba='Al comienzo de la lista'
      etiquetaMas='Nueva pedido'
      titulo='Lista de pedidos'
    />
    <Centro ref={contenedorRef}>
      {elementosFiltrados.length > 0
        ? elementosFiltrados
          .map(dato => (
            <PedidoCard<PedidoProp> pedido={dato} key={dato.id} />
          ))
        : <TextoVacio entidad='pedidos' />
      }
    </Centro>
  </>
)
}

export default Pedidos
