import { useSelector } from "react-redux";
import { ReduxProp } from "../../../redux/modelo/reduxContext.interface";
import { SedeProp } from "../../../modelo/Entidades/sede/sede.interface";
import { appStore } from "../../../redux/store";
import BuscadorFiltros from "../../../componente/buscador/buscadorCompleto";
import { rutaPrivadaBase, RutasPrivadas } from "../../rutas/rutasPrivadas";
import Centro from "../../../componente-estilo/centro/centro";
import TextoVacio from "../../../componente/Textos/textoVacio";
import SedeCard from "./componente/sedeCard";
import useSedesApi from "../../../servicio/sede/useSedesApi";
import { useState } from "react";
import useBusquedaPaginada from "../../../hooks/buscador/useBusquedaPaginada";
import { agregarSedesBusquedaActual, crearBusquedaSede, resetBusquedaSede } from "../../../redux/state/sede.state";

const Sedes = () => {
  const sedeDatos: ReduxProp<SedeProp> = useSelector((store: appStore) => store.sede)
 
  const { obtenerSedesBusqueda, responseSedes, loadingSedes } = useSedesApi()
  const [valor, setValor] = useState<string>('');

  const { contenedorRef, nuevoElemento } = useBusquedaPaginada<SedeProp>({
    valor,
    datosRedux: sedeDatos,
    resetBusqueda: resetBusquedaSede,
    crearBusqueda: crearBusquedaSede,
    obtenerBusqueda: obtenerSedesBusqueda,
    agregarBusqueda: agregarSedesBusquedaActual,
    response: responseSedes,
    loading: loadingSedes
  });
  
return (
  <>
    <BuscadorFiltros
      ref={contenedorRef}
      texto='Buscar sede'
      handleMas={() => nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.SEDE_CARGAR}`)}
      valor={valor}
      setValor={setValor}
      etiquetaArriba='Al comienzo de la lista'
      etiquetaMas='Nueva sede'
      titulo='Lista de sedes'
    />
    <Centro ref={contenedorRef}>
      {sedeDatos.busquedaActual.datosQuery.length > 0
        ? sedeDatos.busquedaActual.datosQuery.map(dato => (
            <SedeCard sede={dato} key={dato.id} />
          ))
        : <TextoVacio entidad='sedes' />
      }
    </Centro>
  </>
)
}

export default Sedes