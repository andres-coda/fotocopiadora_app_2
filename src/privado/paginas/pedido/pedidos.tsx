import { useDispatch, useSelector } from "react-redux";
import { filterContext } from "../../../redux/modelo/reduxContext.interface";
import { PedidoProp } from "../../../modelo/Entidades/pedido/pedido.interface";
import { appStore } from "../../../redux/store";
import { filtrosPedidoFuntion } from "../../../filtro/pedido.filtro";
import BuscadorFiltros from "../../../componente/buscador/buscadorCompleto";
import { rutaPrivadaBase, RutasPrivadas } from "../../rutas/rutasPrivadas";
import { cambiarOrdenPedido, selectPedido } from "../../../redux/state/pedido.state";
import Centro from "../../../componente-estilo/centro/centro";
import TextoVacio from "../../../componente/Textos/textoVacio";
import PedidoCard from "./componente/pedidoCard";
import useBuscadorCompleto from "../../../hooks/buscador/useBuscadorCompleto";
import Modal from "../../../componente/modal/modal";
import PedidoSelect from "./componente/pedidoSelect";
import { useEffect } from "react";
import { useModalContext } from "../../../contexto/contextoModal";
import Card from "../../../componente-estilo/card/card";
import Cargando from "../../../componente/cargando/cargando";
import MensajeError from "../../../componente/error/MensajeError";
import usePedidoApi from "../../../servicio/pedido/usePedidoApi";
import './pedidoCard.css'

const Pedidos = () => {
  const dispatch = useDispatch();
  const { obtenerPedidoById, responsePedido, loadingPedido, errorFetchPedido } = usePedidoApi();

  const pedidoContext: filterContext<PedidoProp> = useSelector((store: appStore) => store.pedido);
  const { setModal } = useModalContext()

  const { elementosFiltrados, contenedorRef, valor, setValor, nuevoElemento } = useBuscadorCompleto<PedidoProp>({
    estadoFiltros: pedidoContext.filter.filtros,
    filtros: [...filtrosPedidoFuntion],
    elementos: pedidoContext.items,
    sortBy: pedidoContext.filter.sortBy,
    sortOrder: pedidoContext.filter.sortOrder,


  });

  const handlePedido = (pedido: PedidoProp) => {
    obtenerPedidoById(pedido.id)
    setModal(true);
    console.log('pedido select: ', pedido)
  }

  useEffect(() => {
    if (responsePedido) {
      dispatch(selectPedido(responsePedido))
    }
  }, [responsePedido]);

  return (
    <>
      <BuscadorFiltros
        ref={contenedorRef}
        texto='Buscar pedido'
        handleMas={() => nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PEDIDO_CARGAR}`)}
        valor={valor}
        setValor={setValor}
        handleOrden={() => dispatch(cambiarOrdenPedido())}
        handleFiltro={() => dispatch(cambiarOrdenPedido())}
        etiquetaArriba='Al comienzo de la lista'
        etiquetaMas='Nueva pedido'
        titulo='Lista de pedidos'
      />
      <Centro ref={contenedorRef}>
        {elementosFiltrados.length > 0
          ? elementosFiltrados
            .map(dato => (
              <PedidoCard pedido={dato} key={dato.id} onClick={handlePedido} />
            ))
          : <TextoVacio entidad='pedidos' />
        }
      </Centro>
      <Modal>
        {loadingPedido && <Card><Cargando /></Card>}
        {errorFetchPedido && <Card><MensajeError error={'Error al intentar seleccionar el pedido'} errorInfo={errorFetchPedido} /></Card>}
        <PedidoSelect />
      </Modal>
    </>
  )
}

export default Pedidos
