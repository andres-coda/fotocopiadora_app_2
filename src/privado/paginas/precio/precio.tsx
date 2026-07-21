import { useSelector } from "react-redux";
import { ReduxProp } from "../../../redux/modelo/reduxContext.interface";
import { PrecioProp } from "../../../modelo/Entidades/precio/precio.interface";
import { appStore } from "../../../redux/store";
import { rutaPrivadaBase, RutasPrivadas } from "../../rutas/rutasPrivadas";
import Centro from "../../../componente-estilo/centro/centro";
import TextoVacio from "../../../componente/Textos/textoVacio";
import PrecioCard from "./componente/precioCard";
import { useState } from "react";
import usePreciosApi from "../../../servicio/precio/usePreciosApi";
import useBusquedaPaginada from "../../../hooks/buscador/useBusquedaPaginada";
import { crearBusquedaPrecio, resetBusquedaPrecio } from "../../../redux/state/precio.state";
import BuscadorPaginadoCompleto from "../../../componente/buscador/buscadorPaginadoCompleto";

const Precios = () => {
  const precioDatos: ReduxProp<PrecioProp> = useSelector((store: appStore) => store.precio);
  const { obtenerPreciosBusqueda, responsePrecios } = usePreciosApi()
  const [valor, setValor] = useState<string>('');

  const { contenedorRef, nuevoElemento } = useBusquedaPaginada<PrecioProp>({
    valor,
    datosRedux: precioDatos,
    resetBusqueda: resetBusquedaPrecio,
    crearBusqueda: crearBusquedaPrecio,
    obtenerBusqueda: obtenerPreciosBusqueda,
    response: responsePrecios,
    limiteLetrasBusqueda: 4,
  });

  return (
    <>
      <BuscadorPaginadoCompleto
        ref={contenedorRef}
        texto='Buscar precio'
        handleMas={()=>nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PRECIO_CARGAR}`)}
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
            : precioDatos.busquedaActual.datosQuery.map(d => <PrecioCard precio={d} key={d.id} />)
        }
      </Centro>
    </>
  )
}

export default Precios