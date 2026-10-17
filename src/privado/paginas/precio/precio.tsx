import { useDispatch, useSelector } from "react-redux";
import { ReduxProp } from "../../../redux/modelo/reduxContext.interface";
import { PrecioProp } from "../../../modelo/Entidades/precio/precio.interface";
import { appStore } from "../../../redux/store";
import Centro from "../../../componente-estilo/centro/centro";
import TextoVacio from "../../../componente/Textos/textoVacio";
import PrecioCard from "./componente/precioCard";
import { useEffect, useState } from "react";
import usePreciosApi from "../../../servicio/precio/usePreciosApi";
import useBusquedaPaginada from "../../../hooks/buscador/useBusquedaPaginada";
import { agregarPreciosBusquedaActual, crearBusquedaPrecio, resetBusquedaPrecio, resetSeleccionarPrecio } from "../../../redux/state/precio.state";
import BuscadorPaginadoCompleto from "../../../componente/buscador/buscadorPaginadoCompleto";
import Modal from "../../../componente/modal/modal";
import PrecioCargar from "./cargar/precioCargar";
import { useModalContext } from "../../../contexto/contextoModal";
import EliminarPrecio from "./componente/eliminarPrecio";

const Precios = () => {
  const precioDatos: ReduxProp<PrecioProp> = useSelector((store: appStore) => store.precio);
  const { obtenerPreciosBusqueda, responsePrecios, loadingPrecios } = usePreciosApi()
  const [valor, setValor] = useState<string>('');
  const { modal } = useModalContext();
  const [eliminar, setEliminar] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { contenedorRef, nuevoElemento } = useBusquedaPaginada<PrecioProp>({
    valor,
    datosRedux: precioDatos,
    resetBusqueda: resetBusquedaPrecio,
    crearBusqueda: crearBusquedaPrecio,
    obtenerBusqueda: obtenerPreciosBusqueda,
    agregarBusqueda: agregarPreciosBusquedaActual,
    response: responsePrecios,
    loading: loadingPrecios,
  });

  useEffect(() => {
    if (!modal) {
      setEliminar(false);
      dispatch(resetSeleccionarPrecio());
    }
  }, [modal])

  return (
    <>
      <BuscadorPaginadoCompleto
        ref={contenedorRef}
        texto='Buscar precio'
        handleMas={() => nuevoElemento()}
        valor={valor}
        setValor={setValor}
        titulo='Lista de precios'
        etiquetaArriba='Al comienzo de la lista'
        etiquetaMas='Nuevo precio'
      />
      <Centro>
        {
          !precioDatos.busquedaActual || precioDatos.busquedaActual.datosQuery.length === 0
            ? (<TextoVacio entidad='precios' />)
            : precioDatos.busquedaActual.datosQuery.map(d => <PrecioCard precio={d} key={d.id} setEliminar={setEliminar} />)
        }
      </Centro>
      <Modal>
        {!eliminar && <PrecioCargar />}
        {eliminar && <EliminarPrecio />}
      </Modal>
    </>
  )
}

export default Precios