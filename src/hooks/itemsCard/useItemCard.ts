import { useDispatch, useSelector } from "react-redux";
import { PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { SedeProp } from "../../modelo/Entidades/sede/sede.interface";
import { appStore } from "../../redux/store";
import useCambiarEstadoPedidoApi from "../../servicio/pedido/useCambiarEstadoPedidoApi";
import usePedidoLibroApi from "../../servicio/pedido_libro/usePedidoLibroApi";
import { useEffect, useRef } from "react";
import { UseFormReset } from "react-hook-form";
import { estadoFormEdit } from "../../modelo/Entidades/pedido_libro/esqEstadoPedido.interface";
import { formValuesSede, sedeFormEdit } from "../../modelo/Entidades/sede/esqSede.esquema";
import { Estado } from "../../modelo/Entidades/pedido_libro/estado.enum";
import { actualizarResumenClienteRedux } from "../../redux/state/cliente.state";
import { cambiarEstadoPedidoRedux } from "../../redux/state/pedido.state";
import { cambiarEstadoPedidoLibroRedux, cambiarSedePedidoLibroRedux } from "../../redux/state/pedido_libro.state";
import { actualizarStockRedux } from "../../redux/state/libro.state";

interface UseItemHoockProp {
  item: PedidoLibroProp;
  idPedido?: string;
  estadoActual: Estado;
  sedeActual: string;
  resetEstado: UseFormReset<{ estado: Estado }>
  resetSede: UseFormReset<formValuesSede>
}

const useItemCard = ({ item, idPedido, estadoActual, sedeActual, resetEstado, resetSede }: UseItemHoockProp) => {
  const sedes: SedeProp[] = useSelector((store: appStore) => store.sede.datosIniciales.datosQuery);

  const dispatch = useDispatch();

  const { cambiarEstadoPedidoLibro, responseCambioEstadoPedido, loadingCambioEstadoPedido, errorFetchCambioEstadoPedido } = useCambiarEstadoPedidoApi();
  const { cambiarSedePedidoLibro, responsePedidoLibro: responseItem, loadingPedidoLibro: loadingItem, errorFetchPedidoLibro: errorItem } = usePedidoLibroApi();

  const estadoAnteriorRef = useRef(item.estado);
  const sedeAnteriorRef = useRef(item.sede.id);

  useEffect(() => {
    if (estadoAnteriorRef.current !== item.estado) {
      estadoAnteriorRef.current = item.estado;
      return;
    }
    if (estadoActual !== item.estado) {
      cambiarEstadoPedidoLibro({ idPedido: idPedido ?? item.idPedido, nroPedido: item.id, estado: estadoActual });
    }
  }, [estadoActual, item.estado]);

  useEffect(() => {
    const idSedeActual: SedeProp | undefined = sedes.find(s => s.nombre === sedeActual || s.id === sedeActual);

    if (sedeAnteriorRef.current !== item.sede.id) {
      sedeAnteriorRef.current = item.sede.id;
      return;
    }
    if (idSedeActual != undefined && idSedeActual?.id != item.sede.id) {
      cambiarSedePedidoLibro({ idPedido: idPedido ?? item.idPedido, nroPedido: item.id, sede_id: sedeActual });
    }
  }, [sedeActual, item.sede]);

  useEffect(() => {
    resetEstado(estadoFormEdit(item));
  }, [item.estado, resetEstado]);

  useEffect(() => {
    resetSede(sedeFormEdit(item.sede));
  }, [item.estado, resetSede]);

  useEffect(() => {
    if (responseCambioEstadoPedido) {
      dispatch(actualizarStockRedux(responseCambioEstadoPedido.items[0].stock));
      dispatch(actualizarResumenClienteRedux(responseCambioEstadoPedido.resumenCliente));
      dispatch(cambiarEstadoPedidoRedux(responseCambioEstadoPedido));
      dispatch(cambiarEstadoPedidoLibroRedux(responseCambioEstadoPedido.items));
    }
  }, [responseCambioEstadoPedido]);

  useEffect(() => {
    if (responseItem) {
      dispatch(cambiarSedePedidoLibroRedux(responseItem));
    }
  }, [responseItem]);


  return {
    sedes,
    loadingCambioEstadoPedido, errorFetchCambioEstadoPedido,
    loadingItem, errorItem
  }
}

export default useItemCard;