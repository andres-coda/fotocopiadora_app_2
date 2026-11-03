import Centro from '../../../componente-estilo/centro/centro';
import LibroCard from './componente/libroCard';
import BuscadorPaginadoCompleto from '../../../componente/buscador/buscadorPaginadoCompleto';
import { useState } from 'react';
import {
  listaLibroPropuestaSeleccionable,
  normalizarLibroPropuesta,
} from './util/funcionesAdicionales';
import useBuscadorLibro from './hook/useBuscadorLibro';
import PropuestaCard from '../propuesta/componente/propuestaCard';
import Modal from '../../../componente/modal/modal';
import LibroCargar from './cargar/libroCargar';
import PropuestaSelect from '../propuesta/componente/propuestaSelect';
import './libros.css';

const Libros_lista = () => {
  const [valor, setValor] = useState<string>('')
  const [opcionesActivas, setOpcionesActivas] = useState<string[]>([
    listaLibroPropuestaSeleccionable[0].nombre,
  ]);

  const {
    contenedorRef,
    handleNuevoElemento,
    libros,
    propuestas,
    finListaRef,
    propuesta,
    esVacio,
    selectLibro,
    errorFetchLibros,
    errorFetchPropuestas
  } = useBuscadorLibro({
    opcionesActivas, valor
  });

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
        vacio={esVacio() != undefined}
        entidad={esVacio()}
        query={valor}
        error={errorFetchLibros || errorFetchPropuestas}
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
