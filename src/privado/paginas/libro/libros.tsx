import { useDispatch, useSelector } from 'react-redux';
import { filterContext } from '../../../redux/modelo/reduxContext.interface';
import { appStore } from '../../../redux/store';
import { rutaPrivadaBase, RutasPrivadas } from '../../rutas/rutasPrivadas';
import Centro from '../../../componente-estilo/centro/centro';
import TextoVacio from '../../../componente/Textos/textoVacio';
import { LibroProp } from '../../../modelo/Entidades/libro/libro.interface';
import useBuscadorCompleto from '../../../hooks/buscador/useBuscadorCompleto';
import { filtrosLibroFuntion } from '../../../filtro/libro.filtro';
import BuscadorFiltros from '../../../componente/buscador/buscadorCompleto';
import { cambiarOrdenLibro } from '../../../redux/state/libro.state';
import LibroCard from './componente/libroCard';
import { PropuestaProp } from '../../../modelo/Entidades/propuesta/propuesta.interface';
import { useMemo } from 'react';
import PropuestaCard from '../propuesta/componente/propuestaCard';

const Libros = () => {
  const dispatch = useDispatch();
  const libroContext: filterContext<LibroProp> = useSelector((store: appStore) => store.libro);
  const { elementosFiltrados, contenedorRef, valor, setValor, nuevoElemento } = useBuscadorCompleto<LibroProp>({
    estadoFiltros: libroContext.filter.filtros,
    filtros: [...filtrosLibroFuntion],
    elementos: libroContext.items,
    sortBy: libroContext.filter.sortBy,
    sortOrder: libroContext.filter.sortOrder,
  });

  const propuestasAgregadas = useMemo((): PropuestaProp[] => {
    const map = new Map<string, PropuestaProp>();

    for (const libro of elementosFiltrados) {
      if (!libro.propuesta) continue;

      for (const propuesta of libro.propuesta) {
        if (map.has(propuesta.id)) {
          const existing = map.get(propuesta.id)!;
          // ✅ Nuevo array en lugar de mutar el existente
          map.set(propuesta.id, {
            ...existing,
            libro: [...(existing.libro ?? []), libro],
            cantidadLibros: existing.cantidadLibros + 1,
          });
        } else {
          map.set(propuesta.id, {
            id: propuesta.id,
            nombre: propuesta.nombre,
            libro: [libro],
            cantidadLibros: 1,
            campoBusqueda: [{ valor: propuesta.nombre }],
            deleted: false,
            ultAct: ''
          });
        }
      }
    }

    return Array.from(map.values());
  }, [elementosFiltrados]);

  return (
    <>
      <BuscadorFiltros
        ref={contenedorRef}
        texto='Buscar libro'
        handleMas={() => nuevoElemento(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO_CARGAR}`)}
        valor={valor}
        setValor={setValor}
        handleOrden={() => dispatch(cambiarOrdenLibro())}
        etiquetaArriba='Al comienzo de la lista'
        etiquetaMas='Nueva libro'
        titulo='Lista de libros'
      />
      <Centro ref={contenedorRef}>
        {propuestasAgregadas.map(p => <PropuestaCard propuesta={p} />)}
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
