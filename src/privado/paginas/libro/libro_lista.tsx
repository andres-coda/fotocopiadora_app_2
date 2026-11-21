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
import PropuestaSelect from '../propuesta/componente/propuestaSelect';
import { PropuestaProp } from '../../../modelo/Entidades/propuesta/propuesta.interface';
import { LibroProp } from '../../../modelo/Entidades/libro/libro.interface';
import LibroCargarPartesInicio from './cargar/partes/libroCargarPartesInicio';
import { ProveedorLibroContext } from './contexto/contexto.libro';
import './libros.css';

const titulo = (opcionesSeleccionadas:string[]):string=>{
  if(opcionesSeleccionadas.includes(listaLibroPropuestaSeleccionable[0].nombre)){
    return 'Lista de libros y grupos de libros';
  }
  if(opcionesSeleccionadas.includes(listaLibroPropuestaSeleccionable[1].nombre)){
    return 'Lista de grupos de libros';
  }
  return 'Lista de libros'
}

const etiquetaMas = (opcionesSeleccionadas:string[]):string=>{
  if(!opcionesSeleccionadas.includes(listaLibroPropuestaSeleccionable[1].nombre)){
    return 'Nuevo libro';
  }
  return 'Armar nuevo grupo de libros';
}

const Libros_lista = () => {
  const [valor, setValor] = useState<string>('');
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
    loadingPropuestas,
  } = useBuscadorLibro({
    opcionesActivas,
    valor,
  });

  return (
    <>
      <Centro
        ref={contenedorRef}
        finListaRef={finListaRef}
        vacio={esVacio() != undefined}
        entidad={esVacio()}
        query={valor}
        error={errorFetchLibros || errorFetchPropuestas}
        loading={loadingLibros || loadingPropuestas}
        texto={ titulo(opcionesActivas)}
        buscador={
          <BuscadorPaginadoCompleto
            ref={contenedorRef}
            texto="Buscar libro"
            handleMas={handleNuevoElemento}
            valor={valor}
            setValor={setValor}
            opcionesActivas={opcionesActivas}
            setOpcionesActivas={setOpcionesActivas}
            listaSeleccionable={listaLibroPropuestaSeleccionable}
            normalizar={normalizarLibroPropuesta}
            etiquetaArriba="Al comienzo de la lista"
            etiquetaMas={etiquetaMas(opcionesActivas)}
          />
        }
      >
        {datos.map(d =>
          d.tipo === 'propuesta' ? (
            <PropuestaCard propuesta={d.dato as PropuestaProp} key={`propuesta-${d.dato.id}`} />
          ) : (
            <LibroCard
              libro={d.dato as LibroProp}
              key={`libro-${d.dato.id}`}
              selecLibro={selectLibro}
            />
          )
        )}
      </Centro>
      <Modal nuevoEstilo={propuesta ? 'propuesta-select-color' : ''}>
        <>
          {propuesta && <PropuestaSelect propuesta={propuesta} />}
          {!propuesta && (
            <ProveedorLibroContext>
              <LibroCargarPartesInicio />
            </ProveedorLibroContext>
          )}
        </>
      </Modal>
    </>
  );
};

export default Libros_lista;
