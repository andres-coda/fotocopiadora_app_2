import { useDispatch, useSelector } from 'react-redux';
import { filterContext } from '../../../redux/modelo/reduxContext.interface';
import { appStore } from '../../../redux/store';
import { rutaPrivadaBase, RutasPrivadas } from '../../rutas/rutasPrivadas';
import Centro from '../../../componente-estilo/centro/centro';
import TextoVacio from '../../../componente/Textos/textoVacio';
import { LibroProp } from '../../../modelo/Entidades/libro/libro.interface';
import useBuscadorCompleto from '../../../hooks/buscador/useBuscadorCompleto';
import { filtrosLibroFuntion, libroKeyBuscador } from '../../../filtro/libro.filtro';
import BuscadorFiltros from '../../../componente/buscador/buscadorCompleto';
import { cambiarOrdenLibro } from '../../../redux/state/libro.state';
import LibroCard from './componente/libroCard';

const Libros = () => {
  const dispatch = useDispatch();
  const libroContext: filterContext<LibroProp> = useSelector((store: appStore) => store.libro);

  const { elementosFiltrados, contenedorRef, valor, setValor, nuevoElemento } = useBuscadorCompleto<LibroProp>({
    estadoFiltros: libroContext.filter.filtros,
    filtros: [...filtrosLibroFuntion],
    elementos: libroContext.items,
    keyBuscador: libroKeyBuscador,
    sortBy: libroContext.filter.sortBy,
    sortOrder: libroContext.filter.sortOrder,


  });

  return (
    <>
      <BuscadorFiltros
        ref={contenedorRef}
        texto='Buscar libro'
        handleMas={() => nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO_CARGAR}`)}
        valor={valor}
        setValor={setValor}
        handleOrden={() =>dispatch(cambiarOrdenLibro())}
        etiquetaArriba='Al comienzo de la lista'
        etiquetaMas='Nueva libro'
        titulo='Lista de libros'
      />
      <Centro ref={contenedorRef}>
        {elementosFiltrados.length > 0
          ? elementosFiltrados
            .map(dato => (
              <LibroCard libro={dato} key={dato.id} />
            ))
          : <TextoVacio entidad='libros' />
        }
      </Centro>
    </>
  )
}

export default Libros
