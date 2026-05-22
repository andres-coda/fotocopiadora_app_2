import { useDispatch, useSelector } from "react-redux";
import { filterContext } from "../../../redux/modelo/reduxContext.interface";
import { PropuestaProp } from "../../../modelo/Entidades/propuesta/propuesta.interface";
import { appStore } from "../../../redux/store";
import { filtrosPropuestaFuntion } from "../../../filtro/propuesta.filtro";
import BuscadorFiltros from "../../../componente/buscador/buscadorCompleto";
import { rutaPrivadaBase, RutasPrivadas } from "../../rutas/rutasPrivadas";
import { cambiarOrdenPropuesta } from "../../../redux/state/propuesta.state";
import Centro from "../../../componente-estilo/centro/centro";
import PropuestaCard from "./componente/propuestaCard";
import useBuscadorCompleto from "../../../hooks/buscador/useBuscadorCompleto";
import BuscadorLibro from "../../../componente/buscador/buscadorLibro";

const Propuestas = () => {
  const dispatch = useDispatch();
  const propuestaContext: filterContext<PropuestaProp> = useSelector((store: appStore) => store.propuesta);

  const { elementosFiltrados, contenedorRef, valor, setValor, nuevoElemento } = useBuscadorCompleto<PropuestaProp>({
    estadoFiltros: propuestaContext.filter.filtros,
    filtros: [...filtrosPropuestaFuntion],
    elementos: propuestaContext.items,
    sortBy: propuestaContext.filter.sortBy,
    sortOrder: propuestaContext.filter.sortOrder,


  });
  
return (
  <>
    <BuscadorFiltros
      ref={contenedorRef}
      texto='Buscar propuesta'
      handleMas={() => nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PROPUESTA_CARGAR}`)}
      valor={valor}
      setValor={setValor}
      handleOrden={() => dispatch(cambiarOrdenPropuesta())}
      etiquetaArriba='Al comienzo de la lista'
      etiquetaMas='Nueva propuesta'
      titulo='Lista de propuestas'
    />
    <Centro ref={contenedorRef}>
      {elementosFiltrados.length > 0
        ? elementosFiltrados
          .map(dato => (
            <PropuestaCard propuesta={dato} key={dato.id} />
          ))
        :<>
        <BuscadorLibro valor={valor} setValor={setValor}/>
        {/*<TextoVacio entidad='propuestas' />
          */}
        </> 
      }
    </Centro>
  </>
)
}

export default Propuestas