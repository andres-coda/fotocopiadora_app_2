import { useDispatch, useSelector } from "react-redux";
import { filterContext } from "../../../redux/modelo/reduxContext.interface";
import { PrecioProp } from "../../../modelo/Entidades/precio/precio.interface";
import { appStore } from "../../../redux/store";
import useBuscadorCompleto from "../../../hooks/buscador/useBuscadorCompleto";
import { filtrosPrecioFuntion, precioKeyBuscador } from "../../../filtro/precio.filtro";
import BuscadorFiltros from "../../../componente/buscador/buscadorCompleto";
import { rutaPrivadaBase, RutasPrivadas } from "../../rutas/rutasPrivadas";
import { cambiarOrdenPrecio } from "../../../redux/state/precio.state";
import Centro from "../../../componente-estilo/centro/centro";
import TextoVacio from "../../../componente/Textos/textoVacio";
import PrecioCard from "./componente/precioCard";

const Precios = () => {
  const dispatch = useDispatch();
  const precioContext: filterContext<PrecioProp> = useSelector((store: appStore) => store.precio);

  const { elementosFiltrados, contenedorRef, valor, setValor, nuevoElemento } = useBuscadorCompleto<PrecioProp>({
    estadoFiltros: precioContext.filter.filtros,
    filtros: [...filtrosPrecioFuntion],
    elementos: precioContext.items,
    keyBuscador: precioKeyBuscador,
    sortBy: precioContext.filter.sortBy,
    sortOrder: precioContext.filter.sortOrder,


  });
  
return (
  <>
    <BuscadorFiltros
      ref={contenedorRef}
      texto='Buscar precio'
      handleMas={() => nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PRECIO_CARGAR}`)}
      valor={valor}
      setValor={setValor}
      handleOrden={() => dispatch(cambiarOrdenPrecio())}
      etiquetaArriba='Al comienzo de la lista'
      etiquetaMas='Nueva precio'
      titulo='Lista de precios'
    />
    <Centro ref={contenedorRef}>
      {elementosFiltrados.length > 0
        ? elementosFiltrados
          .map(dato => (
            <PrecioCard precio={dato} key={dato.id} />
          ))
        : <TextoVacio entidad='precios' />
      }
    </Centro>
  </>
)
}

export default Precios