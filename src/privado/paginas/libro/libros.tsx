import { useDispatch, useSelector } from 'react-redux';
import { filterContext } from '../../../redux/modelo/reduxContext.interface';
import { appStore } from '../../../redux/store';
import { rutaPrivadaBase, RutasPrivadas } from '../../rutas/rutasPrivadas';
import Centro from '../../../componente-estilo/centro/centro';
import TextoVacio from '../../../componente/Textos/textoVacio';
import { LibroProp, libroPrueba } from '../../../modelo/Entidades/libro/libro.interface';
import useBuscadorCompleto from '../../../hooks/buscador/useBuscadorCompleto';
import { filtrosLibroFuntion } from '../../../filtro/libro.filtro';
import BuscadorFiltros from '../../../componente/buscador/buscadorCompleto';
import { cambiarOrdenLibro } from '../../../redux/state/libro.state';
import LibroCard from './componente/libroCard';
import { PropuestaProp } from '../../../modelo/Entidades/propuesta/propuesta.interface';
import { useEffect, useState } from 'react';
import PropuestaCard from '../propuesta/componente/propuestaCard';

const Libros = () => {
  const dispatch = useDispatch();
  const libroContext: filterContext<LibroProp> = useSelector((store: appStore) => store.libro);
  const [propuestas, setPropuestas] = useState<PropuestaProp[]>([])
  const { elementosFiltrados, contenedorRef, valor, setValor, nuevoElemento } = useBuscadorCompleto<LibroProp>({
    estadoFiltros: libroContext.filter.filtros,
    filtros: [...filtrosLibroFuntion],
    elementos: libroContext.items,
    sortBy: libroContext.filter.sortBy,
    sortOrder: libroContext.filter.sortOrder,
  });

  useEffect(() => {
    const propuestasAux: PropuestaProp[] = [];
    elementosFiltrados.map((e) => {
      if (e.propuesta) {
        e.propuesta.map(prop => {
          const index: number = propuestasAux.findIndex(p => p.id === prop.id)
          let propuesta: PropuestaProp | undefined = undefined;
          if (index === -1) {
            propuesta = {
              ...prop,
              libro: [e]
            }
          } else {
            const libro: LibroProp[] = prop.libro ?? [];
            libro.push(e);
            propuesta = {
              ...propuestasAux[index],
              libro
            }
          }

          propuestasAux.push(propuesta);
        })
      }
    });
    setPropuestas(propuestasAux)
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
        {propuestas.map(p=> <PropuestaCard propuesta={p}/>)}
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
