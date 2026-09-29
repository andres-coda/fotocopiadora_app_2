import { PedidoLibroProp } from "../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { LibroProp } from "../../modelo/Entidades/libro/libro.interface";


interface Prop{
  libro:LibroProp; 
  item: PedidoLibroProp
}
export const recrearItemLibro = ({libro, item}:Prop):PedidoLibroProp => {
  return {
    ...item,
    libro:libro
  }
}

/* import { useDispatch, useSelector } from "react-redux";
import { RefObject, useRef, useState } from "react";
import { appStore } from "../../redux/store";
import { ReduxProp } from "../../redux/modelo/reduxContext.interface";
import { PedidoProp } from "../../modelo/Entidades/pedido/pedido.interface";
import { Estado } from "../../modelo/Entidades/pedido_libro/estado.enum";
import usePedidoLibrosApi from "../../servicio/pedido_libro/usePedidoLibrosApi";


const useItem = () => {
  const libro: LibroProp | undefined = useSelector((store: appStore) => store.libro.datoSeleccionado);
  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const itemsContexto: ReduxProp<PedidoLibroProp> = useSelector((store: appStore) => store.pedidoLibro);
  const pedidoSeleccionado: PedidoProp | undefined = useSelector((store: appStore) => store.pedido.datoSeleccionado);
  const [estadoSelec, setEstadoSelect] = useState<Estado | undefined>(undefined);
  const finListaRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const { obtenerPedidoLibrosByLibroId, obtenerPedidoLibrosByPedidoId, responsePedidoLibross, loadingPedidoLibross, errorFetchPedidoLibross } = usePedidoLibrosApi();

  const { modal, setModal } = useModalContext();

  useEffect(() => {
    if (libro?.id)
      obtenerPedidoLibrosByLibroId({
        pagina: 1,
        limite: itemsContexto.busquedaActual.limite ?? 6,
        idLibro: libro?.id,
        orden: itemsContexto.busquedaActual.sortBy,
        estado: estadoSelec
      });
  }, [libro?.id, estadoSelec]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!libro?.id) {
          return
        }

        if (!entry.isIntersecting) {
          return
        };
        if (itemsContexto.busquedaActual.query != `${libro?.id}+${estadoSelec}`) {
          return
        }
        if (loadingPedidoLibross) {
          return;
        }
        if (
          itemsContexto.busquedaActual.pagina *
          itemsContexto.busquedaActual.limite >=
          itemsContexto.busquedaActual.total
        ) {
          return;
        }

        obtenerPedidoLibrosByLibroId({
          pagina: itemsContexto.busquedaActual.pagina + 1,
          limite: itemsContexto.busquedaActual.limite,
          idLibro: libro?.id,
          orden: itemsContexto.busquedaActual.sortBy,
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

  }, [itemsContexto.busquedaActual.query, itemsContexto.busquedaActual.pagina, estadoSelec]);

  useEffect(() => {
    if (responsePedidoLibross) {
      const pedidoPaginado: UltimaBusquedaProp<PedidoLibroProp> = {
        query: `${libro?.id}`,
        sortBy: itemsContexto.busquedaActual.sortBy ?? 'estado',
        sortOrder: 'asc',
        pagina: responsePedidoLibross.pagina,
        limite: responsePedidoLibross.limite,
        total: responsePedidoLibross.total,
        datosQuery: responsePedidoLibross.datos
      }
      if (
        responsePedidoLibross.pagina != itemsContexto.busquedaActual.pagina
        && itemsContexto.busquedaActual.query === pedidoPaginado.query
      ) {
        dispatch(agregarPedidoLibrosBusquedaActual(pedidoPaginado))

      } else {
        dispatch(crearBusquedaPedidoLibro(pedidoPaginado))
      }
    }
  }, [responsePedidoLibross]);

  if (!libro) return <p>No se encontro el libro seleccionado </p>

  const handlePedido = (item: PedidoLibroProp) => {
    obtenerPedidoLibrosByPedidoId(item.id);
    dispatch(seleccionarPedido(item));
    setModal(true);
  }
}

//export default useItem; */