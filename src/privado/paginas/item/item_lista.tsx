import { useSelector } from "react-redux";
import { PedidoLibroProp } from "../../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { ReduxProp } from "../../../redux/modelo/reduxContext.interface";
import { appStore } from "../../../redux/store";
import usePedidoLibrosApi from "../../../servicio/pedido_libro/usePedidoLibrosApi";
import { useState } from "react";
import { agregarPedidoLibrosBusquedaActual, crearBusquedaPedidoLibro, resetBusquedaPedidoLibro } from "../../../redux/state/pedido_libro.state";
import BuscadorPaginadoCompleto from "../../../componente/buscador/buscadorPaginadoCompleto";
import { rutaPrivadaBase, RutasPrivadas } from "../../rutas/rutasPrivadas";
import Centro from "../../../componente-estilo/centro/centro";
import TextoVacio from "../../../componente/Textos/textoVacio";
import ItemCardCompleto from "./componente/itemCardCompleto";
import { PedidoProp } from "../../../modelo/Entidades/pedido/pedido.interface";
import Modal from "../../../componente/modal/modal";
import { formatoTelefonoMostrar } from "../../../utils/formatoDatos";
import PedidoCard from "../pedido/componente/pedidoCard";
import Cargando from "../../../componente/cargando/cargando";
import Texto from "../../../componente-estilo/texto/texto";
import useBuscadorPedido from "../../../hooks/buscador/useBuscadorPedido";

const ItemsLista = () => {
  const items: ReduxProp<PedidoLibroProp> = useSelector((store: appStore) => store.pedidoLibro);
  const { obtenerItemsBusqueda, obtenerPedidoLibrosByPedidoId, responsePedidoLibross, loadingPedidoLibross, errorFetchPedidoLibross } = usePedidoLibrosApi()
  const [valor, setValor] = useState<string>('');
  const pedido: PedidoProp | undefined = useSelector((store: appStore) => store.pedido.datoSeleccionado);


  const { nuevoElemento, finListaRef, contenedorRef, handleSeleccionarItem } = useBuscadorPedido({
    valor,
    datosRedux: items,
    resetBusqueda: resetBusquedaPedidoLibro,
    crearBusqueda: crearBusquedaPedidoLibro,
    obtenerBusqueda: obtenerItemsBusqueda,
    obtenerPedidoLibrosByPedidoId,
    agregarBusqueda: agregarPedidoLibrosBusquedaActual,
    response: responsePedidoLibross,
    loading: loadingPedidoLibross,
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
          !items.busquedaActual || items.busquedaActual.datosQuery.length === 0
            ? (<TextoVacio entidad='clientes' />)
            : items?.busquedaActual?.datosQuery?.map(d => <ItemCardCompleto item={d} key={d.id} idPedido={d.idPedido} onClick={handleSeleccionarItem} />)
        }
        <div ref={finListaRef}>
        </div>
        <Modal texto={`Pedido de ${pedido?.cliente.telefono ? formatoTelefonoMostrar(pedido?.cliente.telefono) : pedido?.cliente.email ?? ''}`}>
          {pedido ?
            <PedidoCard
              pedido={pedido}
              activo
            />
            : <TextoVacio entidad="pedido" />}
          {loadingPedidoLibross && <Cargando />}
          {errorFetchPedidoLibross && <Texto texto={errorFetchPedidoLibross} error chica />}
        </Modal>
      </Centro>
    </>
  )
}

export default ItemsLista;
