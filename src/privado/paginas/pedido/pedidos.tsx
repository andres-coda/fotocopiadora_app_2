import { useSelector } from "react-redux";
import { ReduxProp } from "../../../redux/modelo/reduxContext.interface";
import { PedidoProp } from "../../../modelo/Entidades/pedido/pedido.interface";
import { appStore } from "../../../redux/store";
import { rutaPrivadaBase, RutasPrivadas } from "../../rutas/rutasPrivadas";
import Centro from "../../../componente-estilo/centro/centro";
import TextoVacio from "../../../componente/Textos/textoVacio";
import PedidoCard from "./componente/pedidoCard";
import usePedidosApi from "../../../servicio/pedido/usePedidosApi";
import { useState } from "react";
import { agregarPedidosBusquedaActual, crearBusquedaPedido, resetBusquedaPedido } from "../../../redux/state/pedido.state";
import useBusquedaPaginada from "../../../hooks/buscador/useBusquedaPaginada";
import BuscadorPaginadoCompleto from "../../../componente/buscador/buscadorPaginadoCompleto";

const Pedidos = () => {
  const pedidoDatos: ReduxProp<PedidoProp> = useSelector((store: appStore) => store.pedido);
  const { obtenerPedidosBusqueda, responsePedidos, loadingPedidos } = usePedidosApi()
  const [valor, setValor] = useState<string>('');

  const { contenedorRef, finListaRef, nuevoElemento } = useBusquedaPaginada<PedidoProp>({
    valor,
    datosRedux: pedidoDatos,
    resetBusqueda: resetBusquedaPedido,
    crearBusqueda: crearBusquedaPedido,
    obtenerBusqueda: obtenerPedidosBusqueda,
    agregarBusqueda: agregarPedidosBusquedaActual,
    response: responsePedidos,
    loading: loadingPedidos,
    limiteLetrasBusqueda: 3,
  });

  return (
    <>
      <BuscadorPaginadoCompleto
        ref={contenedorRef}
        texto='Buscar pedido'
        handleMas={() => nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PEDIDO_CARGAR}`)}
        valor={valor}
        setValor={setValor}
        titulo='Lista de pedidos'
        etiquetaArriba='Al comienzo de la lista'
        etiquetaMas={'Nuevo pedido'}
      />
      <Centro ref={contenedorRef}>
        {
          !pedidoDatos.busquedaActual || pedidoDatos.busquedaActual.datosQuery.length === 0
            ? (<TextoVacio entidad='clientes' />)
            : pedidoDatos.busquedaActual.datosQuery.map(d => <PedidoCard pedido={d} key={d.id} />)
        }
        <div ref={finListaRef}>
          <p>Fin de lista</p>
        </div>
      </Centro>
    </>
  )
}

export default Pedidos
