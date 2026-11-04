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
import { PropuestaProp } from '../../../modelo/Entidades/propuesta/propuesta.interface';
import { LibroProp } from '../../../modelo/Entidades/libro/libro.interface';

const Libros_lista = () => {
  const [valor, setValor] = useState<string>('')
  const [opcionesActivas, setOpcionesActivas] = useState<string[]>([
    listaLibroPropuestaSeleccionable[0].nombre,
  ]);

  const {
    contenedorRef,
    handleNuevoElemento,
    datos,
    finListaRef,
    propuesta,
    esVacio,
    selectLibro,
    errorFetchLibros,
    errorFetchPropuestas,
    loadingLibros,
    loadingPropuestas
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
        loading={loadingLibros || loadingPropuestas}
      >
        {datos.map(d=>(
          d.tipo === 'propuesta' 
          ? <PropuestaCard propuesta={d.dato as PropuestaProp} key={`propuesta-${d.dato.id}`} />
          : <LibroCard libro={d.dato as LibroProp} key={`libro-${d.dato.id}`} selecLibro={selectLibro} />
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
