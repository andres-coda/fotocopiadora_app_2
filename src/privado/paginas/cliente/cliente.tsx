import { useDispatch, useSelector } from "react-redux";
import { filterContext } from "../../../redux/modelo/reduxContext.interface";
import { ClienteProp } from "../../../modelo/Entidades/cliente/cliente.interface";
import { appStore } from "../../../redux/store";
import useBuscadorCompleto from "../../../hooks/buscador/useBuscadorCompleto";
import { clienteKeyBuscador, filtrosClienteFuntion } from "../../../filtro/cliente.filtro";
import BuscadorFiltros from "../../../componente/buscador/buscadorCompleto";
import { rutaPrivadaBase, RutasPrivadas } from "../../rutas/rutasPrivadas";
import { cambiarOrdenCliente } from "../../../redux/state/cliente.state";
import Centro from "../../../componente-estilo/centro/centro";
import TextoVacio from "../../../componente/Textos/textoVacio";
import ClienteCard from "./componente/clienteCard";

const Clientes = () => {
  const dispatch = useDispatch();
  const clienteContext: filterContext<ClienteProp> = useSelector((store: appStore) => store.cliente);

  const { elementosFiltrados, contenedorRef, valor, setValor, nuevoElemento } = useBuscadorCompleto<ClienteProp>({
    estadoFiltros: clienteContext.filter.filtros,
    filtros: [...filtrosClienteFuntion],
    elementos: clienteContext.items,
    keyBuscador: clienteKeyBuscador,
    sortBy: clienteContext.filter.sortBy,
    sortOrder: clienteContext.filter.sortOrder,
  });
  
return (
  <>
    <BuscadorFiltros
      ref={contenedorRef}
      texto='Buscar cliente'
      handleMas={() => nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.CLIENTE_CARGAR}`)}
      valor={valor}
      setValor={setValor}
      handleOrden={() => dispatch(cambiarOrdenCliente())}
      etiquetaArriba='Al comienzo de la lista'
      etiquetaMas='Nueva cliente'
      titulo='Lista de clientes'
    />
    <Centro ref={contenedorRef}>
      {elementosFiltrados.length > 0
        ? elementosFiltrados
          .map(dato => (
            <ClienteCard cliente={dato} key={dato.id} />
          ))
        : <TextoVacio entidad='clientes' />
      }
    </Centro>
  </>
)
}

export default Clientes
