import { useState } from 'react';
import { LibroProp } from '../../modelo/Entidades/libro/libro.interface';
import { PropuestaProp } from '../../modelo/Entidades/propuesta/propuesta.interface';
import PropuestaCard from '../../privado/paginas/propuesta/componente/propuestaCard';
import LibroCard from '../../privado/paginas/libro/componente/libroCard';
import './buscador.css';
import useBuscadorLibro from '../../privado/paginas/libro/hook/useBuscadorLibro';
import BuscadorPaginadoCompleto from './buscadorPaginadoCompleto';
import {
  listaLibroPropuestaSeleccionable,
  normalizarLibroPropuesta,
} from '../../privado/paginas/libro/util/funcionesAdicionales';
import Centro from '../../componente-estilo/centro/centro';

interface Prop {
  selectLibro: (libro: LibroProp) => void;
  selectPropuesta: (propuestas: PropuestaProp) => void;
}

const BuscadorLibro = ({ selectLibro, selectPropuesta }: Prop) => {
  const [opcionesActivas, setOpcionesActivas] = useState<string[]>([
    listaLibroPropuestaSeleccionable[0].nombre,
  ]);
  const [valor, setValor] = useState<string>('');
  const {
    contenedorRef,
    handleNuevoElemento,
    datos,
    finListaRef,
    esVacio,
    errorFetchLibros,
    errorFetchPropuestas,
    loadingLibros,
    loadingPropuestas,
  } = useBuscadorLibro({
    opcionesActivas,
    valor,
  });

  const handlePropuesta = (propuesta: PropuestaProp): void => {
    setValor('');
    selectPropuesta(propuesta);
  };

  const handleLibro = (libro: LibroProp): void => {
    setValor('');
    selectLibro(libro);
  };

  return (
    <div className="buscador-libro">
      <BuscadorPaginadoCompleto
        ref={contenedorRef}
        texto="Buscar libro"
        handleMas={handleNuevoElemento}
        valor={valor}
        setValor={setValor}
        titulo=""
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
      {valor.length >= 3 && datos && datos.length > 0 && (
        <Centro
          children={
            <>
              {datos?.map(p =>
                p.tipo === 'propuesta' ? (
                  <PropuestaCard
                    propuesta={p.dato as PropuestaProp}
                    selectPropuesta={handlePropuesta}
                    key={`propuesta-${p.dato.id}`}
                  />
                ) : (
                  <LibroCard
                    libro={p.dato as LibroProp}
                    key={`libro-${p.dato.id}`}
                    selecLibro={handleLibro}
                  />
                )
              )}
            </>
          }
          finListaRef={finListaRef}
          vacio={esVacio() != undefined}
          query={valor}
          error={errorFetchLibros || errorFetchPropuestas}
          loading={loadingLibros || loadingPropuestas}
          desplegable
        />
      )}
    </div>
  );
};

export default BuscadorLibro;

{
  /*  {valor.length < 3
        ? null
        : <DesplegableConteiner>

          {propuestas.map(d => <PropuestaCard propuesta={d} key={d.id} selecPropuesta={handlePropuesta} />)}
          {libros.map(d => <LibroCard libro={d} key={d.id} selecLibro={handleLibro} />)}
          {
            libros.length === 0 && propuestas.length === 0 && opcionesActivas.includes(listaLibroPropuestaSeleccionable[0].nombre) &&
            <TextoVacio entidad='libros y propuestas' />
          }
          {
            libros.length === 0 && opcionesActivas.includes(listaLibroPropuestaSeleccionable[2].nombre) &&
            <TextoVacio entidad='libros' />
          }
          {
            propuestas.length === 0 && opcionesActivas.includes(listaLibroPropuestaSeleccionable[1].nombre) &&
            <TextoVacio entidad='propuestas' />
          }
          <div ref={finListaRef}>
            <p>Fin de lista</p>
          </div>
        </DesplegableConteiner>
      } */
}
