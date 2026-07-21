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
import PropuestaCard from '../propuesta/componente/propuestaCard';
import './libros.css'
import { PropuestaProp } from '../../../modelo/Entidades/propuesta/propuesta.interface';
import { useState } from 'react';

const listaSeleccionable = [{ nombre: 'Todo' }, { nombre: 'Propuestas' }, { nombre: 'Libros' }];

const normalizar = (elementos: string[]): string[] => {
  return [elementos[elementos.length - 1]];
}


const Libros = () => {
  const dispatch = useDispatch();
  const libroContext: filterContext<LibroProp> = useSelector((store: appStore) => store.libro);
  const propuestas: PropuestaProp[] = useSelector((store: appStore) => store.propuesta.busquedaActual.datosQuery);

  const [opcionesActivas, setOpcionesActivas] = useState<string[]>([listaSeleccionable[0].nombre]);
  const { elementosFiltrados, contenedorRef, valor, setValor, nuevoElemento, retornoPropuestas } = useBuscadorCompleto<LibroProp>({
    estadoFiltros: libroContext.filter.filtros,
    filtros: [...filtrosLibroFuntion],
    elementos: libroContext.items,
    sortBy: libroContext.filter.sortBy,
    sortOrder: libroContext.filter.sortOrder,
    propuestas,
  });

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
        etiquetaMas='Nuevo libro'
        titulo='Lista de libros'
        opcionesActivas={opcionesActivas}
        setOpcionesActivas={setOpcionesActivas}
        normalizar={normalizar}
        listaSeleccionable={listaSeleccionable}
      />
      <Centro ref={contenedorRef} nuevoEstilo='centro-libro'>
        {
          !opcionesActivas.includes(listaSeleccionable[2].nombre) &&
          retornoPropuestas.map(p => <PropuestaCard propuesta={p} key={p.id}/>)
        }
        {
          !opcionesActivas.includes(listaSeleccionable[1].nombre) && elementosFiltrados.length > 0 &&
          elementosFiltrados
            .map(dato => (
              <LibroCard libro={dato} key={dato.id} />
            ))
        }
        {
          elementosFiltrados.length=== 0 || (retornoPropuestas.length === 0 &&  !opcionesActivas.includes(listaSeleccionable[2].nombre) )&&
          <TextoVacio entidad='libros, ni propuestas de pedidos'/>
        }
      </Centro>
    </>
  )
}

export default Libros
