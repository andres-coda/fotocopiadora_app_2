import { useDispatch, useSelector } from "react-redux";
import { ReduxProp } from "../../../redux/modelo/reduxContext.interface";
import { SedeProp } from "../../../modelo/Entidades/sede/sede.interface";
import { appStore } from "../../../redux/store";
import BuscadorFiltros from "../../../componente/buscador/buscadorCompleto";
import Centro from "../../../componente-estilo/centro/centro";
import TextoVacio from "../../../componente/Textos/textoVacio";
import SedeCard from "./componente/sedeCard";
import useSedesApi from "../../../servicio/sede/useSedesApi";
import { useEffect, useState } from "react";
import useBusquedaPaginada from "../../../hooks/buscador/useBusquedaPaginada";
import { agregarSedesBusquedaActual, crearBusquedaSede, resetBusquedaSede, resetSeleccionarSede } from "../../../redux/state/sede.state";
import Modal from "../../../componente/modal/modal";
import SedeCargar from "./cargar/sedeCargar";
import EliminarSede from "./componente/eliminarSede";
import { useModalContext } from "../../../contexto/contextoModal";

const Sedes = () => {
  const sedeDatos: ReduxProp<SedeProp> = useSelector((store: appStore) => store.sede)

  const { obtenerSedesBusqueda, responseSedes, loadingSedes } = useSedesApi()
  const [valor, setValor] = useState<string>('');
  const { modal } = useModalContext();
  const [eliminar, setEliminar] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { contenedorRef, nuevoElemento, finListaRef } = useBusquedaPaginada<SedeProp>({
    valor,
    datosRedux: sedeDatos,
    resetBusqueda: resetBusquedaSede,
    crearBusqueda: crearBusquedaSede,
    obtenerBusqueda: obtenerSedesBusqueda,
    agregarBusqueda: agregarSedesBusquedaActual,
    response: responseSedes,
    loading: loadingSedes
  });

  useEffect(() => {
    if (!modal) {
      setEliminar(false);
      dispatch(resetSeleccionarSede());
    }
  }, [modal])

return (
  <>
    <BuscadorFiltros
      ref={contenedorRef}
      texto='Buscar sede'
      handleMas={() => nuevoElemento()}
      valor={valor}
      setValor={setValor}
      etiquetaArriba='Al comienzo de la lista'
      etiquetaMas='Nueva sede'
      titulo='Lista de sedes'
    />
    <Centro ref={contenedorRef}>
      {sedeDatos.busquedaActual.datosQuery.length > 0
        ? sedeDatos.busquedaActual.datosQuery.map(dato => (
            <SedeCard sede={dato} setEliminar={setEliminar} key={dato.id} />
          ))
        : <TextoVacio entidad='sedes' />
      }
      <div ref={finListaRef} style={{ gridColumn: '1 / -1', height: '1px' }} />
    </Centro>
    <Modal>
      {!eliminar && <SedeCargar />}
      {eliminar && <EliminarSede />}
    </Modal>
  </>
)
}

export default Sedes
