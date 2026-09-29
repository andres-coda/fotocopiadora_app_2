import { useDispatch, useSelector } from "react-redux";
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface";
import { appStore } from "../../../../redux/store";
import Centro from "../../../../componente-estilo/centro/centro";
import { RefObject, useEffect, useRef, useState } from "react";
import './libroSelect.css'
import Texto from "../../../../componente-estilo/texto/texto";
import Presupuesto from "../../../../componente/pedido/presupuesto/presupuesto";
import { nombreLibroXstring } from "../../../../utils/formatoDatos";
import usePedidoLibrosApi from "../../../../servicio/pedido_libro/usePedidoLibrosApi";
import Cargando from "../../../../componente/cargando/cargando";
import { PedidoLibroProp } from "../../../../modelo/Entidades/pedido_libro/pedidoLibro.interface";
import { ReduxProp, UltimaBusquedaProp } from "../../../../redux/modelo/reduxContext.interface";
import TextoVacio from "../../../../componente/Textos/textoVacio";
import PedidoLibroXPedidoCard from "../../pedido/componente/pedidoLibroXPedidoCard";
import Modal from "../../../../componente/modal/modal";
import PedidoCard from "../../pedido/componente/pedidoCard";
import { PedidoProp } from "../../../../modelo/Entidades/pedido/pedido.interface";
import { seleccionarPedido } from "../../../../redux/state/pedido.state";
import { useModalContext } from "../../../../contexto/contextoModal";
import { Estado } from "../../../../modelo/Entidades/pedido_libro/estado.enum";
import { agregarPedidoLibrosBusquedaActual, crearBusquedaPedidoLibro } from "../../../../redux/state/pedido_libro.state";

const LibroSelect = () => {
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
        query: `${libro?.id}+${estadoSelec}`,
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

  if (!libro) return <p>No se encontro el libro seleccionado</p>

  const handlePedido = (item: PedidoLibroProp) => {
    obtenerPedidoLibrosByPedidoId(item.id);
    dispatch(seleccionarPedido(item));
    setModal(true);
  }

  return (
    <Centro ref={contenedorRef}>
      <div className="div-vertical libro-select">
        <div className="libro-superior">
          {libro.img ? (
            <img src={libro.img} alt={libro.nombre} className="libro-img" />
          ) : (null)}
          <div className="div-vertical">
            <Texto texto={nombreLibroXstring(libro)} grande centrado negrita />
            <Texto textoResaltado={'Año de edición:  '} texto={libro.anio ?? ''} chica />
            {libro.edicion && <Texto textoResaltado={'Número de edición:  '} texto={`${libro.edicion}`} chica />}
            <Texto textoResaltado={'Editorial:  '} texto={`${libro.editorial ?? ''}`} chica />
            <Texto textoResaltado={'Autor:  '} texto={`${libro.autor ?? ''}`} chica />
            <Texto textoResaltado={'Materia:  '} texto={`${libro.materia.nombre}`} chica />
            <Texto textoResaltado={'Descripción:  '} texto={`${libro.descripcion ?? ''}`} chica />
            <Texto textoResaltado={'Cantidad de páginas:  '} texto={`${libro.cantidadPg}`} chica />
            <Texto textoResaltado={'Cantidad de adhesivos:  '} texto={`${libro.adhesivos ?? 0}`} chica />
            <Texto textoResaltado={'Propuestas:  '} texto={``} mediana />
            {libro.propuesta?.map(p => <Texto texto={p.nombre} />)}
          </div>
        </div>
      </div>
      <Presupuesto libro={libro} />
      <Texto texto={`Lista de pedidos`} mediana negrita centrado />
      <div className="cliente-pedido">
        {loadingPedidoLibross && <Cargando />}
        {errorFetchPedidoLibross && <Texto texto={errorFetchPedidoLibross} />}
        {
          itemsContexto.busquedaActual.datosQuery.length === 0 ? <TextoVacio entidad="pedidos" />
            : itemsContexto.busquedaActual.datosQuery.map(pedidoItem => (
              <PedidoLibroXPedidoCard pL={pedidoItem} key={pedidoItem.id} onClick={handlePedido} idPedido={pedidoItem.idPedido} />
            ))}
        <div ref={finListaRef}>
          <p>Fin de lista</p>
        </div>
      </div>

      <Modal texto={`Pedido del ${nombreLibroXstring(libro)}`} >
        {pedidoSeleccionado ?
          <PedidoCard
            pedido={pedidoSeleccionado}
            activo
          />
          : <TextoVacio entidad="pedido" />}
        {loadingPedidoLibross && <Cargando />}
        {errorFetchPedidoLibross && <Texto texto={errorFetchPedidoLibross} error chica />}
      </Modal>

    </Centro>
  )
}

export default LibroSelect