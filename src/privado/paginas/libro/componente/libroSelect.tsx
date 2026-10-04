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
import Modal from "../../../../componente/modal/modal";
import PedidoCard from "../../pedido/componente/pedidoCard";
import { PedidoProp } from "../../../../modelo/Entidades/pedido/pedido.interface";
import { agregarItemsPedidoSeleccionadoRedux, resetSeleccionarPedido, seleccionarPedido } from "../../../../redux/state/pedido.state";
import { useModalContext } from "../../../../contexto/contextoModal";
import { Estado } from "../../../../modelo/Entidades/pedido_libro/estado.enum";
import { agregarPedidoLibrosBusquedaActual, crearBusquedaPedidoLibro } from "../../../../redux/state/pedido_libro.state";
import ItemCardCompleto from "../../item/componente/itemCardCompleto";
import { recrearItemLibro } from "../../../../hooks/itemsCard/useItem";
import EstadoPedidos from "../../../../componente/pedido/estadoPedidos";
import Boton from "../../../../componente-estilo/boton/boton";
import useEditar from "../../../../hooks/editar/useEditar";
import Editar from '../../../../assets/edit.svg?react'
import Eliminar from '../../../../assets/deleted.svg?react'
import LibroSelectNombre from "./libroSelectNombre";
import LibroSelectExtra from "./libroSelectExtra";
import LibroSelectLocal from "./libroSelectLocal";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";

const LibroSelect = () => {
  const libro: LibroProp | undefined = useSelector((store: appStore) => store.libro.datoSeleccionado);
  const contenedorRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const itemsContexto: ReduxProp<PedidoLibroProp> = useSelector((store: appStore) => store.pedidoLibro);
  const pedidoSeleccionado: PedidoProp | undefined = useSelector((store: appStore) => store.pedido.datoSeleccionado);
  const [estadoSelec, setEstadoSelect] = useState<Estado | undefined>(undefined);
  const finListaRef = useRef<HTMLDivElement>(null);

  const { modal, setModal } = useModalContext();
  const {handleEdit} = useEditar({libro, ruta:`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO_EDITAR}`})

  const dispatch = useDispatch();
  const { obtenerPedidoLibrosByLibroId, obtenerPedidoLibrosByPedidoId, responsePedidoLibross, loadingPedidoLibross, errorFetchPedidoLibross } = usePedidoLibrosApi();


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
      if (modal) {
        dispatch(agregarItemsPedidoSeleccionadoRedux(responsePedidoLibross.datos));
      } else {
        if (
          responsePedidoLibross.pagina != itemsContexto.busquedaActual.pagina
          && itemsContexto.busquedaActual.query === pedidoPaginado.query
        ) {
          dispatch(agregarPedidoLibrosBusquedaActual(pedidoPaginado))

        } else {
          dispatch(crearBusquedaPedidoLibro(pedidoPaginado))
        }
      }
    }
  }, [responsePedidoLibross]);

  useEffect(() => {
    if (!modal) {
      dispatch(resetSeleccionarPedido());
    }
  }, [modal])

  if (!libro) return <p>No se encontro el libro seleccionado</p>

  const handlePedido = (item: PedidoLibroProp) => {
    setModal(true);
    obtenerPedidoLibrosByPedidoId(item.idPedido);
    dispatch(seleccionarPedido(item.pedido));
  }

  return (
    <Centro
      ref={contenedorRef}
      nuevoEstilo="libro-selec-centro"
    >
      <div className="libro-select-superior">
        <div className="div-vertical libro-select">
          <div className="libro-superior">
            {libro.img ? (
              <img src={libro.img} alt={libro.nombre} className="libro-img" />
            ) : (null)}
            <div className="div-vertical" title={nombreLibroXstring(libro)}>
              <Boton icono={<Editar />} secundario onClick={()=>handleEdit({libro})} nuevoEstilo='btn-icono-mediano btn-edit-libro' titulo="Editar libro" />
              <Boton icono={<Eliminar />} secundario onClick={()=>handleEdit({libro})} nuevoEstilo='btn-icono-mediano btn-eliminar-libro' titulo="Eliminar libro" />
              <LibroSelectNombre libro={libro}/>
              <LibroSelectExtra libro={libro}/>
              <LibroSelectLocal libro={libro}/>
              {libro.stock && <EstadoPedidos
                stock={libro.stock}
                finListaRef={finListaRef}
                contenedorRef={contenedorRef}
                obtenerPedidosElementoById={obtenerPedidoLibrosByLibroId}
                loading={loadingPedidoLibross}
                busquedaRedux={itemsContexto.busquedaActual}
                estadoSelec={estadoSelec}
                setEstadoSelect={setEstadoSelect}
              />}
            </div>
          </div>
        </div>
        <Presupuesto libro={libro} />
      </div>
      {errorFetchPedidoLibross && <Texto texto={'No se pudieron cargar los pedidos libro'} error chica />}
      <Texto texto={`Lista de pedidos`} mediana negrita centrado />
      {loadingPedidoLibross && <Texto texto={'Pedidos cargando...'} />}
      <div className="cliente-pedido">
        {loadingPedidoLibross && <Cargando />}
        {errorFetchPedidoLibross && <Texto texto={errorFetchPedidoLibross} />}
        {
          itemsContexto.busquedaActual.datosQuery.length === 0 ? <TextoVacio entidad="pedidos" />
            : itemsContexto.busquedaActual.datosQuery.map(pedidoItem => (
              <ItemCardCompleto item={recrearItemLibro({ libro, item: pedidoItem })} key={pedidoItem.id} onClick={handlePedido} idPedido={pedidoItem.idPedido} />
            ))}
        <div ref={finListaRef}>
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