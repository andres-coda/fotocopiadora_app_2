import { useDispatch, useSelector } from "react-redux";
import { filterContext } from "../../../redux/modelo/reduxContext.interface";
import { SedeProp } from "../../../modelo/Entidades/sede/sede.interface";
import { appStore } from "../../../redux/store";
import useBuscadorCompleto from "../../../hooks/buscador/useBuscadorCompleto";
import { filtrosSedeFuntion } from "../../../filtro/sede.filtro";
import BuscadorFiltros from "../../../componente/buscador/buscadorCompleto";
import { rutaPrivadaBase, RutasPrivadas } from "../../rutas/rutasPrivadas";
import { cambiarOrdenSede } from "../../../redux/state/sede.state";
import Centro from "../../../componente-estilo/centro/centro";
import TextoVacio from "../../../componente/Textos/textoVacio";
import SedeCard from "./componente/sedeCard";

const Sedes = () => {
  const dispatch = useDispatch();
  const sedeContext: filterContext<SedeProp> = useSelector((store: appStore) => store.sede);

  const { elementosFiltrados, contenedorRef, valor, setValor, nuevoElemento } = useBuscadorCompleto<SedeProp>({
    estadoFiltros: sedeContext.filter.filtros,
    filtros: [...filtrosSedeFuntion],
    elementos: sedeContext.items,
    sortBy: sedeContext.filter.sortBy,
    sortOrder: sedeContext.filter.sortOrder,


  });
  
return (
  <>
    <BuscadorFiltros
      ref={contenedorRef}
      texto='Buscar sede'
      handleMas={() => nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.SEDE_CARGAR}`)}
      valor={valor}
      setValor={setValor}
      handleOrden={() => dispatch(cambiarOrdenSede())}
      etiquetaArriba='Al comienzo de la lista'
      etiquetaMas='Nueva sede'
      titulo='Lista de sedes'
    />
    <Centro ref={contenedorRef}>
      {elementosFiltrados.length > 0
        ? elementosFiltrados
          .map(dato => (
            <SedeCard sede={dato} key={dato.id} />
          ))
        : <TextoVacio entidad='sedes' />
      }
    </Centro>
  </>
)
}

export default Sedes