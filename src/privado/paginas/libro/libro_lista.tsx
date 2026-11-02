import Centro from '../../../componente-estilo/centro/centro';
import LibroCard from './componente/libroCard';
import BuscadorPaginadoCompleto from '../../../componente/buscador/buscadorPaginadoCompleto';
import { useEffect, useState } from 'react';
import {
  listaLibroPropuestaSeleccionable,
  normalizarLibroPropuesta,
} from './util/funcionesAdicionales';
import useBuscadorLibro from './hook/useBuscadorLibro';
import PropuestaCard from '../propuesta/componente/propuestaCard';
import { useDispatch } from 'react-redux';
import { resetSeleccionarLibro, seleccionarLibro } from '../../../redux/state/libro.state';
import { LibroProp } from '../../../modelo/Entidades/libro/libro.interface';
import { useNavigate } from 'react-router-dom';
import { rutaPrivadaBase, RutasPrivadas } from '../../rutas/rutasPrivadas';
import Modal from '../../../componente/modal/modal';
import LibroCargar from './cargar/libroCargar';
import PropuestaSelect from '../propuesta/componente/propuestaSelect';
import { PropuestaProp } from '../../../modelo/Entidades/propuesta/propuesta.interface';
import './libros.css';

interface esVacioProp {
  libros?: LibroProp[];
  propuestas?: PropuestaProp[];
  opActivas?: string[];
}

const esVacio = ({
  libros = [],
  propuestas = [],
  opActivas = [],
}: esVacioProp): string | undefined => {
  if (
    libros.length === 0 &&
    propuestas.length === 0 &&
    opActivas.includes(listaLibroPropuestaSeleccionable[0].nombre)
  )
    return 'libros y propuestas';

  if (libros.length === 0 && opActivas.includes(listaLibroPropuestaSeleccionable[2].nombre))
    return 'libros';

  if (propuestas.length === 0 && opActivas.includes(listaLibroPropuestaSeleccionable[1].nombre))
    return 'propuestas';

  return undefined;
};

const Libros_lista = () => {
  const [opcionesActivas, setOpcionesActivas] = useState<string[]>([
    listaLibroPropuestaSeleccionable[0].nombre,
  ]);

  const {
    valor,
    setValor,
    contenedorRef,
    handleNuevoElemento,
    libros,
    propuestas,
    finListaRef,
    propuesta,
  } = useBuscadorLibro({
    opcionesActivas,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetSeleccionarLibro());
  }, []);

  const selectLibro = (libro: LibroProp) => {
    dispatch(seleccionarLibro(libro));
    navigate(`/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`);
  };

  return (
    <>
      <BuscadorPaginadoCompleto
        ref={contenedorRef}
        texto="Buscar libro"
        handleMas={handleNuevoElemento}
        valor={valor}
        setValor={setValor}
        titulo="Lista de libros"
        opcionesActivas={opcionesActivas}
        setOpcionesActivas={setOpcionesActivas}
        listaSeleccionable={listaLibroPropuestaSeleccionable}
        normalizar={normalizarLibroPropuesta}
        etiquetaArriba="Al comienzo de la lista"
        etiquetaMas={
          !opcionesActivas.includes(listaLibroPropuestaSeleccionable[1].nombre)
            ? `Nuevo libro`
            : 'Nueva propuesta'
        }
      />
      <Centro
        ref={contenedorRef}
        finListaRef={finListaRef}
        vacio={esVacio({ libros, propuestas, opActivas: opcionesActivas }) != undefined}
        entidad={esVacio({ libros, propuestas, opActivas: opcionesActivas })}
        query={valor}
      >
        {propuestas.map(d => (
          <PropuestaCard propuesta={d} key={d.id} />
        ))}
        {libros.map(d => (
          <LibroCard libro={d} key={d.id} selecLibro={selectLibro} />
        ))}
      </Centro>
      <Modal nuevoEstilo={propuesta ? 'propuesta-select-color' : ''}>
        <>
          {propuesta && <PropuestaSelect propuesta={propuesta} />}
          {!propuesta && <LibroCargar />}
        </>
      </Modal>
    </>
  );
};

export default Libros_lista;
